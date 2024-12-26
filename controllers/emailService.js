const nodemailer = require("nodemailer");

const emailService = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    });

    let info = await transporter.sendMail({
      from: `"email confirmation" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    });
    console.log(info.response);
    return info;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

module.exports = emailService;

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "Gmail", // Or another email service
//   auth: {
//     user: process.env.EMAIL_USER, // Your email address
//     pass: process.env.EMAIL_PASS, // Your email password
//   },
// });

// const sendEmail = async (email, subject, body) => {
//   try {

//     await transporter.sendMail({
//       from: `${process.env.EMAIL_USER}`, // Sender address
//       to: `${email}`, // Recipient address
//       subject: `${subject}`, // Subject line
//       body: `${body}`, // HTML body
//     });
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email", error);
//     throw new Error("Email sending failed");
//   }
// };

// module.exports = sendEmail;
