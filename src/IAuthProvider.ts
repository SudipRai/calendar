

import { AuthProviderCallback } from "./IAuthProviderCallback";

export type AuthProvider = (done: AuthProviderCallback) => void;
