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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prisma_1 = require("../../generated/prisma");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const prisma = new prisma_1.PrismaClient();
const JWT_SECRET = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "DEFAULT_SECRET_KEY";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, userStatus, roleId } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(409).json({ error: 'User already exists' });
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const newUser = yield prisma.user.create({
            data: {
                email,
                firstname,
                lastname,
                userStatus,
                roleId,
                password: hashedPassword
            }
        });
        const token = jsonwebtoken_1.default.sign({
            userId: newUser.id,
            email: newUser.email
        }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(201).json({ token, user: newUser });
    }
    catch (error) {
        console.log('error registration', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email }, include: { role: true } });
        if (!user)
            return res.status(401).json({ error: 'Invalid credentials' });
        const isValid = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isValid)
            return res.status(401).json({ error: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email
        }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            token,
            user: user,
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.login = login;
