import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Load the Swagger definition
import path from "path";

const swaggerDocument = YAML.load(path.join(process.cwd(), "src/swagger.yaml"));

const app = express();

// Use Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
