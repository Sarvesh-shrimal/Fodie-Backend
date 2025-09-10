// const swaggerJSDoc = require("swagger-jsdoc");

// const swaggerSpec = swaggerJSDoc({
//   definition: {
//     openapi: "3.0.3",
//     info: {
//       title: "BACKEND",
//       version: "1.0.0",
//       description: "BACKEND DOCS",
//     },
//     servers: [{ url: "http://localhost:5050" }],
//     components: {
//       securitySchemes: {
//         bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
//       },
//       schemas: {
//         user: {
//           type: "object",
//           required: ["name", "email", "password"],
//           properties: {
//             name: { type: "string" },
//             email: { type: "string", format: "email" },
//             password: { type: "string" },
//             provider: { type: "string", nullable: true },
//           },
//         },
//         ErrorResponse: {
//           type: "object",
//           properties: {
//             message: { type: "string" },
//           },
//         },
//       },
//     },
//   },
//   apis: ["./src/Routes/*.js", "./src/index.js"],
// });

// module.exports = swaggerSpec;
