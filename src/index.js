import 'dotenv/config';
import server from './boot/express.js';

const runApp = () => {
  try {
    server.listen(process.env.PORT, () => console.log(`App listening at ${process.env.PORT}`))
  } catch (error) {
    console.error(error, 'err');
    process.exit(1);
  }
}

runApp();