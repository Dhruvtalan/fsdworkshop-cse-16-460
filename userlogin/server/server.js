import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USERS_FILE = path.join(__dirname, "users.json");
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

function readUsers() {
  const data = fs.readFileSync(USERS_FILE, "utf8");
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are all required." });
  }

  const users = readUsers();
  const alreadyExists = users.some((user) => user.email === email);
  if (alreadyExists) {
    return res.status(409).json({ message: "An account with that email already exists." });
  }

  users.push({ name, email, password });
  writeUsers(users);

  res.status(201).json({ message: "Account created. You can log in now." });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "That email and password don't match." });
  }

  res.status(200).json({ message: `Welcome back, ${user.name}.` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
