import express from "express";
import { singin, singup } from "../controllers/auth.controller.js";

const router = express.Router();

// Singup
router.post("/singup", singup);

// Singin
router.post("/singin", singin);

// Google login
router.post("/google");

export default router;
