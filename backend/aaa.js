const jwt = require('jsonwebtoken'); // Import thư viện jsonwebtoken

const dotenv = require('dotenv');
dotenv.config(); // Load các biến môi trường từ file .env vào quá trình của Node.js

const JWT_SECRET = process.env.JWT_SECRET;

const userId = '6620cfaedb55329df46909b5'; // Id của người dùng cần tạo token
const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30d' });
console.log('Generated token:', token);
