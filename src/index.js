/// <reference types="@fastly/js-compute" />

import { ConfigStore } from "fastly:config-store";
import { HarperDbClient } from "./harperdb";
import { readStreamToString } from "./utils/streamReader";

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  const req = event.request;
  const method = req.method;
  const requestUrl = new URL(event.request.url);
  const pathname = requestUrl.pathname;

  const dict = new ConfigStore("harperdb_env_variables");
  const harperDbUrl = dict.get("HARPERDB_URL");
  const harperDbPassword = dict.get("HARPERDB_PW");
  const backend = "harperdb";

  const harperDbClient = new HarperDbClient(
    harperDbUrl,
    harperDbPassword,
    backend
  );

  // GET /
  // A simple test route that just returns the text "Hello there".
  if (method === "GET" && pathname === "/") {
    return new Response("Hello there");
  }

  // GET /posts/:id
  // Makes a call to HarperDB to fetch the post with id = :id
  if (method === "GET" && pathname.match(`\/posts\/[^\/]+(\/)?$`)) {
    const id = decodeURI(pathname.split("/")[2]);

    // Fetch the post from HarperDB
    const { response, data } = await harperDbClient.request({
      operation: "search_by_hash",
      schema: "blog",
      table: "posts",
      hash_values: [id],
      get_attributes: ["author", "title"], // can specify the columns you want to receive here.
    });

    return new Response(JSON.stringify(data), { status: response.status });
  }

  // GET /posts
  // Makes a call to HarperDB to fetch all blog posts
  if (method === "GET" && pathname === "/posts") {
    const { response, data } = await harperDbClient.request({
      operation: "sql",
      sql: "SELECT * FROM blog.posts",
    });
    return new Response(JSON.stringify(data), { status: response.status });
  }

  // POST /posts
  // Create a new post in HarperDB
  if (method === "POST" && pathname === "/post") {
    const body = await req.body; // readable stream
    const newPostJson = await readStreamToString(body); // convert stream to string
    const newPostObj = JSON.parse(newPostJson); // convert string to object

    // Create new post in HarperDB
    const { response, data } = await harperDbClient.request({
      operation: "insert",
      schema: "blog",
      table: "posts",
      records: [
        {
          ...newPostObj,
        },
      ],
    });

    return new Response(JSON.stringify(data), { status: response.status });
  }

  // e.g PUT /posts/{id}
  // if (method == "PUT" && pathname.match(`\/posts\/[^\/]+(\/)?$`)) {
  //   const id = decodeURI(pathname.split('/')[2]);
  //   ...
  // }

  // e.g DELETE /posts/{id}
  // if (method == "DELETE" && pathname.match(`\/posts\/[^\/]+(\/)?$`)) {
  //   const id = decodeURI(pathname.split('/')[2]);
  //   ...
  // }

  return new Response("We couldn't find the page that you requested.", {
    status: 404,
  });
}
