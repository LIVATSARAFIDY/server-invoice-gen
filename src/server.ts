import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"; 
import testRoutes from "./routes/testRoutes"; 
import invoiceRoutes from "./routes/invoiceRoutes"; 
import passport from "passport";
import session from "express-session"

import { PrismaClient } from "../generated/prisma";

import 'dotenv/config'
import './cron/exchangeRateJob'

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

app.use(cors())
   .use(express.json())
   .use(express.urlencoded({ extended: true }))
   .use(
        session({
            secret: process.env.SESSION_SECRET || "keyboard cat",
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === "production",
                maxAge: 24 * 60 * 60 * 1000, // 24 heures
                },
            })
    )
   .use(passport.initialize())
   .use(passport.session()); 

(async () => {
    try {
        await prisma.$connect();
        console.log("Connexion base de données réussi !");
    } catch (error) {
        console.error("ERREUR DE CONNEXION A LA BASE DE DONNEES :",error);
        process.exit(1);
    }
})();

app.use("/api/test", testRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/auth", authRoutes );

app.get("/", (req, res) => {
    res.send("Bienvenue sur g l'API de l'application génération de facture !");
})



app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app