export class HarperDbClient {
  #url;
  #password;
  #backend;

  /**
   *
   * @param url your HarperDB url, e.g. https://cloud-1-yourusername.harperdbcloud.com
   * @param password your HarperDB password, e.g. AdjfijdR5edlajdfjAAAZdjoe1=
   * @param backend the name of the backend in the fastly.toml file, .e.g local_server.backends.harperdb, so backend = "harperdb"
   */
  constructor(url, password, backend) {
    this.#url = url;
    this.#password = password;
    this.#backend = backend;
  }

  async request(options) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Basic ${this.#password}`);

    const raw = JSON.stringify(options);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      backend: this.#backend,
    };

    try {
      const response = await fetch(this.#url, requestOptions);
      const data = await response.json();
      return { response, data };
    } catch (error) {
      throw new Error(error);
    }
  }
}
