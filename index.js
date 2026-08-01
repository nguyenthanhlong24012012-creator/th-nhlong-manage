const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Biến lưu dữ liệu tạm thời
let accountData = { username: "Chưa kết nối", status: "Offline", level: 0, fightingStyles: [] };

// API nhận dữ liệu từ Roblox
app.post('/api/update-account', (req, res) => {
    if (req.body && req.body.username) {
        accountData = { ...req.body, status: "Online" };
        res.status(200).send("OK");
    } else {
        res.status(400).send("Lỗi");
    }
});

// API trả dữ liệu cho Web
app.get('/api/get-account', (req, res) => {
    res.status(200).json(accountData);
});

// Trang chủ hiển thị giao diện HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// BẮT BUỘC PHẢI CÓ DÒNG NÀY ĐỂ VERCEL CHẠY ĐƯỢC
module.exports = app;
