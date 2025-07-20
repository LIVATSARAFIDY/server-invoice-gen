import cron from "node-cron";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

async function fetchExchangeRates() {
    try {
        const response = await fetch(`https://api.exchangerate.host/live?access_key=${process.env.API_KEY_EXCHANGE}&source=MGA`);
        const data = await response.json();
        
        if (!data.success) {
            throw new Error("Error in exchange rate data");
        }

        const rates = data
        const currencies = await prisma.currency.findMany({});
        const baseCurrency = await prisma.currency.findUnique({
            where: { code: rates.source }
        })
        const tab = []
        
        for (const [code, rate] of Object.entries(rates.quotes)) {
            const targetCurrency = currencies.find(c => c.code === code.slice(3));
            if (targetCurrency && baseCurrency) {
                tab.push({
                    baseCurrencyId: baseCurrency.id,
                    targetCurrencyId: targetCurrency.id,
                    rate: rate as number,
                    date: new Date(rates.timestamp * 1000) 
                });
            } 
            
        }
        await prisma.exchangeRate.deleteMany({});
        await prisma.exchangeRate.createMany({
            data: tab
        })
        console.log("Exchange rates updated successfully.");

    } catch (error) {
        console.error(`[CRON] Error fetching rates:`, error);
    }
}

cron.schedule("* 6 * * *", async () => {
    await fetchExchangeRates();
});
 
export {}
