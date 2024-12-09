import session from 'express-session';
import { sessionTable } from './schema/session.schema';
import db from '.';
import { eq } from 'drizzle-orm';

class DrizzleSessionStore extends session.Store {
	async get(sid, callback) {
		try {
			const result = await db
				.select()
				.from(sessionTable)
				.where(eq(sessionTable.sid, sid))
				.limit(1);

			if (result.length === 0) return callback(null, null);

			const session = result[0];
			if (session.expires && session.expires < new Date()) {
				return callback(null, null); // Session expired
			}

			callback(null, session.session_data);
		} catch (err) {
			callback(err);
		}
	}

	async set(sid, sessionData, callback) {
		try {
			const expires = sessionData.cookie?.expires
				? new Date(sessionData.cookie.expires)
				: null;

			await db
				.insert(sessionTable)
				.values({ sid, session_data: sessionData, expires })
				.onConflictDoUpdate({
					target: sessionTable.sid, // The unique constraint or column to target
					set: {
						session_data: sessionData,
						expires,
					},
				});

			callback(null);
		} catch (err) {
			callback(err);
		}
	}

	async destroy(sid, callback) {
		try {
			await db.delete(sessionTable).where(eq(sessionTable.sid, sid));
			callback(null);
		} catch (err) {
			callback(err);
		}
	}
}

export default DrizzleSessionStore;
