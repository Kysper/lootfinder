const express = require("express");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/stylesheets")));
app.use(express.static(path.join(__dirname, "public/javascripts")));
app.use(express.static(path.join(__dirname, "public/images")));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get(`/api/scan-image`, (req, res) => {
  console.log("API CALLING TO IMAGGA");
});

app.get(`/api/search/:input`, (req, res) => {
  const data = req.params.input;
  const query = `https://en.wikipedia.org/wiki/${data}`;
  axios
    .get(query)
    .then(async (response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const scrapedData = $("p").text();
      await res.json(scrapedData.slice(0,500));
    })
    .catch((err) => console.error(err.message));
});

app.listen(8000, () => {
  console.log("App running on port 8000");
});
