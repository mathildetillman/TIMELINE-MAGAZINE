let currentStyle = "./styles/1500.css";
let currentIssue = "art";
let currentArticleIndex = 0;

const ART_ARTICLES = ["American_Icon.html", "Whistler.html", "Edo.html"];

$(document).ready(function () {
  $("#header").load("header.html");
  $("#currentArticle").load(ART_ARTICLES[currentArticleIndex], () => {
    // METADATAVIEWER //
    let persons = document.getElementsByClassName("mention person");
    let metadata = [];

    for (let person of persons) {
      let personElement = {
        about: person.getAttribute("about"),
        dataLabel: person.getAttribute("data-label"),
        count: 1,
      };

      // Check if person already in list
      let index = metadata.findIndex(
        (object) => object.dataLabel === personElement.dataLabel
      );

      if (index !== -1) {
        metadata[index].count++;
      } else {
        metadata.push(personElement);
      }
    }

    // Add elements to metadataviewer
    for (let i = 0; i < metadata.length; i++) {
      let el = metadata[i];
      let newElement = $(
        "<p>" + el.dataLabel + " (" + el.count + ") " + "</p>"
      );
      $("#person").append(newElement);
    }
  });

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
