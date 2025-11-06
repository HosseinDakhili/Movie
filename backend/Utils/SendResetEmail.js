import nodemailer from "nodemailer";

 const sendResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "بازیابی رمز عبور",
    text: `کد تغییر رمز عبور :${token}`,
  };

  await transporter.sendMail(mailOptions)
};

export default sendResetEmail