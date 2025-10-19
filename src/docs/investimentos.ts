/**
 * @swagger
 * tags:
 *   name: Investimentos
 *   description: Endpoints para gerenciamento de investimentos com integração Brapi
 */

/**
 * @swagger
 * /investimentos:
 *   post:
 *     summary: Criar novo investimento
 *     tags: [Investimentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - investedValue
 *               - quantity
 *               - dateInvested
 *               - ticker
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do investimento
 *                 example: "Petrobras"
 *               investedValue:
 *                 type: number
 *                 format: decimal
 *                 description: Valor investido
 *                 example: 1000.00
 *               quantity:
 *                 type: integer
 *                 description: Quantidade de ações
 *                 example: 100
 *               dateInvested:
 *                 type: string
 *                 format: date-time
 *                 description: Data do investimento
 *                 example: "2024-01-15T00:00:00Z"
 *               ticker:
 *                 type: string
 *                 description: Código da ação
 *                 example: "PETR4"
 *     responses:
 *       201:
 *         description: Investimento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Investimento'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /investimentos:
 *   get:
 *     summary: Listar investimentos do usuário (com paginação)
 *     tags: [Investimentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Quantidade de itens por página
 *         example: 10
 *     responses:
 *       200:
 *         description: Lista de investimentos com paginação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 investimentos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Investimento'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *             example:
 *               investimentos:
 *                 - id: "clx123456789"
 *                   name: "Petrobras"
 *                   investedValue: 1000.00
 *                   quantity: 100
 *                   dateInvested: "2024-01-15T00:00:00Z"
 *                   ticker: "PETR4"
 *                   created_at: "2024-01-15T10:30:00Z"
 *                   updated_at: "2024-01-15T10:30:00Z"
 *               pagination:
 *                 currentPage: 1
 *                 totalPages: 3
 *                 totalItems: 25
 *                 itemsPerPage: 10
 *                 hasNextPage: true
 *                 hasPreviousPage: false
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /investimentos/todos:
 *   get:
 *     summary: Listar todos investimentos com dados Brapi (com paginação)
 *     tags: [Investimentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Quantidade de itens por página
 *         example: 10
 *     responses:
 *       200:
 *         description: Lista de investimentos com dados da Brapi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 investimentos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InvestimentoComBrapi'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *             example:
 *               investimentos:
 *                 - id: "clx123456789"
 *                   name: "Petrobras"
 *                   investedValue: 1000.00
 *                   quantity: 100
 *                   dateInvested: "2024-01-15T00:00:00Z"
 *                   ticker: "PETR4"
 *                   currentPrice: 12.50
 *                   currentValue: 1250.00
 *                   profitLoss: 250.00
 *                   profitLossPercentage: 25.00
 *                   created_at: "2024-01-15T10:30:00Z"
 *                   updated_at: "2024-01-15T10:30:00Z"
 *               pagination:
 *                 currentPage: 1
 *                 totalPages: 3
 *                 totalItems: 25
 *                 itemsPerPage: 10
 *                 hasNextPage: true
 *                 hasPreviousPage: false
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /investimentos/{id}:
 *   get:
 *     summary: Buscar investimento específico
 *     tags: [Investimentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do investimento
 *         example: "clx123456789"
 *     responses:
 *       200:
 *         description: Investimento encontrado com dados da Brapi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvestimentoComBrapi'
 *             example:
 *               id: "clx123456789"
 *               name: "Petrobras"
 *               investedValue: 1000.00
 *               quantity: 100
 *               dateInvested: "2024-01-15T00:00:00Z"
 *               ticker: "PETR4"
 *               currentPrice: 12.50
 *               currentValue: 1250.00
 *               profitLoss: 250.00
 *               profitLossPercentage: 25.00
 *               created_at: "2024-01-15T10:30:00Z"
 *               updated_at: "2024-01-15T10:30:00Z"
 *       400:
 *         description: ID do investimento é obrigatório
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "ID do investimento é obrigatório"
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Investimento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Investimento não encontrado"
 */

/**
 * @swagger
 * /investimentos/{id}:
 *   put:
 *     summary: Atualizar investimento
 *     tags: [Investimentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do investimento
 *         example: "clx123456789"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Nova quantidade de ações
 *                 example: 150
 *     responses:
 *       200:
 *         description: Investimento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvestimentoComBrapi'
 *             example:
 *               id: "clx123456789"
 *               name: "Petrobras"
 *               investedValue: 1000.00
 *               quantity: 150
 *               dateInvested: "2024-01-15T00:00:00Z"
 *               ticker: "PETR4"
 *               currentPrice: 12.50
 *               currentValue: 1875.00
 *               profitLoss: 875.00
 *               profitLossPercentage: 87.50
 *               created_at: "2024-01-15T10:30:00Z"
 *               updated_at: "2024-01-15T11:45:00Z"
 *       400:
 *         description: Dados inválidos ou ID obrigatório
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Investimento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /investimentos/{id}:
 *   delete:
 *     summary: Deletar investimento
 *     tags: [Investimentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do investimento
 *         example: "clx123456789"
 *     responses:
 *       200:
 *         description: Investimento removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Investimento removido com sucesso"
 *       400:
 *         description: ID do investimento é obrigatório
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Investimento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
