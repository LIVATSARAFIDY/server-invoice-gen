import express from "express"
import cors from "cors"
import { PrismaClient } from "../generated/prisma";
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

app.use(cors())
   .use(express.json())
   .use(express.urlencoded({ extended: true })); 

(async () => {
    try {
        await prisma.$connect();
        console.log("Connexion base de données réussi !");
    } catch (error) {
        console.error("ERREUR DE CONNEXION A LA BASE DE DONNEES :",error);
        process.exit(1);
    }
})();

app.get("/", (req, res) => {
    res.send("Bienvenue sur g l'API de l'application de gestion des tâches !");
})


app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app