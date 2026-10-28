import { type MapperConfig } from "./config.js";
export declare function compileGraphQLToEsm(source: string, projectDir?: string, customOptions?: Partial<MapperConfig> | string): {
    code: string;
    schemaPath: string;
};
