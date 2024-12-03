import bcrypt from 'bcrypt';
import { User } from '../../../domain/entities/User';
import { hashPassword } from '../../utils/hashPassword';

export const verifyPassword = async (user: User, password: string) => {
	const hashedPassword = await hashPassword(password);

	return bcrypt.compare(hashedPassword, user.password!);
};
