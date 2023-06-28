`use strict`;

const footer = document.querySelector(`.social-block__social`);
const arrIconFooter = [
  "/icon/Facebook.svg",
  "/icon/Github.svg",
  "/icon/Instagram.svg",
];
const className = "social-block__svg";
const alt = "img";

export function generateImgTeg(arrSrc, className, alt, fatherElem) {
  arrSrc.forEach((el) => {
    const img = document.createElement("img");
    img.src = `${el}`;
    img.className = `${className}`;
    img.alt = `${alt}`;
    fatherElem.append(img);
  });
}

generateImgTeg(arrIconFooter, className, alt, footer);

/////// Drawer ////////////////////////////////////////////////
const openDrawerEl = document.querySelector(`.header__icon`);
const closeDrawerEl = document.querySelector(`.drawer-content__close-button`);
const drawer = document.querySelector(`.drawer`);
const body = document.querySelector(`body`);
const blureEl = document.querySelector(`.drawer-blure`);

openDrawerEl.addEventListener("click", openDrawer);
closeDrawerEl.addEventListener("click", closeDrawer);
blureEl.addEventListener("click", closeDrawer);

function openDrawer(event) {
  event.preventDefault();
  drawer.classList.add(`_active`);
  body.classList.add(`_active`);
}

function closeDrawer(event) {
  event.preventDefault();
  drawer.classList.remove(`_active`);
  body.classList.remove(`_active`);
}
/////////////////////////

const list = document.querySelector(`.drawer-menu_list`);

const arrLink = [
  { text: "ПРО МЕНЯ", href: "#" },
  { text: "МОЙ ОПЫТ", href: "#" },
  { text: "МОИ НАВЫКИ", href: "#" },
  { text: "МОИ РАБОТЫ", href: "#" },
  { text: "ПРАЙС-ЛИСТ", href: "#" },
  { text: "КОНТАКТЫ", href: "#" },
];

export function generateNavLinkList(className, fatherElem, className2, arr) {
  arrLink.forEach(({ text, href }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    li.className = `${className}`;
    a.className = `${className2}`;
    a.innerHTML = text;
    a.href = href;
    fatherElem.append(li);
    li.append(a);
  });
}

generateNavLinkList("drawer-menu_list", list, "drawer-menu__link", arrLink);
