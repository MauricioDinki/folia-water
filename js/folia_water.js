$('form[name="contact-form"]').validate({
  name: 'required',
  email: 'required',
  phone: 'required',
  messages: {
   name: "Por favor, introduce tu Nombre.",
   email: "Por favor, introduce un Correo Electrónico.",
   phone: "Por favor, introduce tu Teléfono."
  },
  submitHandler: function(form) {
   var data = $('form[name="contact-form"]').serialize();
   console.log(data);
   $.ajax({
     url: 'http://integrations.blick.mx/',
     method: 'POST',
     data: data
   }).done(function(data) {
     if (parseInt(data) === 1) {
       alertify.logPosition("bottom right");
       alertify.success("Correo enviado, gracias por contactarte con nosotros.");
       $('form[name="contact-form"]')[0].reset();
     }
   });
  },
  invalidHandler: function(event, validator) {
   var errors = validator.numberOfInvalids();
   alertify.logPosition("bottom right");
   alertify.error("Verifica tu información tienes " + errors + " errores.");
  }
});

var last_known_scroll_position = 0;
var ticking = false;

var siteNavbar = document.querySelector('.navbar');

//navbar-fixed-top
function doSomething(scroll_pos) {
  if (window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname === '/project-name/index.html' || window.location.pathname === '/project-name/') {
    if (scroll_pos > 30) {
      siteNavbar.classList.add('navbar-scroll');

    } else {
      siteNavbar.classList.remove('navbar-scroll');
    }
  }
}

doSomething();

window.addEventListener('scroll', function(e) {
  if (e.view) {
    last_known_scroll_position = e.view.pageYOffset;
  }
  else {
    last_known_scroll_position = window.scrollY;
  }
  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false
    });
  }
  ticking = true;
});

function showMenu() {
  document.querySelector('#menuContainer').style.width = '85%';
  document.querySelector('#hamburgerMenu').style.display = 'none';
}

function hideMenu() {
  document.querySelector('#menuContainer').style.width = '0%';
  document.querySelector('#hamburgerMenu').style.display = 'inline';
}

window.addEventListener('click', function(e) {
  if (!e.target.dataset.hasOwnProperty('attribute')) {
    hideMenu();
  }
});

/*Events of touchstart to mobile version*/

var showHamburger = document.querySelector('#hamburgerMenu');

showHamburger.addEventListener('touchstart', function(e) {
  e.preventDefault();
  showMenu();
});

var hideHamburger = document.querySelector('#hideHamburger');

hideHamburger.addEventListener('touchstart', function(e) {
  e.preventDefault();
  hideMenu();
});

/* Events of click to desktop version*/

showHamburger.addEventListener('click', function(e) {
  e.preventDefault();
  showMenu();
});

hideHamburger.addEventListener('click', function(e) {
  e.preventDefault();
  hideMenu();
});

var lang = "en";
var arrLang = [];

//Attach events to menu
$(function(){

  function buttonActive(tab) {
    //Get item siblings
    var siblings = tab.siblings();
    //Remove active class on all buttons
    siblings.each(function(){
      $(this).removeClass('active-lang');
    })

    //Add the clicked button class
    tab.addClass('active-lang');
  }

  if (sessionStorage) {
    var ind = sessionStorage.tab;
    buttonActive($('.site-button-container .site-button').eq(ind));
  }
      
  $(".site-button-container .site-button").click(function () {
    if(sessionStorage){ 
      sessionStorage.tab = $(this).index();
    }
    buttonActive($(this));
  });
});

$.ajax({
  url: '../json/data.json',
  dataType: 'json',
  type: 'get',
  cache: false,
  success: function(data) {

    // The default language is English
    arrLang = data

    langChange();
  }
});

function langChange() {
  // Check for localStorage support
  if('sessionStorage' in window){
    var usrLang = sessionStorage.getItem('uiLang');
    if(usrLang) {
      lang = usrLang
    }
  }

  function langInfo(lang) {
    $(".lang").each(function(index, element) {
      var img = "Img"
      $(element).text(arrLang[lang][$(element).attr("data-info")]);
      $(element).attr("src", arrLang[lang][$(element).attr("data-info")]);
    });
  }

  langInfo(lang);

  // get/set the selected language
  $(".translate").click(function() {
    var lang = $(this).attr("id");
    // update sessionStorage key
    if('sessionStorage' in window){
      sessionStorage.setItem('uiLang', lang);
      var idioma = sessionStorage.getItem('uiLang');
    }

    langInfo(idioma);
  });
}
