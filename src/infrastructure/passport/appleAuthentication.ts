import AppleStrategy from 'passport-apple';

const appleAuthentication: AppleStrategy.VerifyFunction = (
	accessToken,
	refreshToken,
	idToken,
	profile,
	verified
) => {};

export default appleAuthentication;
