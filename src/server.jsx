import { renderToString } from 'react-dom/server';
import express from 'express';
import fs from 'fs';
import path from 'path';
import App from './App';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();


app.use('/assets', express.static(path.resolve(__dirname, '../dist/client/assets')));

app.get('*', async (req, res) => {
  const template = fs.readFileSync(path.resolve(__dirname, '../dist/client/index.html'), 'utf-8');
  const appHtml = renderToString(<App />);
  const html = template.replace(`<!--ssr-outlet-->`, appHtml);
  res.send(html);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
