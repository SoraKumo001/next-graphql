import type { MapperConfig } from "./config.js";
export interface LoaderContext {
    cacheable?: () => void;
    addDependency?: (file: string) => void;
    getOptions?: () => Record<string, any>;
    rootContext?: string;
    [key: string]: any;
}
export type GraphQLContentMapperLoaderOptions = Partial<MapperConfig> & {
    schema?: string;
};
export default function graphqlContentMapperLoader(this: LoaderContext, source: string): string;
