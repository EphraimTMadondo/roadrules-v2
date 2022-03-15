import { Twilio } from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const serviceSid = process.env.TWILIO_SERVICE_SID as string;
const client = new Twilio(accountSid, authToken);

export async function sendVerCode(phoneNumber: string) {
  try {
    await client.verify
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong sending verification code.');
  }
}

export async function authVerCode(phoneNumber: string, code: string) {
  try {
    const verificationCheck = await client.verify
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code });

    return verificationCheck.status === 'approved';
  } catch (err) {
    console.log(err);
    throw new Error('Verification failed');
  }
}
