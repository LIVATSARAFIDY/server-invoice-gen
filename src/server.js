"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes"));
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const prisma_1 = require("../generated/prisma");
require("dotenv/config");
require("./cron/exchangeRateJob");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const prisma = new prisma_1.PrismaClient();
app.use((0, cors_1.default)())
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: true }))
    .use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 heures
    },
}))
    .use(passport_1.default.initialize())
    .use(passport_1.default.session());
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        console.log("Connexion base de données réussi !");
    }
    catch (error) {
        console.error("ERREUR DE CONNEXION A LA BASE DE DONNEES :", error);
        process.exit(1);
    }
}))();
app.use("/api/test", testRoutes_1.default);
app.use("/api/invoice", invoiceRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Bienvenue sur g l'API de l'application génération de facture !");
});
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
exports.default = app;
