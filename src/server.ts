import 'dotenv/config';
import app from './app';

const port = process.env.APPLICATION_PORT || 7001;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
