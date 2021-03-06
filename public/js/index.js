(0, function (w, d, n) {
  // INIT
  // elements
  var header;
  var locationInput;
  var searchForm;
  var searchMap;
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
    searchMap = d.getElementById("searchMap");
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
    searchSubmit.onclick = searchAndDisplay;
  }

  function initUseLocationButton() {
    useLocationButton.onclick = useLocation;
  }

  function initElements() {
    loadElements();
    initSearchForm();
    initUseLocationButton();
  }

  d.addEventListener("DOMContentLoaded", initElements);
  // other
  var backendReadyPromise = checkBackend();
  var ipLocationPromise = loadIpLocation();

  function checkBackend() {
    return fetch("/api/wake").then((r) => {
      if (!r.ok) {
        throw new Error(`Backend is not fine: ${r.statusText}`);
      } else {
        return r.json();
      }
    }).catch(console.error);
  }

  function loadIpLocation() {
    return fetch("/e/loc").then((r) => {
      if (!r.ok) {
        throw new Error("Could not get ip location");
      } else {
        return r.json();
      }
    }).then((j) => {
      if (j.country_code === "FI") {
        return {
          longitude: j.longitude,
          latitude: j.latitude,
        };
      } else {
        throw new Error("IP addess not in Finland");
      }
    }).catch(console.error);
  }
  // end INIT
  // DOM manipulation
  // generic
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

  // specific
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

  function displayLocations(locs) {
    const topLocations = locs.slice(0, 5);
    const mapUrl = mapsImageUrl(
      getLocation(),
      topLocations.map((l) => l.google_address),
    );
    appendElements(
      searchMap,
      createElement("img", { src: mapUrl, class: "img-fluid" }),
    );

    appendElements(
      searchResults,
      ...topLocations.map(createLocationDisplay),
    );
  }

  function clearSearchResults() {
    clearChildren(searchResults);
    clearChildren(searchMap);
  }
  // end DOM manipulation
  // State managment
  // Location state lives in the form field
  function getLocation() {
    return locationInput.value;
  }

  function updateLocation(location) {
    locationInput.value = location;
  }
  // END state managemetn
  // Utils
  function cleanAddress(str) {
    // don't ask, or do, but then I need few beers
    return str.replace(/[\u2800]*/, "");
  }
  function googleMapsDirectioniUrl(origin, destination) {
    return `https://www.google.com/maps/dir/?api=1&origin=${
      encodeURI(cleanAddress(origin))
    }&destination=${encodeURI(cleanAddress(destination))}`;
  }

  function mapsImageUrl(origin, destinations, size) {
    const params = new URLSearchParams();
    params.append("size", size || "800x400");
    params.append("markers", `color:blue|${origin}`);
    destinations.forEach((d, i) =>
      params.append("markers", `label:${i + 1}|${d}`)
    );
    return `/e/map?${params.toString()}`;
  }

  async function getApproxLocation() {
    try {
      const locFromBrowser = await askLocation();
      return {
        latitude: locFromBrowser.coords.latitude,
        longitude: locFromBrowser.coords.longitude,
      };
    } catch (e) {
      console.error(
        "Failed to get location from browser, falling back to ip based location",
        e,
      );
    }

    return await ipLocationPromise;
  }

  function askLocation() {
    // TODO: Figure out why this doesn't always work on mobile
    // for realz I hate todo comments :D
    return new Promise((resolve, reject) => {
      if (n.geolocation) {
        n.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject("Could not get location");
      }
    });
  }

  function fillUserLocation() {
    disable(useLocationButton);
    hide(useLocationIcon);
    show(useLocationLoading);

    return getApproxLocation()
      .then((l) => updateLocation(`${l.latitude},${l.longitude}`))
      .catch((e) => {
        console.error(e);
        alert("Sijainnin m????ritt??minen ep??onnistui");
      })
      .finally(() => {
        enable(useLocationButton);
        show(useLocationIcon);
        hide(useLocationLoading);
      });
  }
  // END Utils
  // Search functionality
  async function findNearest(origin) {
    const res = await fetch(`api/d?o=${encodeURI(origin)}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    return await res.json();
  }

  function searchEvent(e) {
    e.preventDefault();
    searchAndDisplay();
  }

  function useLocation() {
    fillUserLocation().then(searchAndDisplay);
  }

  function searchAndDisplay() {
    clearSearchResults();
    disable(searchSubmit, useLocationButton);
    hide(searchSubmitIcon);
    show(searchSubmitLoading);

    findNearest(getLocation())
      .then(displayLocations)
      .catch(console.error)
      .finally(() => {
        hide(searchSubmitLoading);
        show(searchSubmitIcon);
        enable(searchSubmit, useLocationButton);
      });
  }
  // end Search functionality
})(window, document, navigator);
