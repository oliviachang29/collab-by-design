// Write your javascript here...
// ES6 will be compiled with Webpack

 $('img')
   .unveil({
     offset: 200,
     placeholder: "/lazy.jpg",
     debug: true,
   })
   .on("loaded.unveil", function () {
     this.style.opacity = 1;
   });

$(".navbar .nav-item").each(function() {
  if (`${$(this).prop("href")}/` == window.location.href) {
    $(this).addClass("active");
  } else {
    $(this).removeClass("active");
  }
});