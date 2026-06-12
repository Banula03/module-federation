import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(process.cwd(), 'server', 'data', 'mock-db.json');

// Middleware to simulate authentication demands
function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  
  const token = authHeader.split(' ')[1];
  if (token !== 'secret-bff-token') {
    return res.status(403).json({ error: 'Forbidden: Invalid token payload' });
  }

  next();
}

app.use(authMiddleware);

// --- API ROUTES ---

app.get('/api/users', async (req, res) => {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    const users = JSON.parse(data);

    const newUser = req.body;
    const maxId = users.reduce((max: number, u: any) => Math.max(max, u.id), 0);
    
    const avatar = (newUser.name || 'Unknown User')
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const userToSave = {
      id: maxId + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status || 'Active',
      avatar: avatar
    };

    users.push(userToSave);
    await fs.writeFile(dbPath, JSON.stringify(users, null, 2));

    res.status(201).json(userToSave);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save' });
  }
});

app.patch('/api/users/:id/status', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const data = await fs.readFile(dbPath, 'utf8');
    const users = JSON.parse(data);

    const userIndex = users.findIndex((u: any) => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex].status = status;
    await fs.writeFile(dbPath, JSON.stringify(users, null, 2));

    res.json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
});

app.listen(PORT, () => {
  console.log(`Real Backend Server running on http://localhost:${PORT}`);
});
