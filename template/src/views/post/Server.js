// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors()); // CORS 허용

app.get('/api/get-ip', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.json({ ip });
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
