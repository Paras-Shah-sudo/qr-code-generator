import express from "express";
import qr from "qr-image";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.get("/generate", (req, res) => {
    const url = req.query.url;
    if(!url) return res.status(400).send("Missing URL");
    
    res.setHeader("Content-Type", "image/png");
    const qr_png = qr.image(url, {type: "png", size: 10});
    qr_png.pipe(res);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
