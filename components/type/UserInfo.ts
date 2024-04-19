interface TokenResponse {
    kind: string;
    localId: string;
    email: string;
    displayName: string;
    idToken: string;
    registered: boolean;
    refreshToken: string;
    expiresIn: string;
}

interface User {
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerData: ProviderDatum[];
    stsTokenManager: StsTokenManager;
    createdAt: string;
    lastLoginAt: string;
    apiKey: string;
    appName: string;
}

interface ProviderDatum {
    providerId: string;
    uid: string;
    displayName: null;
    email: string;
    phoneNumber: null;
    photoURL: null;
}

interface StsTokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
}

class UserInfo {
    user: User;
    providerId: string;
    _tokenResponse: TokenResponse;
    operationType: string;

    constructor() {
        this.user = new Object() as User;
        this.providerId = '';
        this._tokenResponse = new Object() as TokenResponse;
        this.operationType = '';
    }
}

export default UserInfo;
