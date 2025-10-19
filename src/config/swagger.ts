import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'byron Investimentos API',
      version: '1.0.0',
      description: 'API completa para gerenciamento de investimentos',
      contact: {
        name: 'byron Investimentos',
        email: 'joaoassis@byronsolutions.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT para autenticação',
        },
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do usuário',
              example: 'clx123456789',
            },
            name: {
              type: 'string',
              description: 'Nome do usuário',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do usuário',
              example: 'joao@email.com',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
              example: '2024-01-15T10:30:00Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
              example: '2024-01-15T10:30:00Z',
            },
          },
        },
        Investimento: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do investimento',
              example: 'clx123456789',
            },
            name: {
              type: 'string',
              description: 'Nome do investimento',
              example: 'Petrobras',
            },
            investedValue: {
              type: 'number',
              format: 'decimal',
              description: 'Valor investido',
              example: 1000.00,
            },
            quantity: {
              type: 'integer',
              description: 'Quantidade de ações',
              example: 100,
            },
            dateInvested: {
              type: 'string',
              format: 'date-time',
              description: 'Data do investimento',
              example: '2024-01-15T00:00:00Z',
            },
            ticker: {
              type: 'string',
              description: 'Código da ação',
              example: 'PETR4',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
              example: '2024-01-15T10:30:00Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
              example: '2024-01-15T10:30:00Z',
            },
          },
        },
        InvestimentoComBrapi: {
          allOf: [
            { $ref: '#/components/schemas/Investimento' },
            {
              type: 'object',
              properties: {
                currentPrice: {
                  type: 'number',
                  format: 'decimal',
                  description: 'Preço atual da ação (da Brapi)',
                  example: 12.50,
                },
                currentValue: {
                  type: 'number',
                  format: 'decimal',
                  description: 'Valor atual do investimento',
                  example: 1250.00,
                },
                profitLoss: {
                  type: 'number',
                  format: 'decimal',
                  description: 'Lucro/Prejuízo em valor',
                  example: 250.00,
                },
                profitLossPercentage: {
                  type: 'number',
                  format: 'decimal',
                  description: 'Lucro/Prejuízo em percentual',
                  example: 25.00,
                },
              },
            },
          ],
        },
        Pagination: {
          type: 'object',
          properties: {
            currentPage: {
              type: 'integer',
              description: 'Página atual',
              example: 1,
            },
            totalPages: {
              type: 'integer',
              description: 'Total de páginas',
              example: 3,
            },
            totalItems: {
              type: 'integer',
              description: 'Total de itens',
              example: 25,
            },
            itemsPerPage: {
              type: 'integer',
              description: 'Itens por página',
              example: 10,
            },
            hasNextPage: {
              type: 'boolean',
              description: 'Tem próxima página',
              example: true,
            },
            hasPreviousPage: {
              type: 'boolean',
              description: 'Tem página anterior',
              example: false,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Investimento não encontrado',
            },
          },
        },
        AuthToken: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token JWT',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            user: {
              $ref: '#/components/schemas/Usuario',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/docs/*.ts'], // Caminho para os arquivos de documentação
};

export const swaggerSpec = swaggerJSDoc(options);
