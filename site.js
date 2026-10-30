"use strict";

const search = document.querySelector("#book-search");
const genre = document.querySelector("#genre");

if (search && genre) {
  const books = [...document.querySelectorAll(".book-tile")];
  const count = document.querySelector("#book-count");
  const empty = document.querySelector("#no-books");
  document.querySelector(".book-tools").hidden = false;

  function filterBooks() {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const book of books) {
      const matchesTitle = book.dataset.title.toLocaleLowerCase().includes(query);
      const matchesGenre = genre.value === "all" || book.dataset.genre === genre.value;
      book.hidden = !(matchesTitle && matchesGenre);
      if (!book.hidden) visible += 1;
    }
    count.textContent = `${visible} ${visible === 1 ? "book" : "books"}`;
    empty.hidden = visible !== 0;
  }

  search.addEventListener("input", filterBooks);
  genre.addEventListener("change", filterBooks);
}