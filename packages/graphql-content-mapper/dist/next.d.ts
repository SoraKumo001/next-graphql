import type { MapperConfig } from "./config.js";
export type GraphQLContentMapperNextOptions = Partial<MapperConfig> & {
    schema?: string;
};
export interface NextConfig {
    webpack?: (config: any, options: any) => any;
    turbopack?: {
        rules?: Record<string, any>;
        [key: string]: any;
    };
    [key: string]: any;
}
export declare function withGraphQLContentMapper(nextConfig?: NextConfig, options?: GraphQLContentMapperNextOptions): NextConfig;
export default withGraphQLContentMapper;
