function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInput.value;
}

let searchFormDocument = document.querySelector("#search-form");
searchFormDocument.addEventListener("submit", handleSearchSubmit);
