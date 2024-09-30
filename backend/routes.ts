import { Request, Response, Router } from "express";
import fs from "fs";
import crypto from "crypto";
import { validate as validateCPF } from "cpf-check";

const router = Router();
const userDataPath = "./database/user.json";

// Use uma chave de 32 bytes (32 caracteres)
const secretKey = "12345678901234567890123456789012"; // ou use: crypto.randomBytes(32)

function encryptData(data: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "utf-8"),
    iv
  );
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

function decryptData(data: string): string {
  const [iv, encrypted] = data.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "utf-8"),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

function generateToken(): string {
  return crypto.randomBytes(16).toString("hex");
}

function saveUserData(users: object[]) {
  fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));
}

function getUserData(): any[] {
    if (fs.existsSync(userDataPath)) {
        const fileData = fs.readFileSync(userDataPath, 'utf-8');
        try {
            const encryptedUsers = fileData ? JSON.parse(fileData) : [];
            return encryptedUsers.map((user: any) => {
                const decryptedUser = decryptData(user.encryptedData);
                return JSON.parse(decryptedUser); // Retorna o usuário descriptografado
            });
        } catch (error) {
            console.error('Erro ao analisar o arquivo de dados do usuário:', error);
            return []; // Retorna um array vazio em caso de erro
        }
    }
    return [];
}

router.post('/register', async (req: Request, res: Response): Promise<any> => {
    const { email, password, cpf } = req.body;

    // Validação dos dados de cadastro
    if (!email || !password || !cpf) {
        return res.status(400).json({ message: 'Email, senha e CPF são obrigatórios' });
    }

    // Verificar se o email ou CPF já estão cadastrados
    const existingUser = getUserData(); // Obtém os usuários descriptografados

    if (existingUser.some((user: any) => user.email === email || user.cpf === cpf)) {
        return res.status(400).json({ message: 'Email ou CPF já cadastrados' });
    }

    // Validações email, CPF e Senha
    const validEmailDomains = ['@gmail.com', '@hotmail.com', '@icloud.com', '@outlook.com'];
    const isEmailValid = validEmailDomains.some(domain => email.endsWith(domain));
    if (!isEmailValid) {
        return res.status(400).json({ message: 'Email deve ser um dos seguintes domínios: @gmail.com, @hotmail.com, @icloud.com, @outlook.com' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caracteres' });
    }

    if (!validateCPF(cpf)) {
        return res.status(400).json({ message: 'CPF inválido' });
    }

    try {
        const userData = { email, cpf, token: generateToken() };
        const encryptedData = encryptData(JSON.stringify(userData));

        // Adiciona o novo usuário ao array existente
        existingUser.push({ encryptedData });
        
        // Salva o array atualizado no arquivo
        saveUserData(existingUser);

        return res.status(201).json({ message: 'Cadastro bem-sucedido', token: userData.token });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Erro no servidor', error: error.message });
        }
        return res.status(500).json({ message: 'Erro desconhecido no servidor' });
    }
});

export default router;
