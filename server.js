const express = require("express");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const { slice } = require("cheerio/lib/api/traversing");
const { empty } = require("cheerio/lib/api/manipulation");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/stylesheets")));
app.use(express.static(path.join(__dirname, "public/javascripts")));
app.use(express.static(path.join(__dirname, "public/images")));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get(`/api/scan-image`, (req, res) => {
  res.send("API CALLING TO IMAGGA");
});

app.get(`/api/search/:input`, (req, res) => {
  const data = req.params.input;
  const query = `https://en.wikipedia.org/wiki/${data}`;
  axios
    .get(query)
    .then(async (response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      let scrapeData = await {
        title: $(".firstHeading").text().slice(0, 120),
        desc: $("p").text().slice(0, 2000),
        link: query,
      };

      if (data) {
        const HTMLTemplate = `<div class="card">
        <h2>${scrapeData.title}</h2>
        <div class="card-body"> 
        <p class="desc">${scrapeData.desc}</div>
        <a href="${scrapeData.link}">Read more...</a></div>`;
        res.send(HTMLTemplate);
      } else {
        const HTMLTemplate = `<h1>No Page Found</h1>`
        res.send(HTMLTemplate);

      }
    })
    .catch((err) => console.error(err.message));
});

app.listen(8000, () => {
  console.log("App running on port 8000");
});
