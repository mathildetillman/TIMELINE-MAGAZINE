let currentStyle = "./styles/1500.css";
let currentIssue = "art";
let currentArticleIndex = 0;
let activeMentions = null;

const ART_ARTICLES = ["American_Icon.html", "Whistler.html", "Edo.html"];

const loadMetadataviewer = () => {
  $(".content").empty(); // Remove old metadata

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
      "<p> <a id=" +
        el.about +
        ' onclick="findMention(`' +
        el.about +
        '`)" >' +
        el.dataLabel +
        "</a>" +
        " (" +
        el.count +
        ") " +
        "</p>"
    );
    $("#person").append(newElement);

    // Add tooltip to each element that allows search in wikipedia
    tippy(`#${el.about}`, {
      interactive: true,
      content:
        "<a class='tooltip' href='https://en.wikipedia.org/wiki/" +
        el.dataLabel.split(" ").join("_") +
        "' target='blank'>Search in Wikipedia</a>",
      allowHTML: true,
    });
  }
};

$(document).ready(function () {
  $("#header").load("header.html");
  $("#currentArticle").load(ART_ARTICLES[currentArticleIndex], () => {
    loadMetadataviewer();
  });

  $("#footer").load("footer.html");
});

// 'Id' needs to be the same as 'about' in metadata
// Scrolls to the first instance of the mention in the text - only the first mention needs id
const findMention = (mention) => {
  // Turn off old highlight
  if (activeMentions) {
    activeMentions.css("background-color", "transparent");
  }

  // Highlight newly clicked mention
  activeMentions = $(`[about="${mention}"]`);
  activeMentions.css("background-color", "yellow");

  // Scroll to newly clicked mention
  $("#currentArticle").scrollTo(`#${mention}`, { duration: 1000 });
};

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
  $("#currentArticle").load(ART_ARTICLES[currentArticleIndex], () => {
    loadMetadataviewer();
  });
  changeStyle(currentStyle);
};
