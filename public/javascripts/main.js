const scanBtn = document.querySelector("#photo");
const searchBtn = document.querySelector("#search");

scanBtn.addEventListener("click", () => {
  axios
    .get("/api/scan-image")
    .then((response) => {})
    .catch((err) => console.error(err.message));
});

searchBtn.addEventListener("click", () => {
  const input = document.querySelector("#find").value;
  const list = document.querySelector(".list");
  axios
    .get(`/api/search/${input}`)
    .then((response) => {
     const html = response.data
     list.innerHTML = html;
     
    })
    .catch((err) => console.error(err.message));
});
