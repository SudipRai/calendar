

import { GraphClientError } from "./GraphClientError";
import { AuthenticationProvider } from "./IAuthenticationProvider";
import { AuthProvider } from "./IAuthProvider";


export class CustomAuthenticationProvider implements AuthenticationProvider {

	private provider: AuthProvider;


	public constructor(provider: AuthProvider) {
		this.provider = provider;
	}


	public async getAccessToken(): Promise<any> {
		const accessToken = ""
		return new Promise((resolve: (accessToken: string) => void, reject: (error: any) => void) => {
			this.provider(async (error: any, accessToken: string | null) => {
				if (accessToken) {
					resolve(accessToken);
				} else {
					if (!error) {
						const invalidTokenMessage = "Access token is undefined or empty.\
						Please provide a valid token.\
						For more help - https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs/CustomAuthenticationProvider.md";
						error = new GraphClientError(invalidTokenMessage);
					}
					const err = await GraphClientError.setGraphClientError(error);
					reject(err);
				}
			});
		});
	}
}
