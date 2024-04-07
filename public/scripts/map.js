let map;

const getPosition = () => {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(loadMap, function () {
      alert("Could not get your position");
    });
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
  map.on("click", () => {
    console.log("you clicked on the map");
  });
};

const renderPointMarker = (point) => {
  const marker = L.marker(Object.values(point.coords), { title: point.title });
  marker.addTo(map).bindPopup(
    L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: `point-popup`,
    })
  ).setPopupContent(`
    ${point.image_url}<span>${point.description}</span>
    <button onclick="removeMarker(${marker._leaflet_id})">Remove Point</button>`);
  // .openPopup();
};

const removeMarker = (marker) => {
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
      .on("click", handleMapClick);
  });
};

const handleMapClick = (e) => {
  console.log(e.target.id);
  addPoints(e.target.id);
};

$(() => {
  getPosition();
  listMaps();
});
