`use strict`;

window.addEventListener("load", function () {
  start();
});

const footer = document.querySelector(`.social-block__social`);
const listSvg2 = document.querySelector(`.page3-block__social`);
const listSvg3 = document.querySelector(`.dsgsdggdsgds`);
const arrIconFooter = [
  "icon/Facebook.svg",
  "icon/Github.svg",
  "icon/Instagram.svg",
];
const className = "social-block__svg";
const className2 = "page3-block__svg";
const className3 = "page3-ergreblock__svg";
const alt = "img";

export function generateImgTeg(arrSrc, className, alt, fatherElem) {
  arrSrc.forEach((el) => {
    const img = document.createElement("img");
    img.src = `${el}`;
    img.className = `${className}`;
    img.alt = `${alt}`;
    fatherElem?.append(img);
  });
}

/////// Drawer ////////////////////////////////////////////////
const openDrawerEl = document.querySelector(`.header__icon`);
const closeDrawerEl = document.querySelector(`.drawer-content__close-button`);
const drawer = document.querySelector(`.drawer`);
const body = document.querySelector(`body`);
const blureEl = document.querySelector(`.drawer-blure`);

openDrawerEl?.addEventListener("click", openDrawer);
closeDrawerEl?.addEventListener("click", closeDrawer);
blureEl?.addEventListener("click", closeDrawer);

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
///////////////////////// generate a list in nav ////////////////////////

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
    fatherElem?.append(li);
    li?.append(a);
  });
}

function start() {
  generateImgTeg(arrIconFooter, className, alt, footer);
  generateImgTeg(arrIconFooter, className2, alt, listSvg2);
  generateImgTeg(arrIconFooter, className3, alt, listSvg3);
  generateNavLinkList("drawer-menu_list", list, "drawer-menu__link", arrLink);
}

///////////////////////// validate form ////////////////////////
const applicantForm = document.getElementById("form");
const errElem = document.querySelectorAll(".error-message");
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^[А-Я][а-яё]*$/;

async function postMessageServer(data) {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    };
    const response = await fetch("https://reqres.in/api/posts", requestOptions);
    if (!response.ok) {
      console.log("err");
    }
  } catch (error) {
    console.log("err");
  }
}

function setErrorValidMessag(data) {
  switch (data.type) {
    case "name":
      errElem[0].classList.add(`_active`);
      return console.log(data.type);
    case "email":
      errElem[1].classList.add(`_active`);
      return console.log(data.type);
    case "text":
      errElem[2].classList.add(`_active`);
      return console.log(data.type);
    case "good":
      errElem.forEach((el) => {
        el.classList.remove(`_active`);
      });
      return postMessageServer(data.data);
    default:
      return;
  }
}

function validForm(data) {
  let objData = { name: "", email: "", text: "" };
  data.forEach(({ name, value }) => {
    switch (name) {
      case "name":
        !nameRegex.test(value)
          ? setErrorValidMessag({ type: "name" })
          : (objData = { ...objData, name: value });
        return;
      case "email":
        !emailRegex.test(value)
          ? setErrorValidMessag({ type: "email" })
          : (objData = { ...objData, email: value });
        return;
      case "text":
        value === ""
          ? setErrorValidMessag({ type: "text" })
          : (objData = { ...objData, text: value });
        return;
      default:
        return (objData = { ...objData });
    }
  });
  if (objData.name === "" || objData.email === "" || objData.text === "")
    return;
  setErrorValidMessag({ type: "good", data: { ...objData } });
}

function serializeForm(formNode) {
  const { elements } = formNode;
  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element;
      return { name, value };
    });
  validForm(data);
}

function handleFormSubmit(event) {
  event.preventDefault();
  serializeForm(applicantForm);
}

applicantForm.addEventListener("submit", handleFormSubmit);
