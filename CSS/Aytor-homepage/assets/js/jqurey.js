$(function () {
  //* jquery start
  $(".banner_slider").slick({
    prevArrow: `.right_arrows`,
    nextArrow: `.left_arrows`,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "bannerDots container",
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 2000,
  });
  //* jquery end
  $(".sm_banner_slider").slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  });
  //* jquery end
});
// hero section end

// tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// home page product img

$(".slider").slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 2,
  prevArrow: ".left_arrow",
  nextArrow: ".right_arrow",
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1170,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 920,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
//? offer slider
$(".offer_card").slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 2,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow: false,
  nextArrow: false,
  dotsClass: "slick-dod container",
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    ,
  ],
});

// News section slider
$(".news_slider").slick({
  dots: true,
  infinite: true,
  speed: 300,
  prevArrow: false,
  nextArrow: false,
  slidesToShow: 4,
  dotsClass: "slick-dod container",
  slidesToScroll: 2,
  cssEase: "linear",
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
