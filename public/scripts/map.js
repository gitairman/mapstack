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

  map = L.map("map").setView(coords, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.Control.geocoder().addTo(map);

  // Handling clicks on map
  map.on("click", handleMapClick);
};

const renderPointMarker = (point) => {
  let popupContent = `${point.image_url}<span>${point.description}</span>`;

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
  console.log("submit form");

  console.log(e);
};

const handlePointFormReset = (e) => {
  e.preventDefault();
  console.log("reset form");
  $("#point-form").addClass("hidden");
  console.log(e);
};

$(() => {
  getPosition();
  listMaps();
  $("#point-form").on("submit", handlePointFormSubmit);
  $("#point-form").on("reset", handlePointFormReset);
});
