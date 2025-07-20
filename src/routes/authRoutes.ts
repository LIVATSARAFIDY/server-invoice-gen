import { Router } from "express";
import { login, register } from "../controllers/authController";
import passport from "passport";
import jwt from "jsonwebtoken";
import "../config/passport-setup";

const router = Router()

router.post("/login", login)
router.post("/register", register)
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: process.env.FRONT_URL || "http://localhost:5173/" }),
    (req, res) => {
        const user = req.user as any;
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET!, 
            { expiresIn: "1h" }
        );
        res.send(`
            <html>
                <body>
                <script>
                    window.opener.postMessage(${JSON.stringify(
                        {
                            token: token,
                            ...user
                        }
                    )}, "*");
                    window.close();
                </script>
                </body>
            </html>
        `);
    }
)

export default router