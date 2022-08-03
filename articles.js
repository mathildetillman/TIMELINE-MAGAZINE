let currentStyle = "./styles/1500.css";
let currentIssue = "art";
let currentArticleIndex = 0;
let activeMentions = null;

const ART_ARTICLES = ["American_Icon.html", "Whistler.html", "Edo.html"];
const METADATA = ["person", "place", "event", "content"];

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

  $(`#info-box`).append(`<p> <b>Title: </b> ${title}</p>`);
  $(`#info-box`).append(`<p> <b>Author: </b> ${author}</p>`);
  $(`#info-box`).append(`<p> <b>Publishing date: </b> ${published}</p>`);
  $(`#info-box`).append(`<p> <b>Subject: </b> ${subject}</p>`);

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
  $("#currentArticle").load(ART_ARTICLES[currentArticleIndex], () => {
    loadMetadataviewer();
  });
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
const changeStyle = (sheet) => {
  currentStyle = sheet;
  $("#articlestyle").attr("href", sheet);
};

//* Pagination for articles
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
