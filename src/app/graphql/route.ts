import { createYoga } from "graphql-yoga";
import { schema } from "./schema";

const { handleRequest } = createYoga<{}>({
  schema,
  fetchAPI: { Response },
});

export { handleRequest as POST, handleRequest as GET };
