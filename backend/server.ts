import express from 'express';
import fs from 'fs';
import path from 'path';
import  router  from './routes';

const app = express();
const PORT = 8243;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const userFilePath = path.join(__dirname, 'database', 'user.json');
if (!fs.existsSync(userFilePath)) {
  fs.writeFileSync(userFilePath, JSON.stringify([]));
}
