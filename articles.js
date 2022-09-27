const ART_ARTICLES = [
  "Cover_Art.html",
  "American_Icon.html",
  "Whistler.html",
  "Edo.html",
];
const MUSIC_ARTICLES = [
  "Cover_Music.html",
  "Kasabian.html",
  "Wet_leg.html",
  "Rex.html",
];

const METADATA = ["person", "place", "event", "concept"];

let currentIssue = "art";
let currentArticles = ART_ARTICLES;
let currentArticleIndex = 0;
let activeMentions = null;
let activeStyle = "2030";

// * Get metadata from articles and insert into metadataviewer
const loadMetadataviewer = () => {
  // Remove old metadata
  $("#info-box").empty();
  $(".content").empty();

  // Infobox
  const title = document.querySelector('meta[name="title"]').content;
  const author = document.querySelector('meta[name="author"]').content;
  const published = document.querySelector('meta[name="published"]').content;
  const subject = document.querySelector('meta[name="subject"]').content;
  const from = document.querySelector('meta[name="from"]').content;

  $(`#info-box`).append(`<p> <b>Title: </b> ${title}</p>`);
  $(`#info-box`).append(`<p> <b>Author: </b> ${author}</p>`);
  $(`#info-box`).append(`<p> <b>Publishing date: </b> ${published}</p>`);
  $(`#info-box`).append(`<p> <b>Subject: </b> ${subject}</p>`);
  $(`#info-box`).append(`<p> <b>From Article: </b> ${from}</p>`);

  // For all categories of metadata
  for (let i = 0; i < METADATA.length; i++) {
    const className = `mention ${METADATA[i]}`;
    let mentions = document.getElementsByClassName(className);
    let metadata = [];

    // Create list of mention objects for each metadata category
    for (let mention of mentions) {
      let element = {
        about: mention.getAttribute("about"),
        dataLabel: mention.getAttribute("data-label"),
        count: 1,
      };

      // Check if element already in list
      let index = metadata.findIndex(
        (object) => object.dataLabel === element.dataLabel
      );

      if (index !== -1) {
        metadata[index].count++;
      } else {
        metadata.push(element);
      }
    }

    // Add elements in list to the metadataviewer
    for (let j = 0; j < metadata.length; j++) {
      let el = metadata[j];
      let newElement = $(
        "<p> <a id=" +
          "button" +
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
      $(`#${METADATA[i]}`).append(newElement);

      // Add tooltip to each element that allows search in wikipedia
      tippy(`#button${el.about}`, {
        interactive: true,
        content:
          "<a class='tooltip' href='https://en.wikipedia.org/wiki/" +
          el.dataLabel.split(" ").join("_") +
          "' target='blank'>Search in Wikipedia</a>",
        allowHTML: true,
      });
    }
  }
};

// * Load all components
$(document).ready(function () {
  $("#header").load("header.html");
  // Display correct articles for each issue
  currentIssue = document.querySelector('meta[name="issue"]').content;
  switch (currentIssue) {
    case "art":
      currentArticles = ART_ARTICLES;
      break;
    case "music":
      currentArticles = MUSIC_ARTICLES;
      break;
    default:
      currentArticles = ART_ARTICLES;
  }

  $("#currentArticle").load(
    "articles/" + currentIssue + "/" + currentArticles[currentArticleIndex],
    () => {
      loadMetadataviewer();
    }
  );
  $("#footer").load("footer.html");
});

// * Scroll to the first instance of the mention in the text based on 'id'
// 'Id' needs to be the same as 'about' in markup, only the first mention needs 'id'
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

//* Set new article style
const changeStyle = (style) => {
  // Set new stylesheet
  const path = "./styles/" + style + ".css";
  $("#articlestyle").attr("href", path);

  // Toggle underline for active styles
  $(`#button-${activeStyle}`).toggleClass("active-style");
  $(`#button-${style}`).toggleClass("active-style");
  activeStyle = style;
};

//* Pagination for articles
const changeArticle = (change) => {
  currentArticleIndex = currentArticleIndex + change;
  currentIssue = document.querySelector('meta[name="issue"]').content;
  if (currentArticleIndex < 0) {
    currentArticleIndex = currentArticles.length - 1;
  } else {
    currentArticleIndex = currentArticleIndex % currentArticles.length;
  }
  $("#currentArticle").load(
    "articles/" + currentIssue + "/" + currentArticles[currentArticleIndex],
    () => {
      loadMetadataviewer();
    }
  );
  changeStyle(activeStyle);
};
