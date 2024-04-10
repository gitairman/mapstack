$(() => {
  $("#create-map-form").on("submit", handleCreateNewMap);
  $("#maps-list").on("click", handleMapListClick);
  createProfile();
});

const createProfile = () => {
  $.get("/api/maps/profile")
    .done((data) => {
      console.log(data);
      createMapsList(data);
    })
    .fail((err) => console.log(err));
};

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

const createMapsList = ({ allMaps, favourites, contributions, created }) => {
  const $mapsList = $("#maps-list");
  $mapsList.empty();
  allMaps.forEach((map) => {
    let isFavourite = false,
      isCreator = false;
    if (favourites.some(({ id }) => id === map.id)) isFavourite = true;
    if (created.some(({ id }) => id === map.id)) isCreator = true;
    $(
      `<li class="map" >
      <a id=${`map-${map.id}`} href=${`/maps/${map.id}`}>${map.name}</a>
      <button id=${`fav-btn-${map.id}`}>${
        isFavourite ? "UNFAVOURITE" : "FAVOURITE"
      }</button>
      ${isCreator ? `<button id=${`del-btn-${map.id}`}>DELETE</button>` : ""}
      </li>`
    ).appendTo($mapsList);
  });
};

const handleMapListClick = (e) => {
  if (e.target.id.includes("fav-btn")) return handleFavouriteToggle(e.target);
  if (e.target.id.includes("del-btn"))
    return handleDeleteMap(e.target.id.split("-")[2]);
};

const handleFavouriteToggle = (btn) => {
  let method;
  const map_id = btn.id.split("-")[2];
  const user_id = 1;
  if (btn.innerText === "UNFAVOURITE") method = "DELETE";
  else method = "POST";

  $.ajax("api/maps/favourite", {
    method,
    data: { map_id, user_id },
  })
    .done(() => createProfile())
    .fail();
};

const handleDeleteMap = (map_id) => {};
