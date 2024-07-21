import { decrypt, encrypt } from './cipher';
import { WOLF_ENCRYPTION_SUB_MASK } from '../types';
import { secureCredentials } from '../consts';
export function encryptSecret(text) {
    const encrypted = encrypt(text);
    return `${WOLF_ENCRYPTION_SUB_MASK}${encrypted}`;
}
export function decryptSecret(text) {
    let encryptedSecret = text;
    if (isEncrypted(text)) {
        encryptedSecret = text.slice(WOLF_ENCRYPTION_SUB_MASK.length);
    }
    return decrypt(encryptedSecret);
}
export function encryptCredentials(credentials) {
    const encryptedCredentials = {};
    for (const key in credentials) {
        encryptedCredentials[key] = isCredentialEncryptionRequired(key)
            ? encryptSecret(credentials[key])
            : credentials[key];
    }
    return encryptedCredentials;
}
export function decryptCredentials(credentials) {
    const decryptedCredentials = {};
    for (const key in credentials) {
        decryptedCredentials[key] =
            typeof credentials[key] === 'string' && isEncrypted(credentials[key])
                ? decryptSecret(credentials[key])
                : credentials[key];
    }
    return decryptedCredentials;
}
export function encryptApiKey(apiKey) {
    if (isEncrypted(apiKey)) {
        return apiKey;
    }
    return encryptSecret(apiKey);
}
export function decryptApiKey(apiKey) {
    if (isEncrypted(apiKey)) {
        return decryptSecret(apiKey);
    }
    return apiKey;
}
function isEncrypted(text) {
    return text.startsWith(WOLF_ENCRYPTION_SUB_MASK);
}
function isCredentialEncryptionRequired(key) {
    return secureCredentials.some((secureCred) => secureCred === key);
}
//# sourceMappingURL=encrypt-provider.js.map