document.addEventListener("scroll", function () {
    const button = document.getElementById("floating-button");
    const aulas = document.getElementById("last-button");
    const oferta = document.getElementById("checkout-link");

    if (!aulas || !oferta) return;

    const aulasTop = aulas.getBoundingClientRect().top + window.scrollY;
    const ofertaTop = oferta.getBoundingClientRect().top + window.scrollY;
    const scrollY = window.scrollY;
    const viewportBottom = window.innerHeight + scrollY;

    if (scrollY >= aulasTop && viewportBottom < ofertaTop) {
        button.classList.add("show");
        button.classList.remove("hide");
    } else {
        button.classList.add("hide");
        button.classList.remove("show");
    }
});
