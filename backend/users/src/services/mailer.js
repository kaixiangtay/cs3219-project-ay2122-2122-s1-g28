const { GCP_CLIENT_ID, GCP_CLIENT_SECRET, EMAIL, GCP_REFRESH_TOKEN, OAUTH_URL } = require('../config/config')
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    GCP_CLIENT_ID,
    GCP_CLIENT_SECRET,
    OAUTH_URL
);

oauth2Client.setCredentials({
    GCP_REFRESH_TOKEN: GCP_REFRESH_TOKEN
});

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      GCP_CLIENT_ID,
      GCP_CLIENT_SECRET,
      OAUTH_URL
    );
  
    oauth2Client.setCredentials({
      GCP_REFRESH_TOKEN: GCP_REFRESH_TOKEN
    });
  
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject();
        }
        resolve(token);
      });
    });
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL,
        accessToken,
        GCP_CLIENT_ID: GCP_CLIENT_ID,
        GCP_CLIENT_SECRET: GCP_CLIENT_SECRET,
        refreshToken: GCP_REFRESH_TOKEN
      }
    });
  
    return transporter;
  };

exports.sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
  };
