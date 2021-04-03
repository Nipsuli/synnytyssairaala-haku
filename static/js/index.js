(0, function (w, d, n) {
  // begin
  var controls;
  var searchForm;
  var useLocationButton;
  var searchSubmit;
  var locationInput;
  // INIT
  function initSearchForm() {
    searchForm = d.getElementById("searchForm");
    searchForm.addEventListener("submit", searchEvent);
  }

  function initUseLocationButton() {
    useLocationButton = d.getElementById("useLocationButton");
    useLocationButton.onclick = useLocation;
    if (n.geolocation) {
      useLocationButton.hidden = false;
    }
  }

  function init() {
    controls = d.getElementById("controls");
    searchSubmit = d.getElementById("searchSubmit");
    locationInput = d.getElementById("locationInput");
    initSearchForm();
    initUseLocationButton();
  }

  d.addEventListener("DOMContentLoaded", init);
  // end INIT
  // DOM manipulation
  function insertAfter(elem, insertElem) {
    elem.insertAdjacentElement("afterend", insertElem);
  }

  function removeElement(id) {
    var elem = d.getElementById(id);
    if (elem) {
      elem.remove();
    }
  }

  function updateElems(elems, field, value) {
    elems.forEach((e) => (e[field] = value));
  }

  function disable() {
    updateElems([...arguments], "disabled", true);
  }

  function enable() {
    updateElems([...arguments], "disabled", false);
  }

  function hid() {
    updateElems([...arguments], "hidden", true);
  }
  // end DOM manipulation
  // Helpers
  function googleMapsDirectioniUrl(origin, destination) {
    return `https://www.google.com/maps/dir/?api=1&origin=${
      encodeURI(origin)
    }&destination=${encodeURI(destination)}`;
  }

  function useLocation() {
    disable(useLocationButton);
    insertAfter(
      useLocationButton,
      createLoadingElem("locationLoading", "Ladataan sijaintia..."),
    );
    askLocation()
      .then(searchFromLocation)
      .catch((e) => {
        console.error(e);
        alert("Sijainnin määrittäminen epäonnistui");
      })
      .finally(() => {
        removeElement("locationLoading");
        enable(useLocationButton);
      });
  }

  function askLocation() {
    return new Promise((resolve, reject) => {
      if (n.geolocation) {
        n.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject("Sijainti ei tuettu");
      }
    });
  }
  // end Helpers
  // Elements
  function createElement(type, innerText, attrs) {
    var e = d.createElement(type);
    if (innerText) {
      e.innerHTML = innerText;
    }
    for (const [k, v] of Object.entries(attrs || {})) {
      e.setAttribute(k, v);
    }
    return e;
  }

  function createLoadingElem(id, inner) {
    return createElement("p", inner, { id });
  }

  function createLocationDisplay(loc) {
    var e = createElement("div", "", { id: loc.name });
    var p = createElement("p");
    var titleLink = createElement("a", "", {
      href: loc.website,
      target: "_blank",
    });
    titleLink.appendChild(createElement("strong", loc.name));
    p.appendChild(titleLink);
    p.appendChild(createElement("br"));
    p.appendChild(
      createElement("a", loc.phone, {
        href: `tel:${loc.phone.replace(/\s/g, "")}`,
      }),
    );
    p.appendChild(createElement("br"));
    p.appendChild(
      createElement("a", loc.google_address, {
        href: googleMapsDirectioniUrl(loc.origin_address, loc.google_address),
        target: "_blank",
      }),
    );
    p.appendChild(createElement("br"));
    p.appendChild(d.createTextNode(loc.distance.text));
    p.appendChild(createElement("br"));
    p.appendChild(d.createTextNode(loc.duration.text));
    e.appendChild(p);
    return e;
  }

  function crateLocationList(locs) {
    var e = d.createElement("p");
    e.setAttribute("id", "locationList");
    locs.slice(0, 5).forEach((l) => {
      e.appendChild(createLocationDisplay(l));
    });
    return e;
  }
  // end Elements
  // Search functionality
  async function fetchResults(origin) {
    const res = await fetch(`api/d?o=${encodeURI(origin)}`);
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
    removeElement("locationList");
    insertAfter(controls, createLoadingElem("searchLoading"));
    fetchResults(getLocation())
      .then((r) => insertAfter(controls, crateLocationList(r)))
      .finally(() => {
        removeElement("searchLoading");
        enable(searchSubmit, useLocationButton);
      });
  }
  // end Search functionality
  // end
})(window, document, navigator);
