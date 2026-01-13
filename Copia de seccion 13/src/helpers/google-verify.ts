import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleVerify = async (
  token: string
): Promise<{
  name: string;
  img: string;
  email: string;
} | null> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return null;
    }

    const { name = "", picture = "", email } = payload;

    return {
      name,
      img: picture,
      email
    };
  } catch (error) {
    console.error('Error verifying Google token:', error);
    return null;
  }
};
