import Booking from "../models/Booking.js"
import User from "../models/User.js"
import Payment from "../models/Payment.js"
import Service from "../models/Service.js"
import axios from 'axios'
import crypto from 'crypto'
import qs from 'qs';



export const payWithCash = async(req, res) => {
    
    try {
        const {bookingId, amount} = req.body

        const booking = await Booking.findById(bookingId).populate('user')
        if (!booking)
            return res.status(404).json({message:'Booking not found'})

            const orderId = 'CASH' + Date.now()
            const transactionId = `CASH_TX_${Date.now()}_${Math.floor(Math.random() * 1000)}`
            
            const payment = new Payment({
                orderId,
                bookingId,
                amount,
                paymentMethod: 'cash',
                status: 'confirmed',
                paymentTime: new Date(),
                transactionId,
                })

            await payment.save()
            booking.paymentId = payment._id;
            booking.status = 'confirmed';
            await booking.save();

            await Service.findByIdAndUpdate(booking.service, {
                $inc: { bookedCount: 1 },
              });

            res.status(200).json({
                success:true, 
                data: { payment, booking }
            })
            
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message:'Error'
        })
    }
}

export const createMomoPayment = async (req, res) => {
    try {
      const { amount, bookingId } = req.body;
  
      const {
        MOMO_PARTNER_CODE,
        MOMO_ACCESS_KEY,
        MOMO_SECRET_KEY,
        MOMO_REDIRECT_URL,
        MOMO_IPN_URL,
        MOMO_API_URL
      } = process.env;
  
      const requestType = 'payWithMethod';
      const orderId = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      const requestId = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      const orderInfo = `Pay for order ${orderId}`;
      //const redirectUrl = `${MOMO_REDIRECT_URL}/${bookingId}`;
  
      const rawSignature = 
        `accessKey=${MOMO_ACCESS_KEY}` +
        `&amount=${amount}` +
        `&extraData=` +
        `&ipnUrl=${MOMO_IPN_URL}` +
        `&orderId=${orderId}` +
        `&orderInfo=${orderInfo}` +
        `&partnerCode=${MOMO_PARTNER_CODE}` +
        `&redirectUrl=${MOMO_REDIRECT_URL}` +
        `&requestId=${requestId}` +
        `&requestType=${requestType}`;
  
      const signature = crypto
        .createHmac('sha256', MOMO_SECRET_KEY)
        .update(rawSignature)
        .digest('hex');
  
      const payload = {
        partnerCode: MOMO_PARTNER_CODE,
        accessKey: MOMO_ACCESS_KEY,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl: MOMO_REDIRECT_URL,
        ipnUrl: MOMO_IPN_URL,
        extraData: '',
        requestType,
        signature,
        lang: 'vi',
      };
  
      const momoRes = await axios.post(MOMO_API_URL, payload);
  
      await Payment.create({
        bookingId,
        paymentMethod: 'momo',
        orderId,
        requestId,
        amount,
        status: 'pending',
      });
  
      return res.status(200).json({ payUrl: momoRes.data.payUrl });
    } catch (err) {
      console.error('[Momo Payment Error]:', err);
      return res.status(500).json({ message: 'Momo payment error', error: err.message });
    }
  };
  
  export const handleMomoIPN = async (req, res) => {
      try {
        const data = req.body;
        const {
          MOMO_ACCESS_KEY,
          MOMO_SECRET_KEY
        } = process.env;
    
        const rawSignature = 
          `accessKey=${MOMO_ACCESS_KEY}` +
          `&amount=${data.amount}` +
          `&extraData=${data.extraData}` +
          `&message=${data.message}` +
          `&orderId=${data.orderId}` +
          `&orderInfo=${data.orderInfo}` +
          `&orderType=${data.orderType}` +
          `&partnerCode=${data.partnerCode}` +
          `&payType=${data.payType}` +
          `&requestId=${data.requestId}` +
          `&responseTime=${data.responseTime}` +
          `&resultCode=${data.resultCode}` +
          `&transId=${data.transId}`;
    
        const signature = crypto
          .createHmac('sha256', MOMO_SECRET_KEY)
          .update(rawSignature)
          .digest('hex');
    
        if (signature !== data.signature) {
          return res.status(400).send('Invalid signature');
        }
    
        const payment = await Payment.findOneAndUpdate(
          { orderId: data.orderId },
          {
            status: data.resultCode === 0 ? 'completed' : 'failed',
            responseData: data,
          },
          { new: true }
        );
    
        if (data.resultCode === 0 && payment) {
          await Booking.findByIdAndUpdate(payment.bookingId, { status: 'paid' });
        }
    
        return res.status(200).json({ message: 'IPN processed' });
      } catch (err) {
        console.error('[Momo IPN Error]:', err);
        return res.status(500).json({ message: 'Failed to process IPN' });
      }
    };

// export const createVNPayPayment = async(req, res) => {
//     try {
//         const { amount, bookingId } = req.body;

//         const tmnCode = process.env.VNPAY_TMN_CODE;       
//         const secretKey = process.env.VNPAY_HASH_SECRET;        
//         const vnpUrl = process.env.VNPAY_URL;
//         const returnUrl = process.env.VNPAY_RETURN_URL;
//         const ipnUrl = process.env.VNP_IPN_URL;
//         //var ipAddr = req.headers['x-forwarded-for'] ||
//             req.connection.remoteAddress ||
//             req.socket.remoteAddress ||
//             req.connection.socket.remoteAddress;
//         const ipAddr = '127.0.0.1';
        
//         const orderId = `VNPAY_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
//         //const createDate = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

//         const now = new Date();
//         now.setHours(now.getHours() + 7); // Chuyển về UTC+7
//         const createDate = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
//         const expireDate = new Date(now.getTime() + 15 * 60 * 1000)
//           .toISOString()
//           .replace(/[-:.TZ]/g, '')
//           .slice(0, 14);

//         let vnpParams = {
//             vnp_Version: '2.1.0',
//             vnp_Command: 'pay',
//             vnp_TmnCode: tmnCode,
//             vnp_Amount: amount * 100, 
//             vnp_CurrCode: 'VND',
//             vnp_TxnRef: orderId,
//             vnp_OrderInfo: `pay for order ${orderId}`,
//             vnp_OrderType: 'other',
//             vnp_Locale: 'vn',
//             vnp_ReturnUrl: returnUrl,
//             vnp_IpAddr: ipAddr,
//             vnp_CreateDate: createDate,
//             vnp_ExpireDate:expireDate,
//             // vnp_ExpireDate: new Date(Date.now() + 15 * 60 * 1000).toISOString().replace(/[-:.TZ]/g, '').slice(0, 14),
            
  
           
//           };


//         vnpParams = Object.fromEntries(
//             Object.entries(vnpParams).sort(([a], [b]) => a.localeCompare(b))
//         )
//         console.log({
//             tmnCode,
//             secretKey,
//             returnUrl,
//             ipnUrl,
//             vnpUrl
//           });
//         const signData = qs.stringify(vnpParams, { encode: false });

//         const hmac = crypto.createHmac('sha512', secretKey);
//         const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        
//         vnpParams.vnp_SecureHash = signed;

//         const paymentUrl = `${vnpUrl}?${qs.stringify(vnpParams, { encode: true })}`;
//         await Payment.create({
//             bookingId,
//             paymentMethod: 'vnpay',
//             orderId,
//             amount,
//             status: 'pending'
//           });
//           console.log('vnpParams:', vnpParams);
//           console.log('signData:', signData);
//           console.log('secureHash:', signed);
          

//         return res.status(200).json({ paymentUrl });

//     } catch (err) {
//         return res.status(500).json({ message: 'VNPay payment error', error: err.message });
//     }
    
    


import moment from 'moment'


export const createVNPayPayment = async (req, res) => {
  try {
    const { amount, bookingId } = req.body

    const tmnCode = process.env.VNPAY_TMN_CODE
    const secretKey = process.env.VNPAY_HASH_SECRET
    const vnpUrl = process.env.VNPAY_URL
    const returnUrl = process.env.VNPAY_RETURN_URL
    const ipnUrl = process.env.VNPAY_IPN_URL

    const date = new Date()
    const createDate = moment(date).format('YYYYMMDDHHmmss')
    const orderId = Date.now().toString()

    const orderInfo = `Thanh toan don hang #${orderId}`
    const amountVND = amount * 100  // chuyển sang đơn vị nhỏ nhất

    const vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: 'other',
      vnp_Amount: amountVND,
      vnp_ReturnUrl: returnUrl,
      vnp_IpnUrl: ipnUrl,
      vnp_CreateDate: createDate,
      vnp_ExpireDate: moment(date).add(15, 'minutes').format('YYYYMMDDHHmmss'),
      vnp_IpAddr: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    }

    // 🔐 Sort keys
    const sortedParams = Object.fromEntries(
      Object.entries(vnp_Params)
      .filter(([key]) => key !== 'vnp_SecureHash')
      .sort(([a], [b]) => a.localeCompare(b))
  );

    // 🔐 Create query string to hash
    const signData = qs.stringify(sortedParams, { encode: false })

    const hmac = crypto.createHmac('sha512', secretKey)
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')

    // 🔐 Append signature
    sortedParams.vnp_SecureHash = signed

    // 🧾 Final URL
    const paymentUrl = `${vnpUrl}?${qs.stringify(sortedParams, { encode: false })}`

    return res.json({ paymentUrl })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'VNPay Error', error: err.message })
  }
}
