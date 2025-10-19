/**
 * @swagger
 * tags:
 *   name: Health Check
 *   description: Endpoints para verificação de status da API
 */

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Verificar status da API
 *     tags: [Health Check]
 *     description: Endpoint para verificar se a API está funcionando
 *     responses:
 *       200:
 *         description: API funcionando normalmente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pong:
 *                   type: boolean
 *                   example: true
 *             example:
 *               pong: true
 */
