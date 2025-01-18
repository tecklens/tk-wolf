import { decrypt, encrypt } from './cipher';
import { EncryptedSecret, WOLF_ENCRYPTION_SUB_MASK } from '../types';
import { secureCredentials } from '../consts';
import { ICredentials } from '../entities';

export function encryptSecret(text: string): EncryptedSecret {
  const encrypted = encrypt(text);

  return `${WOLF_ENCRYPTION_SUB_MASK}${encrypted}`;
}

export function decryptSecret(text: string | EncryptedSecret): string {
  let encryptedSecret = text;

  if (isEncrypted(text)) {
    encryptedSecret = text.slice(WOLF_ENCRYPTION_SUB_MASK.length);
  }

  return decrypt(encryptedSecret);
}

export function encryptCredentials(credentials: ICredentials): ICredentials {
  const encryptedCredentials: ICredentials = {};

  for (const key in credentials) {
    encryptedCredentials[key] = isCredentialEncryptionRequired(key)
      ? encryptSecret(credentials[key])
      : credentials[key];
  }

  return encryptedCredentials;
}

export function decryptCredentials(credentials: ICredentials): ICredentials {
  const decryptedCredentials: ICredentials = {};

  for (const key in credentials) {
    decryptedCredentials[key] =
      typeof credentials[key] === 'string' && isEncrypted(credentials[key])
        ? decryptSecret(credentials[key])
        : credentials[key];
  }

  return decryptedCredentials;
}

export function encryptApiKey(apiKey: string): EncryptedSecret {
  if (isEncrypted(apiKey)) {
    return apiKey;
  }

  return encryptSecret(apiKey);
}

export function decryptApiKey(apiKey: string): string {
  if (isEncrypted(apiKey)) {
    return decryptSecret(apiKey);
  }

  return apiKey;
}

function isEncrypted(text: string): text is EncryptedSecret {
  return text.startsWith(WOLF_ENCRYPTION_SUB_MASK);
}

function isCredentialEncryptionRequired(key: string): boolean {
  return secureCredentials.some((secureCred) => secureCred === key);
}
