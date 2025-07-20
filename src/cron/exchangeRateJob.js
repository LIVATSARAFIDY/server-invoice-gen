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
const node_cron_1 = __importDefault(require("node-cron"));
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
function fetchExchangeRates() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.exchangerate.host/live?access_key=${process.env.API_KEY_EXCHANGE}&source=MGA`);
            const data = yield response.json();
            if (!data.success) {
                throw new Error("Error in exchange rate data");
            }
            const rates = data;
            const currencies = yield prisma.currency.findMany({});
            const baseCurrency = yield prisma.currency.findUnique({
                where: { code: rates.source }
            });
            const tab = [];
            for (const [code, rate] of Object.entries(rates.quotes)) {
                const targetCurrency = currencies.find(c => c.code === code.slice(3));
                if (targetCurrency && baseCurrency) {
                    tab.push({
                        baseCurrencyId: baseCurrency.id,
                        targetCurrencyId: targetCurrency.id,
                        rate: rate,
                        date: new Date(rates.timestamp * 1000)
                    });
                }
            }
            yield prisma.exchangeRate.deleteMany({});
            yield prisma.exchangeRate.createMany({
                data: tab
            });
            console.log("Exchange rates updated successfully.");
        }
        catch (error) {
            console.error(`[CRON] Error fetching rates:`, error);
        }
    });
}
node_cron_1.default.schedule("* 6 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchExchangeRates();
}));
