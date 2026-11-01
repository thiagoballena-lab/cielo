const pages = [...document.querySelectorAll(".book-page")];
const previousButton = document.querySelector("#previousPage");
const nextButton = document.querySelector("#nextPage");
const pageCounter = document.querySelector("#pageCounter");
const progressBar = document.querySelector("#progressBar");
let currentPage = 0;

function showPage(nextIndex) {
  const boundedIndex = Math.max(0, Math.min(nextIndex, pages.length - 1));
  if (boundedIndex === currentPage) return;

  pages[currentPage].hidden = true;
  pages[currentPage].classList.remove("is-active");
  currentPage = boundedIndex;
  const activePage = pages[currentPage];
  activePage.hidden = false;
  activePage.classList.remove("is-active");
  // Reinicia la animación de entrada al volver a una página visitada.
  void activePage.offsetWidth;
  activePage.classList.add("is-active");

  previousButton.disabled = currentPage === 0;
  nextButton.disabled = currentPage === pages.length - 1;
  pageCounter.innerHTML = `${currentPage === 0 ? "Portada" : currentPage === pages.length - 1 ? "Final" : `Página ${currentPage}`} <span>·</span> ${currentPage + 1} de ${pages.length}`;
  progressBar.style.width = `${((currentPage + 1) / pages.length) * 100}%`;
  activePage.scrollTop = 0;
}

previousButton.addEventListener("click", () => showPage(currentPage - 1));
nextButton.addEventListener("click", () => showPage(currentPage + 1));

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "ArrowLeft") showPage(currentPage - 1);
  if (event.key === "ArrowRight") showPage(currentPage + 1);
});

let touchStartX = 0;
document.querySelector("#book").addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
document.querySelector("#book").addEventListener("touchend", (event) => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) > 65) showPage(currentPage + (distance < 0 ? 1 : -1));
}, { passive: true });

previousButton.disabled = true;
progressBar.style.width = `${100 / pages.length}%`;