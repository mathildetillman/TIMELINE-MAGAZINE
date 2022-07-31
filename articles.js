let currentStyle = "./styles/1500.css";
let currentIssue = "art";
let currentArticleIndex = 0;

const ART_ARTICLES = ["American_Icon.html", "Whistler.html", "Edo.html"];

$(document).ready(function () {
  $("#header").load("header.html");
  $("#currentArticle").load(ART_ARTICLES[currentArticleIndex]);
  $("#footer").load("footer.html");
});

const changeStyle = (sheet) => {
  currentStyle = sheet;
  $("#articlestyle").attr("href", sheet);
};

const changeArticle = (change) => {
  currentArticleIndex = currentArticleIndex + change;
  if (currentArticleIndex < 0) {
    currentArticleIndex = ART_ARTICLES.length - 1;
  } else {
    currentArticleIndex = currentArticleIndex % ART_ARTICLES.length;
  }
  console.log(currentArticleIndex);
  $("#currentArticle").load(ART_ARTICLES[currentArticleIndex]);
  changeStyle(currentStyle);
};
