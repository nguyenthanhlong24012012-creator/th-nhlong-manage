const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Biến lưu trữ nhiều tài khoản
let accounts = {};

app.post('/api/update-account', (req, res) => {
    if (req.body && req.body.username) {
        accounts[req.body.username] = { 
            ...req.body, 
            status: "Online",
            lastUpdate: Date.now() 
        };
        res.status(200).send("OK");
    } else {
        res.status(400).send("Thiếu dữ liệu");
    }
});

app.get('/api/get-account', (req, res) => {
    const now = Date.now();
    let accountsArray = [];
    
    // Tự động set Offline nếu quá 15 giây không nhận được tín hiệu (treo game, dis mạng)
    for (let username in accounts) {
        if (now - accounts[username].lastUpdate > 15000) {
            accounts[username].status = "Offline";
        }
        accountsArray.push(accounts[username]);
    }
    
    res.status(200).json(accountsArray);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
