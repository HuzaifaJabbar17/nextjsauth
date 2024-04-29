import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId } : any ) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "",
      port: 465,
      secure: true,
      auth: {
        user: "",
        pass: "",
      },
    });

    const mailOptions = {
      from: "jk@gmail.com", // senders address
      to: email,
      subject:
        emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD",
      html: "<b>Hello World</b>",
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    // sendMail is the built in function given by transporter.sendMail
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
