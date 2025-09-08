import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';

// console.log('SMTP CONFIG:', {
//   host: SMTP.HOST,
//   port: SMTP.PORT,
//   user: SMTP.USER,
//   from: SMTP.FROM,
// });

const transporter = nodemailer.createTransport({
  host: SMTP.HOST,
  port: SMTP.PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: SMTP.USER,
    pass: SMTP.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (options) => {
  return transporter.sendMail(options);
};
