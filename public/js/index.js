(0, function (w, d, n) {
  // INIT
  var header;
  var locationInput;
  var searchForm;
  var searchResults;
  var searchSubmit;
  var searchSubmitIcon;
  var searchSubmitLoading;
  var useLocationButton;
  var useLocationIcon;
  var useLocationLoading;

  function loadElements() {
    header = d.getElementById("header");
    locationInput = d.getElementById("locationInput");
    searchForm = d.getElementById("searchForm");
    searchResults = d.getElementById("searchResults");
    searchSubmit = d.getElementById("searchSubmit");
    searchSubmitIcon = d.getElementById("searchSubmitIcon");
    searchSubmitLoading = d.getElementById("searchSubmitLoading");
    useLocationButton = d.getElementById("useLocationButton");
    useLocationIcon = d.getElementById("useLocationIcon");
    useLocationLoading = d.getElementById("useLocationLoading");
  }

  function initSearchForm() {
    searchForm.addEventListener("submit", searchEvent);
    searchSubmit.onclick = search;
  }

  function initUseLocationButton() {
    useLocationButton.onclick = useLocation;
  }

  function init() {
    loadElements();
    initSearchForm();
    initUseLocationButton();
  }

  d.addEventListener("DOMContentLoaded", init);
  // end INIT
  // DOM manipulation
  function createElement(type, attrs, innerText) {
    var e = d.createElement(type);
    for (const [k, v] of Object.entries(attrs || {})) {
      e.setAttribute(k, v);
    }
    if (innerText) {
      e.innerText = innerText;
    }
    return e;
  }

  function clearChildren(element) {
    element.innerHTML = "";
  }

  function appendElements() {
    var [element, ...appendElements] = [...arguments];
    appendElements.forEach((e) => element.appendChild(e));
  }

  function removeElement(id) {
    var e = d.getElementById(id);
    if (e) {
      e.remove();
    }
  }

  function updateElems(elements, field, value) {
    elements.forEach((e) => (e[field] = value));
  }

  function disable() {
    updateElems([...arguments], "disabled", true);
  }

  function enable() {
    updateElems([...arguments], "disabled", false);
  }

  function hide() {
    [...arguments].forEach((e) => e.classList.add("d-none"));
  }

  function show() {
    [...arguments].forEach((e) => e.classList.remove("d-none"));
  }

  function createLocationDisplay(loc) {
    var mainDiv = createElement("div", { class: "card mb-2" });
    var cardBody = createElement("div", { class: "card-body" });
    var cardTitle = createElement("a", {
      class: "link-dark",
      href: loc.website,
      target: "_blank",
    });
    var cardSubtitle = createElement("h6", {
      class: "card-subtitle mb-1 text-muted",
    }, `${loc.distance.text} (${loc.duration.text})`);
    var address = createElement("p", { class: "card-text mb-1" }, loc.address);
    var callCta = createElement("a", {
      class: "link-dark",
      href: `tel:${loc.phone.replace(/\s/g, "")}`,
    });
    appendElements(
      callCta,
      createElement("p", { class: "card-text mb-1" }, loc.phone),
    );
    var cta = createElement("a", {
      class: "btn btn-primary",
      target: "_blank",
      href: googleMapsDirectioniUrl(loc.origin_address, loc.google_address),
    }, "Reittiohjeet");
    appendElements(
      cardTitle,
      createElement("h5", { class: "card-title" }, loc.name),
    );
    appendElements(mainDiv, cardBody);
    appendElements(
      cardBody,
      cardTitle,
      cardSubtitle,
      address,
      callCta,
      cta,
    );
    return mainDiv;
  }

  function displayLocationList(locs) {
    appendElements(
      searchResults,
      ...locs.slice(0, 5).map(createLocationDisplay),
    );
  }
  // end DOM manipulation
  // Search functionality
  async function fetchResults(origin) {
    const res = await fetch(`api/d?o=${encodeURI(origin)}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    return res.json();
  }

  function getLocation() {
    return searchForm.elements["location"].value;
  }

  function searchEvent(e) {
    e.preventDefault();
    search();
  }

  function searchFromLocation(location) {
    locationInput.value =
      `${location.coords.latitude},${location.coords.longitude}`;
    search();
  }

  function search() {
    disable(searchSubmit, useLocationButton);
    clearChildren(searchResults);
    hide(searchSubmitIcon);
    show(searchSubmitLoading);

    fetchResults(getLocation())
      .then(displayLocationList)
      .catch(console.error)
      .finally(() => {
        hide(searchSubmitLoading);
        show(searchSubmitIcon);
        enable(searchSubmit, useLocationButton);
      });
  }

  function googleMapsDirectioniUrl(origin, destination) {
    return `https://www.google.com/maps/dir/?api=1&origin=${
      encodeURI(origin)
    }&destination=${encodeURI(destination)}`;
  }

  function useLocation() {
    disable(useLocationButton);
    hide(useLocationIcon);
    show(useLocationLoading);

    askLocation()
      .then(searchFromLocation)
      .catch((e) => {
        console.error(e);
        alert("Sijainnin määrittäminen epäonnistui");
      })
      .finally(() => {
        enable(useLocationButton);
        show(useLocationIcon);
        hide(useLocationLoading);
      });
  }

  function askLocation() {
    // TODO: Figure out why this doesn't always work on mobile
    // for realz I hate todo comments :D
    return new Promise((resolve, reject) => {
      if (n.geolocation) {
        n.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject("Sijainti ei tuettu");
      }
    });
  }
  // end Search functionality
})(window, document, navigator);