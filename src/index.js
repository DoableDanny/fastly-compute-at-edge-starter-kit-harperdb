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
  // Makes a call to HarperDB to create a new schema called "blog"
  if (method === "GET" && pathname == "/") {
    const { response, data } = await harperDbClient.request({
      operation: "create_schema",
      schema: "blog",
    });

    return new Response(JSON.stringify(data), { status: 200 });
  }

  // GET /posts
  // Makes a call to HarperDB to fetch all blog posts
  if (method === "GET" && pathname === "/posts") {
    const { response, data } = await harperDbClient.request({
      operation: "sql",
      sql: "SELECT * FROM blog.posts",
    });
    return new Response(JSON.stringify(data), { status: 200 });
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

    return new Response(JSON.stringify(data), { status: 200 });
  }

  return new Response("We couldn't find the page that you requested.", {
    status: 404,
  });
}
