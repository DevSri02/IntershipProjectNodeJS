const express = require("express");
const { signup, login, confirmEmail } = require("../controllers/auth");
const { profile } = require("../controllers/profie"); // Corrected the path to profile controller

const router = express.Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Retrieve the user profile
 *     description: Fetch the profile information of the authenticated user.
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                 username:
 *                   type: string
 *                   description: The username.
 *                 email:
 *                   type: string
 *                   description: The user email.
 */
router.get("/profile", profile); // Corrected the route syntax

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user.
 *               email:
 *                 type: string
 *                 description: The email of the new user.
 *               password:
 *                 type: string
 *                 description: The password of the new user.
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The generated ID for the user.
 *                 username:
 *                   type: string
 *                   description: The username of the user.
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authenticate a user
 *     description: Log in a user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token.
 */
router.post("/login", login);

router.get("/confirm-email/:token", confirmEmail);

module.exports = router;
