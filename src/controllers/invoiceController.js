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
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCurrencies = void 0;
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const defaultCurrencies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exchangeRates = yield prisma.exchangeRate.findMany({
            include: {
                targetCurrency: true,
                baseCurrency: true
            },
            where: {
                targetCurrency: { code: { in: ["USD", "EUR", "GBP", "CNH", "CNY"] } },
            }
        });
        const currencyAndRate = exchangeRates.map(rate => ({
            currency: rate.targetCurrency.code, rate: rate.rate
        }));
        currencyAndRate.push({ currency: "MGA", rate: 1 });
        return res.status(200).json(currencyAndRate);
    }
    catch (error) {
        console.error('Error fetching default currencies:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.defaultCurrencies = defaultCurrencies;
