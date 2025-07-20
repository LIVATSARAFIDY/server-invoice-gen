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
const express_1 = require("express");
const prisma_1 = require("../../generated/prisma");
const router = (0, express_1.Router)();
const prisma = new prisma_1.PrismaClient();
router.get("/exchange-rates", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const RESPONSE = {
        success: true,
        terms: "https://currencylayer.com/terms",
        privacy: "https://currencylayer.com/privacy",
        timestamp: 1752587163,
        source: "MGA",
        quotes: {
            MGAAED: 0.000828,
            MGAAFN: 0.015568,
            MGAALL: 0.018909,
            MGAAMD: 0.086582,
            MGAANG: 0.000403,
            MGAAOA: 0.206694,
            MGAARS: 0.288405,
            MGAAUD: 0.000344,
            MGAAWG: 0.000406,
            MGAAZN: 0.000383,
            MGABAM: 0.000378,
            MGABBD: 0.000455,
            MGABDT: 0.027405,
            MGABGN: 0.000378,
            MGABHD: 0.000084967736,
            MGABIF: 0.672066,
            MGABMD: 0.000225,
            MGABND: 0.000289,
            MGABOB: 0.001559,
            MGABRL: 0.001253,
            MGABSD: 0.000226,
            MGABTC: 1.907e-9,
            MGABTN: 0.019351,
            MGABWP: 0.003033,
            MGABYN: 0.000738,
            MGABYR: 4.417889,
            MGABZD: 0.000453,
            MGACAD: 0.000309,
            MGACDF: 0.650512,
            MGACHF: 0.00018,
            MGACLF: 0.000005675877,
            MGACLP: 0.217805,
            MGACNY: 0.001616,
            MGACNH: 0.001619,
            MGACOP: 0.902083,
            MGACRC: 0.113764,
            MGACUC: 0.000225,
            MGACUP: 0.005973,
            MGACVE: 0.021287,
            MGACZK: 0.004774,
            MGADJF: 0.040166,
            MGADKK: 0.001444,
            MGADOP: 0.013608,
            MGADZD: 0.029314,
            MGAEGP: 0.011137,
            MGAERN: 0.003381,
            MGAETB: 0.031336,
            MGAEUR: 0.000194,
            MGAFJD: 0.000507,
            MGAFKP: 0.000168,
            MGAGBP: 0.000168,
            MGAGEL: 0.000611,
            MGAGGP: 0.000168,
            MGAGHS: 0.002346,
            MGAGIP: 0.000168,
            MGAGMD: 0.016116,
            MGAGNF: 1.956757,
            MGAGTQ: 0.001731,
            MGAGYD: 0.047171,
            MGAHKD: 0.001769,
            MGAHNL: 0.0059,
            MGAHRK: 0.001457,
            MGAHTG: 0.029616,
            MGAHUF: 0.077449,
            MGAIDR: 3.669868,
            MGAILS: 0.000755,
            MGAIMP: 0.000168,
            MGAINR: 0.019367,
            MGAIQD: 0.295483,
            MGAIRR: 9.492263,
            MGAISK: 0.027558,
            MGAJEP: 0.000168,
            MGAJMD: 0.036046,
            MGAJOD: 0.00016,
            MGAJPY: 0.033464,
            MGAKES: 0.029142,
            MGAKGS: 0.019711,
            MGAKHR: 0.903861,
            MGAKMF: 0.095176,
            MGAKPW: 0.202868,
            MGAKRW: 0.311524,
            MGAKWD: 0.000068906034,
            MGAKYD: 0.000188,
            MGAKZT: 0.118629,
            MGALAK: 4.862548,
            MGALBP: 20.209942,
            MGALKR: 0.067909,
            MGALRD: 0.045224,
            MGALSL: 0.004014,
            MGALTL: 0.000666,
            MGALVL: 0.000136,
            MGALYD: 0.001222,
            MGAMAD: 0.002033,
            MGAMDL: 0.003812,
            MGAMKD: 0.011884,
            MGAMMK: 0.473274,
            MGAMNT: 0.808034,
            MGAMOP: 0.001824,
            MGAMRU: 0.008964,
            MGAMUR: 0.010242,
            MGAMVR: 0.003471,
            MGAMWK: 0.39112,
            MGAMXN: 0.004219,
            MGAMYR: 0.000956,
            MGAMZN: 0.014417,
            MGANAD: 0.004014,
            MGANGN: 0.345301,
            MGANIO: 0.008301,
            MGANOK: 0.002294,
            MGANPR: 0.030962,
            MGANZD: 0.000377,
            MGAOMR: 0.000086667447,
            MGAPAB: 0.000226,
            MGAPEN: 0.000804,
            MGAPGK: 0.000933,
            MGAPHP: 0.012793,
            MGAPKR: 0.064194,
            MGAPLN: 0.000824,
            MGAPYG: 1.746525,
            MGAQAR: 0.000822,
            MGARON: 0.000983,
            MGARSD: 0.022667,
            MGARUB: 0.017581,
            MGARWF: 0.325927,
            MGASAR: 0.000845,
            MGASBD: 0.001875,
            MGASCR: 0.003188,
            MGASDG: 0.135355,
            MGASEK: 0.00218,
            MGASGD: 0.000289,
            MGASHP: 0.000177,
            MGASLE: 0.005071,
            MGASLL: 4.726579,
            MGASOS: 0.1289,
            MGASRD: 0.008386,
            MGASTD: 4.665377,
            MGASVC: 0.001974,
            MGASYP: 2.93065,
            MGASZL: 0.004013,
            MGATHB: 0.007328,
            MGATJS: 0.002156,
            MGATMT: 0.000791,
            MGATND: 0.000661,
            MGATOP: 0.000528,
            MGATRY: 0.009064,
            MGATTD: 0.001531,
            MGATWD: 0.006616,
            MGATZS: 0.588864,
            MGAUAH: 0.009432,
            MGAUGX: 0.808494,
            MGAUSD: 0.000225,
            MGAUYU: 0.009193,
            MGAUZS: 2.864479,
            MGAVES: 0.025737,
            MGAVND: 5.891458,
            MGAVUV: 0.026936,
            MGAWST: 0.000619,
            MGAXAF: 0.126633,
            MGAXAG: 0.000005941182,
            MGAXAU: 6.7571e-8,
            MGAXCD: 0.000609,
            MGAXDR: 0.000158,
            MGAXOF: 0.126633,
            MGAXPF: 0.023023,
            MGAYER: 0.054401,
            MGAZAR: 0.004017,
            MGAZMK: 2.028893,
            MGAZMW: 0.005148,
            MGAZWL: 0.07258
        }
    };
    try {
        const rates = RESPONSE;
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
        const exchangeRate = yield prisma.exchangeRate.createMany({
            data: tab
        });
        res.status(200).json(exchangeRate);
    }
    catch (error) {
    }
}));
exports.default = router;
