const { GCP_CLIENT_ID, GCP_CLIENT_SECRET, EMAIL, GCP_ACCESS_TOKEN, GCP_REFRESH_TOKEN, OAUTH_URL } = require('../config/config')
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
      type: 'OAuth2',
      user: EMAIL,
      clientId: GCP_CLIENT_ID,
      clientSecret: GCP_CLIENT_SECRET,
      refreshToken: GCP_REFRESH_TOKEN,
      accessToken: GCP_ACCESS_TOKEN,
      expires: 1484314697598
  }
});

exports.sendEmail = async (emailOptions) => {
    try {
      await transporter.sendMail(emailOptions);
    } catch (err) {
        console.log(err);
    }
  };
