import fs from "fs";
import { swaggerSpec } from "../docs/swagger/swagger.config.js";

fs.mkdirSync("public/api-docs", { recursive: true });

fs.writeFileSync(
  "public/api-docs/swagger.json",
  JSON.stringify(swaggerSpec, null, 2)
);

console.log("Swagger JSON exported.");