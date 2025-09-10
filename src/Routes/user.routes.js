const express = require("express");
const {
  UserRegister,
  UserLogin,
  googleLogin,
  RefreshToken,
} = require("../Controllers/user.controllers");

const router = express.Router();

// /**
//  * @openapi
//  * /app/auth/sign-up:
//  *   post:
//  *     summary: Register a new user
//  *     tags:
//  *       - Users
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/user'
//  *     responses:
//  *       201:
//  *         description: User registered successfully
//  *         content:
//  *           application/json:
//  *             
//  *       400:
//  *         description: Bad request
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/ErrorResponse'
//  *       401:
//  *         description: Unauthorized
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/ErrorResponse'
//  *       500:
//  *         description: Internal Server Error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/ErrorResponse'
//  */
router.post("/sign-up", UserRegister);

// /**
//  * @openapi
//  * /app/auth/login:
//  *   post:
//  *     summary: Login a User
//  *     tags:
//  *       - Users
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *               password:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: User logged in successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 token:
//  *                   type: string
//  *                 userID:
//  *                   type: object
//  *                 email:
//  *                   type: string
//  *       400:
//  *         description: Missing fields
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/ErrorResponse'
//  *       401:
//  *         description: Invalid credentials
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/ErrorResponse'
//  *       500:
//  *         description: Server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/ErrorResponse'
//  */
router.post("/login", UserLogin);

// /**
//  * @openapi
//  * /app/auth/google:
//  *   post:
//  *     summary: Login a user with Google
//  *     tags:
//  *       - Users
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - idToken
//  *             properties:
//  *               idToken:
//  *                 type: string
//  *                 description: Google ID token returned from client
//  *                 example: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ij..."
//  *     responses:
//  *       201:
//  *         description: User Logged in Successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 token:
//  *                   type: string
//  *                 userID:
//  *                   type: object
//  *                 email:
//  *                   type: string
//  *       401:
//  *         description: Invalid Credentials
//  */
router.post("/google", googleLogin);


router.post("/refresh", RefreshToken);

module.exports = router;
