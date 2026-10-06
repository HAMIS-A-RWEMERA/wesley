import app from '../server/app';
import { getDb } from '../server/database/db';

export default async function handler(req: any, res: any) {
  try {
    await getDb();
  } catch (err) {
    console.warn('Pre-warming DB warning in serverless handler:', err);
  }
  return app(req, res);
}
