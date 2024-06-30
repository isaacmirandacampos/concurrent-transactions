import 'dotenv/config';
import App from './app';

const app = new App();
app.mountRoutes();
try {
  const serverPort = 5024;
  app.server.listen({ host: '0.0.0.0', port: serverPort }, () => {
    console.info(`Server listening on port:: ${serverPort}`);
  });
} catch (error: any) {
  console.error('Error on initialize the server::', error);
  if (process.env.NODE_ENV === 'development') process.exit(1);
}