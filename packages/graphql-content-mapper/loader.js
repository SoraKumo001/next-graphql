const fs = require("fs");
const path = require("path");
const loader = require("graphql-tag/loader");

module.exports = function (source) {
  this.cacheable && this.cacheable();
  const rawJs = loader.call(this, source);

  // Read schema to find enums and append them to runtime module.exports
  try {
    const schemaPath = path.resolve(process.cwd(), "graphql/schema.graphql");
    if (fs.existsSync(schemaPath)) {
      const schemaText = fs.readFileSync(schemaPath, "utf-8");
      const enumMatches = [...schemaText.matchAll(/enum\s+(\w+)\s*\{([^}]+)\}/g)];
      let enumCode = "";
      for (const match of enumMatches) {
        const enumName = match[1];
        const values = match[2]
          .split("\n")
          .map((v) => v.trim())
          .filter((v) => v && !v.startsWith("#"));
        const objEntries = values.map((v) => `"${v}": "${v}"`).join(", ");
        enumCode += `\nmodule.exports["${enumName}"] = { ${objEntries} };\n`;
      }
      return rawJs + enumCode;
    }
  } catch (e) {}

  return rawJs;
};
