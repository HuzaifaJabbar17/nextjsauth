import nodemailer from "nodemailer";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // configuring email
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // const transporter = nodemailer.createTransport({
    //   host: "",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: "",
    //     pass: "",
    //   },
    // });

    const user_account = process.env.USER_ACCOUNT;
    const user_password = process.env.USER_PASSWORD;

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: user_account,
        pass: user_password,
      },
    });

    const mailOptions = {
      from: "jk@gmail.com", // senders address
      to: email,
      subject:
        emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD",
      // html: "<b>Hello World</b>",
      // here we have created html for verify type email same thing we have to do for reset email type i.e h/w
      html: `<p>Click 
      <a href= "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
      here</a>
      to
      ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser.
      <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    // sendMail is the built in function given by transporter.sendMail
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
