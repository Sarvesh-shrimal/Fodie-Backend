const express = require("express");
const app = express();
const { config } = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const router = require("./Routes/user.routes");
// const swaggerSpec = require("../swagger");
// const swaggerUi = require("swagger-ui-express");
// const OpenApiValidator = require("express-openapi-validator");
const bodyParser = require("body-parser");

config({ path: "./.env" });

const AllowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || AllowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed by Cors"));
      }
    },
    credentials: true,
  })
);

app.use(cookieparser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

PORT = process.env.PORT;
db = process.env.DB_URL;

// app.use(
//   "/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec, { explorer: true })
// );
// app.get("/docs.json", (_req, res) => res.json(swaggerSpec));

// app.use(
//   OpenApiValidator.middleware({
//     apiSpec: swaggerSpec,
//     validateRequests: true,
//     validateResponses: true,
//   })
// );


const Startserver = async () => {
  try {
    await mongoose.connect(db, {});
    console.log("Data Base is Connected Successfully");

    app.use("/app/auth", router);

    app.listen(PORT, () => {
      console.log(`App is  running on ${PORT}`);
      // console.log(`Swagger Docs: http://localhost:${PORT}/docs`);
    });

    process.on("SIGINT", () => {
      console.log("Gracefully shutting Down...");
      mongoose.connection.close(() => {
        console.log("mongoose Connection closed");
      });
    });
  } catch (error) {
    console.log("Failed to Start Server: ", error);
    process.exit(1);
  }
};

Startserver();
