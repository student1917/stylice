import express from 'express'
import { payWithCash, createMomoPayment, handleMomoIPN, createVNPayPayment} from '../controllers/paymentController.js'

const router = express.Router()

router.post('/payWithCash', payWithCash)

router.post("/momo", createMomoPayment)
router.post('/momo-ipn', handleMomoIPN)
router.post('/vnpay', createVNPayPayment)

export default router