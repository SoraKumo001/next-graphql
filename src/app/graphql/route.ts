import path from "path";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import { PrismaClient } from "@prisma/client";
import { createYoga } from "graphql-yoga";
import PothosPrismaGeneratorPlugin from "pothos-prisma-generator";
import PothosQueryGeneratorPlugin from "pothos-query-generator";
import PothosSchemaExporterPlugin from "pothos-schema-exporter";

const prismaClient = new PrismaClient();

/**
 * Create a new schema builder instance
 */
export const builder = new SchemaBuilder<{
  // PrismaTypes: PrismaTypes; //Not used because it is generated automatically
}>({
  plugins: [
    PrismaPlugin,
    PrismaUtils,
    PothosPrismaGeneratorPlugin,
    PothosSchemaExporterPlugin,
    PothosQueryGeneratorPlugin,
  ],
  prisma: {
    client: prismaClient,
  },
  pothosSchemaExporter: {
    output:
      process.env.NODE_ENV === "development" &&
      path.join(process.cwd(), "graphql", "schema.graphql"),
  },
  pothosQueryGenerator: {
    output:
      process.env.NODE_ENV === "development" &&
      path.join(process.cwd(), "graphql", "query.graphql"),
  },
});

export const schema = builder.toSchema({ sortSchema: false });

const { handleRequest } = createYoga<{}>({
  schema,
  fetchAPI: { Response },
});

export { handleRequest as POST, handleRequest as GET };
