"use strict";

const mainNav = document.querySelector(".navbar-src");
const menu = document.querySelector(".menu");
const list = document.querySelector(".list");
const close_btn = document.querySelector(".close_btn");
const nav_list = document.querySelector(".nav_list");
const searchSection = document.querySelector(".overlab");
const searchContainer = document.querySelector(".search_section");
const searchFieldClose = document.querySelector(".search_section_close_btn");
searchSection.addEventListener("click", (e) => {
  e.preventDefault();
  searchContainer.classList.add("open_search");
});
searchFieldClose.addEventListener("click", (e) => {
  searchContainer.classList.remove("open_search");
});
window.addEventListener("scroll", () => {
  let scrollWindow = window.scrollY;
  if (scrollWindow > 200) {
    mainNav.classList.add("fixed");
  } else if (scrollWindow < 190) {
    mainNav.classList.remove("fixed");
  }
});
menu.addEventListener("click", function () {
  list.classList.add("open");
  nav_list.classList.add("open_nav");
});
const navCloseFun = (e) => {
  if (
    e.target.classList.contains("fa-xmark") ||
    e.target.classList.contains("list")
  ) {
    list.classList.remove("open");
    nav_list.classList.remove("open_nav");
  }
};
close_btn.addEventListener("click", navCloseFun);
list.addEventListener("click", navCloseFun);

// Offer time counter
const days = document.querySelector("#day");
const hour = document.querySelector("#hour");
const minute = document.querySelector("#minute");
const second = document.querySelector("#sec");

let countDown = () => {
  let futureDate = new Date("30 April 2024");
  let currentDate = new Date();
  let myDate = futureDate - currentDate;
  let day = Math.abs(Math.floor(myDate / 1000 / 60 / 60 / 24));
  let hours = Math.abs(Math.floor(myDate / 1000 / 60 / 60) % 24);
  let minutes = Math.abs(Math.floor(myDate / 1000 / 60) % 60);
  let seconds = Math.abs(Math.floor(myDate / 1000) % 60);
  days.innerHTML = day;
  hour.innerHTML = hours;
  minute.innerHTML = minutes;
  second.innerHTML = seconds;
};
countDown();
setInterval(countDown, 1000);

// upper button
const upperButton = document.querySelector(".upper_btn");
window.addEventListener("scroll", function (e) {
  if (window.scrollY > 600) {
    upperButton.classList.add("up_active");
  } else if (window.scrollY < 500) {
    upperButton.classList.remove("up_active");
  }
});

$('.slider').slick({
  arrows: false,
  dots: true,
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 2000,
  dotsClass: "bannerDots container",
});