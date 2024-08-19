// server.js
import express from 'express';
import { example, streamResponse, detect, extractFeature, getChunks } from './responses.js';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
import multer from 'multer';

import { Readable } from 'stream';

const app = express();
const PORT = 3000;

// Middleware to handle JSON body parsing
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3332' // Specific origin
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, 'db.json');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const readData = () => {
  const data = fs.readFileSync(dbFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

app.get('/api/v1/profile', (req, res) => {
  const data = readData();
  res.status(200).json(data.profile);
});

app.get('/api/v1/links', (req, res) => {
  const data = readData();
  res.status(200).json(data.sidebarLinks);
});

app.put('/api/v1/profile', (req, res) => {
  const data = readData();
  data.profile = { ...data.profile, ...req.body };
  writeData(data);
  res.status(200).json(data.profile);
});

app.get('/api/v1/files', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read files', err });
    }
    res.status(200).json(files);
  });
});

app.post('/api/v1/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (file) {
    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        filename: file.filename,
        originalname: file.originalname,
      },
    });
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
});

app.delete('/api/v1/files/:filename', (req, res) => {
  const { filename } = req.params;
  fs.unlink(path.join(uploadsDir, filename), (err) => {
    if (err) {
      return res.status(500).json({ message: 'File deletion failed', err });
    }
    res.status(200).json({ message: 'File deleted successfully' });
  });
});

app.post('/api/v1/examples', (req, res) => {
  res.status(200).json(example);
});


app.post('/api/v1/detect', (req, res) => {
  res.status(200).json(detect);
});

app.post('/api/v1/extract-feature', (req, res) => {
  res.status(200).json(extractFeature);
});

app.post('/api/v1/get-chunks', (req, res) => {
  res.status(200).json(getChunks);
});

app.post('/api/v1/generate', (req, res) => {
  //console.log("STREAM ", streamResponse.split("\n"));
  res.setHeader('Content-Type', 'text/plain');
  res.write(streamResponse);
  res.end('');
  /* 
  res.setHeader('Content-Type', 'text/plain');

  const repeat = 5;
  // const { repeat } = req.body;
  let count = 0;

  const intervalId = setInterval(() => {
    res.write(`Data chunk ${++count}\n`);
    if (count === repeat) {
      clearInterval(intervalId);
      res.end('Stream ended');
    }
  }, 1000); */
  /* 
    const stream = new Readable({
      read() {
        // this.push('Part 1 of the stream. ');
        // this.push('Part 2 of the stream. ');
        // this.push(null); // No more data
        this.push(...streamResponse.split("\n"));
      }
    });
  
    res.set('Content-Type', 'text/plain');
    stream.pipe(res); */


  //  res.status(200).json(example);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
