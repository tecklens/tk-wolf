export class ProviderStore {
    providers = {};
    async addProvider(providerId, provider) {
        this.providers[providerId] = provider;
    }
    async getProviderById(providerId) {
        return this.providers[providerId];
    }
    async getProviderByInternalId(providerId) {
        return (await this.getProviders()).find((provider) => provider.id === providerId);
    }
    async getProviderByChannel(channel) {
        return (await this.getProviders()).find((provider) => provider.channelType === channel);
    }
    async getProviders() {
        return Object.values(this.providers);
    }
}
//# sourceMappingURL=provider.store.js.map