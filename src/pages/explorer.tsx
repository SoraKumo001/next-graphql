import { printSchema } from "graphql";
import { GetStaticProps, NextPage } from "next";
import { schema } from "@/app/graphql/schema";
import { GraphQLExplorer } from "@/components/GraphQLExplorer";

const Page: NextPage<{ schema: string }> = ({ schema }) => {
  return <GraphQLExplorer schema={schema} />;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { schema: printSchema(schema) },
  };
};

export default Page;
