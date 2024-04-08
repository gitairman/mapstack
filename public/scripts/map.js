let map;
let loggedIn = true;

const getPosition = () => {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(loadMap, function () {
      alert("Could not get your position");
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
    .css("top", e.layerPoint.y)
    .css("left", e.layerPoint.x)
    .removeClass("hidden");

  $("#point-title").trigger("focus");
};

const loadMap = (position) => {
  const { latitude } = position.coords;
  const { longitude } = position.coords;

  const coords = [latitude, longitude];
  console.log(coords);

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
  <img class='point-image' src=${point.image_url} /><p class='point-description' >${point.description}</p>
  </div>
  `;

  const marker = L.marker(Object.values(point.coords), { title: point.title });
  marker.addTo(map).bindPopup(
    L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: `point-popup`,
    })
  );

  if (loggedIn) {
    popupContent += `<button onclick="removeMarker(${marker._leaflet_id}, ${point.id})">Remove Point</button>`;
  }

  marker.setPopupContent(popupContent);
  marker
    .bindTooltip(point.title, {
      offset: [-16, -15],
      direction: "top",
    })
    .openTooltip();
};

const removeMarker = (marker, point) => {
  console.log(marker, point);

  map.eachLayer((layer) => {
    if (layer._leaflet_id === marker) map.removeLayer(layer);
  });
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
      const group = new L.featureGroup(Object.values(map._layers).slice(1));
      map.fitBounds(group.getBounds());
    })
    .fail((err) => console.log(err));

  $("#map").data({ map_id });
};

const listMaps = () => {
  $.get(`/api/maps`).done(({ maps }) => {
    createMapsList(maps);
  });
};

const createMapsList = (maps) => {
  console.log(maps);

  const $mapsList = $("#maps-list");
  $mapsList.empty();
  maps.forEach((map) => {
    $(`<li class="map" id=${map.id}>`)
      .text(map.name)
      .appendTo($mapsList)
      .on("click", handleMapListClick);
  });
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
  }

  $.post("/api/points", point).done().fail();
};

const handlePointFormReset = (e) => {
  const $pointForm = $(e.currentTarget);
  console.log("reset form");
  $pointForm.addClass("hidden");
};

const handlePointFormLosingFocus = (e) => {
  const $pointForm = $(e.currentTarget);

  setTimeout(() => {
    if ($pointForm.find(":focus").length === 0) {
      // Focus has moved outside the parent element
      $pointForm.addClass("hidden");
    } else {
      // Focus has moved to another element within the parent element
    }
  }, 50);
};

const handleMapLoaded = () => {
  listMaps();
};

const handlePointFormInput = (e) => {
  $("#no-title-error").addClass("hidden");
};

$(() => {
  // getPosition();
  loadMap({ coords: { latitude: 50.0760328, longitude: -123.0367918 } });
  $("#point-form").on("submit", handlePointFormSubmit);
  $("#point-form").on("reset", handlePointFormReset);
  $("#point-form").on("focusout", handlePointFormLosingFocus);
  $("#point-form").on("input", handlePointFormInput);
});
