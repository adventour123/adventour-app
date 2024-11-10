import { Account, Client } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67301860002636995ecf");

const account = new Account(client);

export { account, client };
