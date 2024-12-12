import session from 'express-session';
import DrizzleSessionStore from '../../infrastructure/database/drizzle/DrizzleSessionStore';

const configureSession = () =>
	session({
		secret: process.env.SESSION_SECRET!,
		resave: false,
		saveUninitialized: false,
		store: new DrizzleSessionStore(),
		cookie: {
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
		},
	});

export default configureSession;
