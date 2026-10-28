export interface MapperConfig {
    schema: string;
    scalars: Record<string, string>;
    skipTypename?: boolean;
    enumsAsTypes?: boolean;
    futureProofEnums?: boolean;
    codegenConfig?: Record<string, any>;
}
/**
 * Load options from tsconfig.json (TypeScript 7.1 contentMappers[].options)
 */
export declare function loadTsConfigOptions(projectDir: string, configFileName?: string): Partial<MapperConfig>;
export declare function resolveConfig(projectDir?: string, explicitOptions?: Partial<MapperConfig> | string, configFileName?: string): {
    config: MapperConfig;
    schemaPath: string;
};
