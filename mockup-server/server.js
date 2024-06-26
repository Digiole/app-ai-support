// server.js
import express from 'express';
import { example, streamResponse, detect, extractFeature, getChunks } from './responses.js';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';

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
console.log(dbFilePath);
const readData = () => {
  const data = fs.readFileSync(dbFilePath, 'utf-8');
  console.log(data);
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
