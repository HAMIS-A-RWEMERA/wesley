import app from './server/app';
import { getDb } from './server/database/db';

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  await getDb();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎬 Wesley Studio Platform running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

export default app;
