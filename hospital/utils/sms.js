import config from "config";
import Twilio from "twilio";

let { SID, TOKEN, NUMBER } = config.get("SEND_SMS");

const client = new Twilio(SID, TOKEN);

async function sendSMS(userData) {
  try {
    await client.messages.create({
      body: userData.body,
      to: userData.to,
      from: NUMBER,
    });
    console.log("sms send!");
  } catch (error) {
    console.log(error);
  }
}
export default sendSMS;