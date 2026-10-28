import type { MapperConfig } from "./config.js";
export type VitePluginOptions = Partial<MapperConfig> & {
    schema?: string;
};
export declare function graphqlContentMapper(options?: VitePluginOptions): {
    name: string;
    enforce: "pre";
    transform(this: any, code: string, id: string): {
        code: string;
        map: {
            mappings: string;
        };
    } | null;
};
export default graphqlContentMapper;
