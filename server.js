require("dotenv").config();

const express = require("express");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");
const path = require("path");

const Url = require("./models/Url");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err)); 


const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));

app.get("/api/urls", async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.json(urls);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch" });
    }
});

app.delete("/api/delete/:id", async (req, res) => {
    try {
        await Url.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
});
/* =========================
   CREATE SHORT URL
========================= */
app.post("/shorten", async (req, res) => {
    try {
        console.log("BODY:", req.body); // 👈 add this

        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ error: "URL is required" });
        }

        new URL(originalUrl);
        const existing = await Url.findOne({ originalUrl });
        if (existing) {
            return res.json({
                shortUrl: `${req.protocol}://${req.get("host")}/${existing.shortCode}`
            });
        }
        const shortCode = nanoid(6);

        const newUrl = new Url({
            originalUrl,
            shortCode
        });

        await newUrl.save();

        res.json({
            shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`
        });

    } catch (err) {
        console.error("ERROR:", err); // 👈 MUST print
        res.status(500).json({ error: "Server error" });
    }
});

/* =========================
   REDIRECT URL
========================= */
app.get("/:code", async (req, res) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.code });

        if (!url) {
            return res.status(404).json({ error: "Not found" });
        }

        url.clicks++;
        await url.save();

        console.log("CLICK UPDATED:", url.clicks);

        res.redirect(url.originalUrl);

    } catch (err) {
        res.status(500).json({ error: "Redirect failed" });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});