// Creating a Header Template using Javascript Web Components
// https://developer.mozilla.org/en-US/docs/Web/API/Web_components
// Defining a custom HTML tag with the use of a Javascript class,
// inside of which the header content is built.
class headerTemplate extends HTMLElement {
	constructor() {
		super();

		this.innerHTML = `
			<div class="column is-full top-bar">
				<div id="language-switcher">
					<div class="switcher">
						<ul class="switcher-dropdown" lang-switcher></ul>
					</div>
				</div>

			</div>

			<div class="column content">
				<a href="/" id="logo" class="logo">
					<img src="assets/img/Logo-en.png" alt="" data-lang-key="logoAlt" data-logo>
				</a>

				<nav class="navbar" role="navigation" aria-label="main navigation">
					<ul>
						<li><a href="theoldmanandthelighthouse/" class="menu-item" data-lang-key="nav-home">home</a></li>
						<li><a href="theoldmanandthelighthouse/pages/story.html" class="menu-item" data-lang-key="nav-story">the story</a></li>
						<li><a href="theoldmanandthelighthouse/pages/backstage.html" class="menu-item" data-lang-key="nav-backstage">backstage</a></li>
					</ul>
				</nav>
			</div>
		`
	}
}

customElements.define('header-template', headerTemplate);

// Creating a Footer Template using Javascript Web Components
// The method is the same as the Header Template
class footerTemplate extends HTMLElement {
	constructor() {
		super();

		this.innerHTML = `
			<div class="copyright"><span id="current-year"></span> © <a href="https://clio.studio" target="_blank">Clio P.</a> | All rights reserved.</div>
		`
	}
}

customElements.define('footer-template', footerTemplate);


// Add "active" class when menu item matches current page.
document.querySelectorAll('.menu-item').forEach((aciveItem) => {
  if (aciveItem.href === window.location.href) {
    aciveItem.classList.add('active');
    aciveItem.setAttribute('aria-current', 'page');
  }
});


// Script to dynamically get the current year.
const date = new Date();
let currentYear = date.getFullYear();
document.getElementById("current-year").innerHTML = currentYear;
