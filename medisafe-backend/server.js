const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const { body, validationResult } = require('express-validator');
const HealthCondition = require('./HealthCondition');
const Symptoms = require('./Symptoms');

app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb+srv://thongnguyen07102004:thong+0917374532@cluster0.bgqcb.mongodb.net/medisafe?retryWrites=true&w=majority&appName=Cluster0')

  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Định nghĩa schema cho người dùng
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Định nghĩa schema cho ghi chú
const NoteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  reminderTime: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Note = mongoose.model('Note', NoteSchema);


// Middleware xác thực token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized access. Token is missing.' });

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden access. Invalid token.' });
    req.user = user;
    next();
  });
};

// Đăng ký
app.post('/register',
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Email already exists' });
    }
  }
);

// Đăng nhập
app.post('/login',
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
});

// Tìm kiếm điều kiện sức khỏe
app.get('/api/healthconditions', async (req, res) => {
  const { name } = req.query;

  try {
    const conditions = await HealthCondition.find({ name: new RegExp(name, 'i') }); // Tìm kiếm không phân biệt chữ hoa chữ thường
    res.json(conditions);
  } catch (error) {
    console.error('Error fetching health conditions:', error);
    res.status(500).json({ error: 'Error fetching health conditions' });
  }
});

// Tìm kiếm triệu chứng
app.get('/api/symptoms', async (req, res) => {
  const { name } = req.query;

  try {
    const conditions = await Symptoms.find({ name: new RegExp(name, 'i') }); // Tìm kiếm không phân biệt chữ hoa chữ thường
    res.json(conditions);
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    res.status(500).json({ error: 'Error fetching symptoms' });
  }
});

// Lắng nghe ở cổng 5000
app.listen(5000, () => {
  console.log('Server running on http://0.0.0.0:5000');
});