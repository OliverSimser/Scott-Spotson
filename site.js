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

const lightbox = document.querySelector(".lightbox");

if (lightbox && typeof lightbox.showModal === "function") {
  document.documentElement.classList.add("js-gallery");
  const image = lightbox.querySelector("img");
  const caption = lightbox.querySelector("figcaption");
  const steps = lightbox.querySelectorAll(".lightbox-step");
  let slides = [];
  let index = 0;

  function show(next) {
    index = (next + slides.length) % slides.length;
    image.src = slides[index].href;
    image.alt = slides[index].alt;
    caption.textContent = `${index + 1} / ${slides.length}`;
  }

  for (const opener of document.querySelectorAll(".gallery-open")) {
    opener.addEventListener("click", () => {
      slides = [...document.getElementById(opener.dataset.gallery).querySelectorAll("a")]
        .map((link) => ({ href: link.href, alt: link.querySelector("img").alt }));
      for (const step of steps) step.hidden = slides.length < 2;
      show(0);
      lightbox.showModal();
    });
  }

  for (const step of steps) {
    step.addEventListener("click", () => show(index + Number(step.dataset.step)));
  }
  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
  });
  lightbox.addEventListener("close", () => image.removeAttribute("src"));
}