import { EncryptedSecret } from '../types';
import { ICredentials } from '../entities';
export declare function encryptSecret(text: string): EncryptedSecret;
export declare function decryptSecret(text: string | EncryptedSecret): string;
export declare function encryptCredentials(credentials: ICredentials): ICredentials;
export declare function decryptCredentials(credentials: ICredentials): ICredentials;
export declare function encryptApiKey(apiKey: string): EncryptedSecret;
export declare function decryptApiKey(apiKey: string): string;
