import HugoFlexSearch from "hugo-flexsearch";
import * as bs from "bootstrap";

export const search = new HugoFlexSearch({
  indexUrl: "/index.json",
  indexedFields: [
    "title",
    "description",
    "tags",
    "categories",
    "content",
    "url",
  ],
  limit: 10,
  suggestions: true,
  searchLogic: "or",
  resultTemplate: (post) => {
    let result = `<div class="mb-4 w-full p-3"><a href="${post.url}">`;
    if (post.title) {
      result += `<h4>${post.title}</h4>`;
    }
    if (post.description) {
      result += `<p class="text-base">${post.description}</p>`;
    }
    result += `</a></div><hr class="mb-4 block w-full" />`;
    return result;
  },
  emptyTemplate: () => {
    let result = `<div class="p-3"><p>No results found.</p></div>`;
    return result;
  },
});

const searchForm = document.getElementById("doks-search");
const suggestionsEl = document.getElementById("suggestions");
const searchSuggestions = bs.Collapse.getOrCreateInstance(suggestionsEl);

function checkFocus(ev) {
  if (searchForm.contains(ev.relatedTarget)) {
    return; // Special case for tab key
  }

  if (searchForm.contains(document.activeElement)) {
    searchSuggestions.show();
  } else {
    searchSuggestions.hide();
  }
}

window.addEventListener("blur", checkFocus, true);
window.addEventListener("focus", checkFocus, true);

searchForm.addEventListener("keydown", (ev) => {
  if (["Esc", "Escape"].includes(ev.key)) {
    searchSuggestions.hide();
  }
});
