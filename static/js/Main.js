const shrink_btn = document.querySelector(".shrink-btn");
const search = document.querySelector(".search");
const sidebar_links = document.querySelectorAll(".sidebar-links a");
const active_tab = document.querySelector(".active-tab");
const shortcuts = document.querySelector(".sidebar-links h4");
const tooltip_elements = document.querySelectorAll(".tooltip-element");
const sidebar_top = document.querySelectorAll(".sidebar-top a i");

let activeIndex;

let LocalStorage = window.localStorage;

let local_storage_sh_wi = LocalStorage.toggle;
document.body.classList.toggle(local_storage_sh_wi);
let local_storage_ic_sun_mon = LocalStorage.icon_sun_moon;
sidebar_top[0].classList.add(local_storage_ic_sun_mon);
let local_dark_bright = LocalStorage.dark_bright;
document.body.classList.add(local_dark_bright);

shrink_btn.addEventListener("click", () => {
  let c = document.body.classList.toggle("shrink");
  // console.log(c)
  // console.log(result)

  if (c == true) {
    document.body.classList.toggle("shrink", true);
    LocalStorage.toggle = "shrink";
  } else {
    document.body.classList.toggle("shrink", false);
    LocalStorage.toggle = "widen";
  }

  setTimeout(moveActiveTab, 400);

  shrink_btn.classList.add("hovered");

  setTimeout(() => {
    shrink_btn.classList.remove("hovered");
  }, 500);
});

search.addEventListener("click", () => {
  document.body.classList.remove("shrink");
  search.lastElementChild.focus();
});

function moveActiveTab() {
  let topPosition = activeIndex * 58 + 2.5;

  if (activeIndex > 3) {
    topPosition += shortcuts.clientHeight;
  }

  active_tab.style.top = `${topPosition}px`;
}

function changeTab() {
  sidebar_top.forEach((sideTab) => {
    // mengambil nilai class pada i
    // console.log(sidebar_top[0].classList.toString());

    if (sidebar_top[0].classList.toString() == "bx bx-moon") {
      sideTab.classList.remove("bx-moon");
      this.classList.add("bx-sun");
      document.body.classList.add("light-theme");
      LocalStorage.dark_bright = "light-theme";
      LocalStorage.icon_sun_moon = "bx-sun";
    } else if (sidebar_top[0].classList.toString() == "bx bx-sun") {
      sideTab.classList.remove("bx-sun");
      this.classList.add("bx-moon");
      document.body.classList.remove("light-theme");
      LocalStorage.dark_bright = "bright";
      LocalStorage.icon_sun_moon = "bx-moon";
    }
  });
}

sidebar_top.forEach((tab) => tab.addEventListener("click", changeTab));

function changeLink() {
  sidebar_links.forEach((sideLink) => sideLink.classList.remove("active"));
  this.classList.add("active");

  activeIndex = this.dataset.active;

  moveActiveTab();
}

sidebar_links.forEach((link) => link.addEventListener("click", changeLink));

function showTooltip() {
  let tooltip = this.parentNode.lastElementChild;
  let spans = tooltip.children;
  let tooltipIndex = this.dataset.tooltip;

  Array.from(spans).forEach((sp) => sp.classList.remove("show"));
  spans[tooltipIndex].classList.add("show");

  tooltip.style.top = `${(100 / (spans.length * 2)) * (tooltipIndex * 2 + 1)}%`;
}

tooltip_elements.forEach((elem) => {
  elem.addEventListener("mouseover", showTooltip);
});
