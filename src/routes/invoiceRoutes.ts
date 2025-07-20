import {  Router } from 'express';
import { defaultCurrencies } from '../controllers/invoiceController';
const router = Router();

router.get('/default-currencies', defaultCurrencies);

export default router;