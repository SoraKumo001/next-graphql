"use client";

import { ApolloExplorer } from "@apollo/explorer/react";
import { FC } from "react";

export const GraphQLExplorer: FC<{ schema: string; className?: string }> = ({
  schema,
  className = "w-full h-[calc(100vh-4rem)]",
}) => {
  return (
    <ApolloExplorer
      className={className}
      schema={schema}
      endpointUrl="/graphql"
      persistExplorerState={true}
      handleRequest={(url, option) =>
        fetch(url, { ...option, credentials: "same-origin" })
      }
    />
  );
};
