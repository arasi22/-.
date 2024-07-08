const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB接続
mongoose.connect('mongodb://localhost:27017/punchCount', { useNewUrlParser: true, useUnifiedTopology: true });

const countSchema = new mongoose.Schema({ count: Number });
const Count = mongoose.model('Count', countSchema);

// 初期カウントを設定
async function initializeCount() {
    try {
        const count = await Count.findOne({});
        if (!count) {
            const newCount = new Count({ count: 0 });
            await newCount.save();
        }
    } catch (err) {
        console.error('Error initializing count:', err);
    }
}

initializeCount();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/count', async (req, res) => {
    try {
        const count = await Count.findOne({});
        res.json({ count: count.count });
    } catch (err) {
        console.error('Error fetching count:', err);
        res.status(500).send(err);
    }
});

app.post('/punch', async (req, res) => {
    try {
        const result = await Count.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true });
        res.json({ count: result.count });
    } catch (err) {
        console.error('Error updating count:', err);
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
