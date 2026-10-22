export interface LoaderContext {
    cacheable?: () => void;
    [key: string]: any;
}
export default function graphqlContentMapperLoader(this: LoaderContext, source: string): string;
