const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Evolutec API",
      version: "1.0.0",
      description: "Documentação da API do Backend Evolutec",
      contact: {
        name: "Suporte",
        email: "suporte@evolutec.com"
      }
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: "Servidor de produção"
      },
      {
        url: "http://localhost:3000",
        description: "Servidor de desenvolvimento"
      }
    ],
    components: {
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic"
        }
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            status: {
              type: "string"
            },
            message: {
              type: "string"
            },
            details: {
              type: "object"
            }
          }
        },
        Course: {
          type: "object",
          properties: {
            id: {
              type: "integer"
            },
            title: {
              type: "string"
            },
            description: {
              type: "string"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          }
        },
        BlogPost: {
          type: "object",
          properties: {
            id: {
              type: "integer"
            },
            title: {
              type: "string"
            },
            content: {
              type: "string"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Lead: {
          type: "object",
          properties: {
            id: {
              type: "integer"
            },
            email: {
              type: "string",
              format: "email"
            },
            name: {
              type: "string"
            },
            type: {
              type: "string",
              enum: ["CONTACT", "EBOOK"]
            },
            createdAt: {
              type: "string",
              format: "date-time"
            }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec
