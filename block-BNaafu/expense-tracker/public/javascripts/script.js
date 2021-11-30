
/* This code is not working */
console.log(document.URL);
const currentLinks = document.querySelectorAll('.navigation a[href="' + document.URL.slice(21) +'"]');
currentLinks.forEach((activeLink) => {
    activeLink.classList.add('current-link');
});

console.log(currentLinks);
