$(() => {
  listMaps();
});

const listMaps = () => {
  return $.get(`/api/maps`).done(({ maps }) => {
    createMapsList(maps);
  });
};

const createMapsList = (maps) => {
  const $mapsList = $("#maps-list");
  $mapsList.empty();
  maps.forEach((map) => {
    $(
      `<li class="map" ><a id=${`map-${map.id}`} href=${`/maps/${map.id}`}>${
        map.name
      }</a></li>`
    )
      .appendTo($mapsList)
      .on("click", handleMapListClick);
  });
};

const handleMapListClick = (e) => {
  const map_id = Number(e.target.id);
  $.get(`/maps/${map_id}`).done().fail();
};
