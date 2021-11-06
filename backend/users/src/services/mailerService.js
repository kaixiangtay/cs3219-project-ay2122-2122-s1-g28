import nodemailer from "nodemailer";
import {
	GCP_CLIENT_ID,
	GCP_CLIENT_SECRET,
	EMAIL,
	GCP_ACCESS_TOKEN,
	GCP_REFRESH_TOKEN,
	FRONTEND_URL,
} from "../config/config.js";

const transporter = nodemailer.createTransport({
	service: "gmail",
	secure: true,
	auth: {
		type: "OAuth2",
		user: EMAIL,
		clientId: GCP_CLIENT_ID,
		clientSecret: GCP_CLIENT_SECRET,
		refreshToken: GCP_REFRESH_TOKEN,
		accessToken: GCP_ACCESS_TOKEN,
		expires: 1484314697598,
	},
});

const registerAccountEmailOptions = (email, token) => {
	const emailOptions = {
		from: EMAIL,
		to: email,
		subject: "NUSociaLife Account Verification",
		html: `
    	<p>
		Hello!
		</p>
		<p>
		Your account on NUSociaLife has been created. 
    	</p> 
    
    	<p>
		Please click <a href="${FRONTEND_URL}/verify-email/${token}">
		here</a> to verify your email address before you can login.
		</p>
    
		<p style="color:red;">
		Do note that this link is only valid for 15 minutes.
		</p>
		Thank you,
		<br>
		NUSociaLife Team
		<br>
		</p>`,
	};
	return emailOptions;
};

const resetPasswordEmailOptions = (email, tempPassword) => {
	const emailOptions = {
		from: EMAIL,
		to: email,
		subject: "NUSociaLife Account Reset Passsword",
		html: `
		<p> Hello! </p>
		<p>Here is your temporary password: ${tempPassword} </p>
		<p>
		Thank you,
    	<br>
		NUSociaLife Team
    	</br>
		</p>`,
	};

	return emailOptions;
};

async function sendRegisterUserEmail(email, token) {
	try {
		const emailOptions = registerAccountEmailOptions(email, token);
		await transporter.sendMail(emailOptions);
		transporter.close();
	} catch (err) {
		console.log(err);
		transporter.close();
	}
}

async function sendForgotPasswordEmail(email, tempPassword) {
	try {
		const emailOptions = resetPasswordEmailOptions(email, tempPassword);
		await transporter.sendMail(emailOptions);
		transporter.close();
	} catch (err) {
		console.log(err);
		transporter.close();
	}
}

export default { sendForgotPasswordEmail, sendRegisterUserEmail };
