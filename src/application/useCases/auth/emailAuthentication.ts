import bcrypt from 'bcrypt';
import { User } from '../../../domain/entities/User';
import { hashPassword } from '../../utils/hashPassword';

export const verifyPassword = async (user: User, password: string) => {
	return await bcrypt.compare(password, user.password!);
};
