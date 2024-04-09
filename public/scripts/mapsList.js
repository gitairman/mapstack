$(() => {
  $("#create-map-form").on("submit", handleCreateNewMap);
  listMaps();
});

const handleCreateNewMap = (e) => {
  e.preventDefault();
  const map_name = $(e.target).serializeArray()[0].value;
  console.log(map_name);

  $.post("/api/maps", { map_name })
    .done((result) => {
      const id = result.id;
      $(location).attr("href", `/maps/${id}`);
    })
    .fail((err) => console.log(err));
};

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
