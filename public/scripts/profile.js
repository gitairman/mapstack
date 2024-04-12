$(() => {
  $("#create-map-form").on("submit", handleCreateNewMap);
  $("#create-map-form").on("input", handleFormInput);
  $("#profile-container").on("click", handleMapListClick);
  createProfile();
});

const createProfile = () => {
  $.get("/api/maps/profile")
    .done((data) => {
      console.log(data);
      renderAllMaps(data);
      renderFavourites(data.favourites);
      renderContributedTo(data.contributions);
      renderCreated(data.created);
    })
    .fail((err) => console.log(err));
};

const handleCreateNewMap = (e) => {
  e.preventDefault();
  const map_name = $(e.target).serializeArray()[0].value;
  const map_desc = $(e.target).serializeArray()[1].value;

  console.log(map_name);
  if (!map_name) {
    $("#new-map-name").trigger("focus");
    return $("#no-name-error").removeClass("hidden");
  }

  $.post("/api/maps", { map_name, map_desc })
    .done((result) => {
      const id = result.id;
      $(location).attr("href", `/maps/${id}`);
    })
    .fail((err) => console.log(err));
};

const handleFormInput = () => {
  $("#no-name-error").addClass("hidden");
};

const renderAllMaps = ({ allMaps, favourites }) => {
  const $mapsList = $("#maps-list");
  $mapsList.empty();
  allMaps.forEach((map) => {
    let isFavourite = false;
    if (favourites.some(({ id }) => id === map.id)) isFavourite = true;
    $(
      `<li class="map" >
      <a id=${`map-${map.id}`} href=${`/maps/${map.id}`}>${map.name}</a>
      ${
        isFavourite
          ? ""
          : `<button id=${`fav-btn-${map.id}`}>Favourite</button>`
      }
      </li>`
    ).appendTo($mapsList);
  });
};

const renderFavourites = (favourites) => {
  const $favsList = $("#favourites-list");
  $favsList.empty();
  favourites.forEach((map) => {
    $(
      `<li class="map" >
      <a id=${`fav-${map.id}`} href=${`/maps/${map.id}`}>${map.name}</a>
      <button id=${`unfav-btn-${map.id}`}>UnFavourite</button>
      </li>`
    ).appendTo($favsList);
  });
};

const renderContributedTo = (contributions) => {
  const $contributedToList = $("#contributed-list");
  $contributedToList.empty();
  contributions.forEach((map) => {
    $(
      `<li class="map" >
      <a id=${`contributed-${map.id}`} href=${`/maps/${map.id}`}>${map.name}</a>
      </li>`
    ).appendTo($contributedToList);
  });
};

const renderCreated = (created) => {
  const $createdList = $("#created-list");
  $createdList.empty();
  created.forEach((map) => {
    $(
      `<li class="map" >
      <a id=${`contributed-${map.id}`} href=${`/maps/${map.id}`}>${map.name}</a>
      <button id=${`del-btn-${map.id}`}>DELETE</button>
      </li>`
    ).appendTo($createdList);
  });
};

const handleMapListClick = (e) => {
  if (e.target.id.includes("fav-btn")) return handleFavouriteToggle(e.target);
  if (e.target.id.includes("del-btn"))
    return handleDeleteMap(e.target.id.split("-")[2]);
};

const handleFavouriteToggle = (btn) => {
  let method;
  const [todo, , map_id] = btn.id.split("-");
  if (todo === "unfav") method = "DELETE";
  else method = "POST";

  $.ajax("api/maps/favourite", {
    method,
    data: { map_id },
  })
    .done(() => createProfile())
    .fail((err) => console.log(err));
};

const handleDeleteMap = (map_id) => {
  $.ajax(`/api/maps/${map_id}`, {
    method: "DELETE",
  })
    .done((result) => {
      console.log(result);

      createProfile();
    })
    .fail((err) => console.log(err));
};
