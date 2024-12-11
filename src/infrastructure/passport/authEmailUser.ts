import { ProtectedUser, User } from '../../domain/entities/User';

const authEmailUser = async (email, password, cb) => {
	try {
		console.log('login started');
		const user = await new User().find(email);
		console.log(user);
		if (!user) return cb(null, false);

		console.log(`verify password: ${await user.verifyPassword(password)}`);
		if (!(await user.verifyPassword(password))) return cb(null, false);

		return cb(null, new ProtectedUser(user));
	} catch (error) {
		return cb(error.message);
	}
};

export default authEmailUser;
