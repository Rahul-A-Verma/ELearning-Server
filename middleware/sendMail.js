import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password // Must be an App Password
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        .container { font-family: Arial; text-align: center; padding: 20px; }
        .otp { font-size: 32px; font-weight: bold; color: #7b68ee; }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hello ${data.userName}, your OTP for account verification is:</p>
        <p class="otp">${data.otp}</p> 
    </div>
</body>
</html>`;

  try {
    await transport.sendMail({
      from: process.env.Gmail,
      to: email,
      subject,
      html,
    });
    console.log("Email sent successfully to:", email);
  } catch (err) {
    console.error("Nodemailer Error:", err);
    throw new Error("Failed to send email"); // This will trigger the catch block in registerUser
  }
};

export default sendMail;