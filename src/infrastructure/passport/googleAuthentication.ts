import {
	GoogleCallbackParameters,
	Profile,
	VerifyCallback,
} from 'passport-google-oauth20';

const googleAuthentication = (
	accessToken: string,
	refreshToken: string,
	profile: Profile,
	done: VerifyCallback
) => {
	done(null, profile);
};

export default googleAuthentication;
