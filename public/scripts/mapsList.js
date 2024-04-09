$(() => {
  $("#create-map-form").on("submit", handleCreateNewMap);
  listMaps();
});

const handleCreateNewMap = (e) => {
  e.preventDefault();
  const map_name = $(e.target).serializeArray()[0].value;
  console.log(map_name);

  $.post("/api/maps", { map_name }).done().fail();
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
    $(
      `<li class="map" id=${map.id}><a href=${`/maps/${map.id}`}>${
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
