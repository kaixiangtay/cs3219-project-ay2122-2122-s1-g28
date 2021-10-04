const { CLIENT_ID, CLIENT_SECRET, EMAIL, REFRESH_TOKEN, OAUTH_URL } = require('../config/config')
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_URL
);

oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      OAUTH_URL
    );
  
    oauth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN
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
        CLIENT_ID: CLIENT_ID,
        CLIENT_SECRET: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN
      }
    });
  
    return transporter;
  };

exports.sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
  };
