"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("../config/passport-setup");
const router = (0, express_1.Router)();
router.post("/login", authController_1.login);
router.post("/register", authController_1.register);
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: process.env.FRONT_URL || "http://localhost:5173/" }), (req, res) => {
    const user = req.user;
    const token = jsonwebtoken_1.default.sign({
        userId: user.id,
        email: user.email,
    }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.send(`
            <html>
                <body>
                <script>
                    window.opener.postMessage(${JSON.stringify(Object.assign({ token: token }, user))}, "*");
                    window.close();
                </script>
                </body>
            </html>
        `);
});
exports.default = router;
