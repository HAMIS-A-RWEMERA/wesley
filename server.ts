import app from './server/app';

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎬 Wesley Studio Platform running at http://0.0.0.0:${PORT}`);
});

export default app;
