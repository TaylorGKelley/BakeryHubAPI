import { ProtectedUser, User } from '../../domain/entities/User';

const authEmailUser = async (email, password, cb) => {
	try {
		const user = await new User().find(email);
		if (!user) return cb(null, false);

		if (!(await user.verifyPassword(password))) return cb(null, false);

		return cb(null, new ProtectedUser(user));
	} catch (error) {
		return cb(error.message);
	}
};

export default authEmailUser;
