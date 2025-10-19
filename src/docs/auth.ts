/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para gerenciamento de usuários e autenticação
 */

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Criar novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome completo do usuário
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do usuário
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário
 *                 example: "minhasenha123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos ou e-mail já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               email_exists:
 *                 summary: E-mail já cadastrado
 *                 value:
 *                   message: "E-mail já cadastrado"
 *               invalid_data:
 *                 summary: Dados inválidos
 *                 value:
 *                   message: "Dados inválidos"
 */

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Fazer login
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do usuário
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário
 *                 example: "minhasenha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 id: "clx123456789"
 *                 name: "João Silva"
 *                 email: "joao@email.com"
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Credenciais inválidas"
 */

/**
 * @swagger
 * /usuario/logout:
 *   post:
 *     summary: Fazer logout
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout efetuado"
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               no_token:
 *                 summary: Token não informado
 *                 value:
 *                   message: "Token não informado"
 *               invalid_token:
 *                 summary: Token inválido
 *                 value:
 *                   message: "Token inválido"
 *               revoked_token:
 *                 summary: Token revogado
 *                 value:
 *                   message: "Token revogado"
 */
