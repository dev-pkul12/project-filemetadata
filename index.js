require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

/**
 * Multer Setup
 * You can use memoryStorage (no file saved) OR diskStorage (saves in /uploads).
 */

// ✅ Option 1: Memory storage (preferred for FCC project)
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// API endpoint
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}
