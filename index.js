const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

let accountData = { username: "Chưa kết nối", status: "Offline", level: 0, fightingStyles: [] };

app.post('/api/update-account', (req, res) => {
    if (req.body && req.body.username) {
        accountData = { ...req.body, status: "Online" };
        res.status(200).send("OK");
    } else {
        res.status(400).send("Lỗi");
    }
});

app.get('/api/get-account', (req, res) => res.status(200).json(accountData));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại cổng ${PORT}`));
