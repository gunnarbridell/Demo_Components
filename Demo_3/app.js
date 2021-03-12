import "./news-article.js";
import { url } from "./newsApi.js";
console.log("app.js");

//Hämta nyheter
async function fetchNews() {
  console.log("url:" + url);
  const res = await fetch(url);
  const json = await res.json();
  console.log(json);

  const main = document.querySelector("main");

  // Loop aticle array
  json.articles.forEach((article) => {
    const element = document.createElement("news-article");
    element.setArticle(article);
    main.appendChild(element);
  });
}

fetchNews();
