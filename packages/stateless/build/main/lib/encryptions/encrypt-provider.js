"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptApiKey = exports.encryptApiKey = exports.decryptCredentials = exports.encryptCredentials = exports.decryptSecret = exports.encryptSecret = void 0;
const cipher_1 = require("./cipher");
const types_1 = require("@stateless/lib/types");
const consts_1 = require("@stateless/lib/consts");
function encryptSecret(text) {
    const encrypted = (0, cipher_1.encrypt)(text);
    return `${types_1.WOLF_ENCRYPTION_SUB_MASK}${encrypted}`;
}
exports.encryptSecret = encryptSecret;
function decryptSecret(text) {
    let encryptedSecret = text;
    if (isEncrypted(text)) {
        encryptedSecret = text.slice(types_1.WOLF_ENCRYPTION_SUB_MASK.length);
    }
    return (0, cipher_1.decrypt)(encryptedSecret);
}
exports.decryptSecret = decryptSecret;
function encryptCredentials(credentials) {
    const encryptedCredentials = {};
    for (const key in credentials) {
        encryptedCredentials[key] = isCredentialEncryptionRequired(key)
            ? encryptSecret(credentials[key])
            : credentials[key];
    }
    return encryptedCredentials;
}
exports.encryptCredentials = encryptCredentials;
function decryptCredentials(credentials) {
    const decryptedCredentials = {};
    for (const key in credentials) {
        decryptedCredentials[key] =
            typeof credentials[key] === 'string' && isEncrypted(credentials[key])
                ? decryptSecret(credentials[key])
                : credentials[key];
    }
    return decryptedCredentials;
}
exports.decryptCredentials = decryptCredentials;
function encryptApiKey(apiKey) {
    if (isEncrypted(apiKey)) {
        return apiKey;
    }
    return encryptSecret(apiKey);
}
exports.encryptApiKey = encryptApiKey;
function decryptApiKey(apiKey) {
    if (isEncrypted(apiKey)) {
        return decryptSecret(apiKey);
    }
    return apiKey;
}
exports.decryptApiKey = decryptApiKey;
function isEncrypted(text) {
    return text.startsWith(types_1.WOLF_ENCRYPTION_SUB_MASK);
}
function isCredentialEncryptionRequired(key) {
    return consts_1.secureCredentials.some((secureCred) => secureCred === key);
}
//# sourceMappingURL=encrypt-provider.js.map