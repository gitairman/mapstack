let map;
let loggedIn = true;

const getPosition = () => {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(loadMap, function () {
      alert("Could not get your position, defaulting to Whistler, BC");
      loadMap({ coords: { latitude: 50.0760328, longitude: -123.0367918 } });
    });
};

const handleMapClick = (e) => {
  if (!loggedIn) return;

  console.log(e);
  console.log($("#map").data("map_id"));

  console.log("you clicked on the map");
  // const $markerPane = $(".leaflet-marker-pane");
  const $pointForm = $("#point-form");
  $pointForm[0].reset();
  $pointForm.data("coords", e.latlng);
  $pointForm
    .css("top", e.containerPoint.y)
    .css("left", e.containerPoint.x)
    .removeClass("hidden");

  $("#point-title").trigger("focus");
};

const loadMap = (position) => {
  const { latitude } = position.coords;
  const { longitude } = position.coords;

  const coords = [latitude, longitude];

  map = L.map("map").setView(coords, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.Control.geocoder().addTo(map);

  // Handling clicks on map
  map.on("click", handleMapClick);
  map.whenReady(handleMapLoaded);
};

const renderPointMarker = (point) => {
  let popupContent = `
  <div class='point-details'>
  <h4 class='point-title'>${point.title}</h4>
  ${
    point.image_url ? `<img class='point-image' src=${point.image_url} />` : ""
  }<p class='point-description' >${point.description}</p>
  </div>
  `;

  const marker = L.marker(Object.values(point.coords), { title: point.title });
  marker.addTo(map).bindPopup(
    L.popup({
      maxWidth: 250,
      minWidth: 100,
      // autoClose: false,
      // closeOnClick: false,
      className: `point-popup`,
    })
  );

  if (loggedIn) {
    popupContent += `
    <button id=${`delete-${point.id}`} >Remove Point</button>
    <button id=${`edit-${point.id}`} >Edit Point</button>
    `;
  }

  marker.setPopupContent(
    `<div id=${`popup-point-${point.id}`}>${popupContent}</div>`
  );
  marker
    .bindTooltip(point.title, {
      offset: [-16, -15],
      direction: "top",
    })
    .openTooltip();
};

const handlePopupClick = (e) => {
  console.log(e.target);
  const [action, point_id] = e.target.id.split("-");
  if (action === "delete") return removeMarker(Number(point_id));
  if (action === "edit")
    return editMarker($(e.target).siblings(".point-details").children());
};

const removeMarker = (point_id) => {
  // console.log(point_id);

  $.ajax(`/api/points/${point_id}`, {
    method: "DELETE",
  })
    .done((result) => {
      console.log(result);
      addPoints($("#map").data("map_id"));
    })
    .fail((err) => console.log(err));
};

const editMarker = ($pointDetails) => {
  console.log($pointDetails);
  const { 0: titleEl, 1: imgEl, 2: descriptionEl } = $pointDetails;
  const title = titleEl.innerText;
  const image_url = imgEl.src;
  const description = descriptionEl.innerText;

  const $editForm = $("#edit-form");
  console.log($editForm);

  $editForm[0][0].value = title;
  $editForm[0][1].value = description;
  $editForm[0][2].value = image_url;
  const $popupBox = $pointDetails.closest(".leaflet-popup-content");
  console.log($editForm);

  $editForm.prependTo($popupBox);
  $editForm.removeClass("hidden");
  $editForm.siblings().addClass("hidden");

  // $editForm[0].reset();
  // $editForm
  //   .css("top", e.containerPoint.y)
  //   .css("left", e.containerPoint.x)
  //   .removeClass("hidden");

  // $("#point-title").trigger("focus");
};

const clearMap = () => {
  map.eachLayer((layer) => {
    if (layer._leaflet_id !== 25) map.removeLayer(layer);
  });
};

const addPoints = (map_id) => {
  clearMap();

  $.get(`/api/points/${map_id}`)
    .done(({ points }) => {
      points.forEach((point) => {
        renderPointMarker(point);
      });
      if (points.length === 0) return;

      const group = new L.featureGroup(Object.values(map._layers).slice(1));
      map.fitBounds(group.getBounds());
      $(".leaflet-popup-pane").on("click", handlePopupClick);
    })
    .fail((err) => console.log(err));

  // $("#map").data({ map_id });
};

const handleMapListClick = (e) => {
  console.log(e.target.id);
  addPoints(e.target.id);
};

const handlePointFormSubmit = (e) => {
  e.preventDefault();
  const $pointForm = $("#point-form");
  const newPointCoords = $pointForm.data("coords");
  const pointDetails = $pointForm.serializeArray();
  const point = pointDetails.reduce((a, { name, value }) => {
    a[name] = value;
    return a;
  }, {});
  point.coords = [newPointCoords.lat, newPointCoords.lng];
  point.map_id = $("#map").data("map_id");
  point.added_by = 1; // user_id of logged in user to go here
  console.log(point);
  if (!point.title) {
    $("#no-title-error").removeClass("hidden");
    $("#point-title").trigger("focus");
    return;
  }

  $pointForm.addClass("hidden");

  $.post("/api/points", point)
    .done((result) => {
      console.log(result);
      addPoints($("#map").data("map_id"));
    })
    .fail((err) => console.log(err));
};

const handleEditFormSubmit = (e) => {
  e.preventDefault();
};

const handleFormReset = (e) => {
  const $pointForm = $(e.currentTarget);
  console.log("reset form");
  $pointForm.addClass("hidden");
  $pointForm.prependTo($("body"));
};

const handleFormLosingFocus = (e) => {
  const $pointForm = $(e.currentTarget);

  setTimeout(() => {
    if ($pointForm.find(":focus").length === 0) {
      // Focus has moved outside the parent element
      $pointForm.addClass("hidden");
      $pointForm.prependTo($("body"));
    } else {
      // Focus has moved to another element within the parent element
    }
  }, 50);
};

const handleMapLoaded = () => {
  console.log("map has been loaded");
  const map_id = $("#map").data("map_id");
  console.log(map_id);

  addPoints(map_id);
};

const handleFormInput = (e) => {
  const $pointForm = $(e.currentTarget);
  const $errorEl = $pointForm.find("#no-title-error");
  $errorEl.addClass("hidden");
};

const initializeElements = () => {
  const $newPointForm = $("#point-form");
  $newPointForm.on("submit", handlePointFormSubmit);
  $newPointForm.on("reset", handleFormReset);
  $newPointForm.on("focusout", handleFormLosingFocus);
  $newPointForm.on("input", handleFormInput);

  const $editPointForm = $("#edit-form");
  $editPointForm.on("submit", handleEditFormSubmit);
  $editPointForm.on("reset", handleFormReset);
  $editPointForm.on("focusout", handleFormLosingFocus);
  $editPointForm.on("input", handleFormInput);
};

$(() => {
  loadMap({ coords: { latitude: 50.0760328, longitude: -123.0367918 } });
  initializeElements();
});
