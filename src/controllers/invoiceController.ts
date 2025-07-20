import { Response, Request } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();
export const defaultCurrencies = async (req: Request, res: Response) => {
    try {
        const exchangeRates = await prisma.exchangeRate.findMany({
            
            include:{
                targetCurrency: true,
                baseCurrency: true
            },
            where: {
                targetCurrency: { code: { in: ["USD", "EUR", "GBP", "CNH", "CNY"] } },
            }
        }) 
        const currencyAndRate = exchangeRates.map(rate => ({
            currency: rate.targetCurrency.code, rate: rate.rate
        }))
        currencyAndRate.push({currency: "MGA", rate: 1});
        return res.status(200).json(currencyAndRate);
    } catch (error) {
        console.error('Error fetching default currencies:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}