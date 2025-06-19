import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET || 'default_key'; // store in env in production


export function encryptMessage(message: string): string {
    // console.log("Using secret key:", SECRET_KEY);
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
}

export function decryptMessage(cipherText: string): string {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
