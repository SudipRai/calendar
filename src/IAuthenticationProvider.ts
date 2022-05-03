

import { AuthenticationProviderOptions } from "./IAuthenticationProviderOptions";


export interface AuthenticationProvider {
	getAccessToken: (authenticationProviderOptions?: AuthenticationProviderOptions) => Promise<string>;
}
