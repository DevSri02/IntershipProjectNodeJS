const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const port = process.env.PORT || 3000;

const userroute = require("./routes/userroutes");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sample API",
      version: "1.0.0",
      description: "API Documentation for GET and POST endpoints",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
// Swagger setup
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", userroute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
