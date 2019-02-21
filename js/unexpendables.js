var ticking = false;
var last_known_scroll_position = 0;

function startAnimations() {
  var animatedStart = document.querySelector('.animated-start');
  animatedStart.classList.remove('animated-start');
}

function getTop(element){
  var elementOffsetTop = 0;
  while( element != null ) {
    elementOffsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return elementOffsetTop;
}

function userIsScrolling() {
  var header = document.querySelector('header');
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      scrollingAnimations(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
  if(last_known_scroll_position>0) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
}

function scrollingAnimations(scroll_pos) {
  var viewPortHeight = window.innerHeight;
  var documentHeight = document.body.scrollHeight;
  var animatedZones = document.querySelectorAll('.animated-zone');

  if(animatedZones){
    animatedZones.forEach( function(element) {
      var posicionTop = getTop(element);
      var dataScroll = element.getAttribute('data-scroll');
      var dataAnimation = element.getAttribute('data-animation');
      if(!dataScroll) {
        dataScroll = 200;
      }
      if(dataAnimation) {
        var elementAnimated = document.querySelector('#' + dataAnimation);
        posicionTop = getTop(elementAnimated);
      }
      var startPosAnimation = viewPortHeight - dataScroll;
      if((posicionTop < (scroll_pos + startPosAnimation)) || (scroll_pos + viewPortHeight + 200) >= documentHeight) {
        element.classList.remove('animated-zone');
        }
    });
  }

}

function toogleMenu() {
  var header = document.querySelector('header');
  header.classList.toggle('show-menu');
}

function showModal(event) {
  var element = event.target;
  var modalId = element.getAttribute('rel');
  var modal = document.querySelector('#' + modalId);
  hideModal();
  modal.classList.add('show-modal');
}

function hideModal() {
  var modalList = document.querySelectorAll('.modal');
  if(modalList){
    modalList.forEach( function(element) {
      element.classList.remove('show-modal');
    });
  }
}

function onLoadFunctions() {
  var menuButton = document.querySelector('#menu-button');
  var videoHeader = document.querySelector('#video_content');
  var modalButtons = document.querySelectorAll('.modal-button');
  var modalClose = document.querySelectorAll('.modal-close');
  var animatedZones = document.querySelectorAll('.animated-zone');
  
  if(videoHeader && (window.innerWidth>=768)) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('type','text/html');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/aqJON3A3TmM?autoplay=1&loop=1&mute=1&playlist=aqJON3A3TmM&controls=0');

    videoHeader.appendChild(iframe);
  }

  if(window.innerWidth<700) {
    if(animatedZones){
      animatedZones.forEach( function(element) {
        element.classList.remove('animated-zone');
      });
    }
  }

  if(menuButton){
    menuButton.addEventListener('click', toogleMenu);
  }
  if(modalButtons){
    modalButtons.forEach( function(element) {
      element.addEventListener('click', showModal);
    });
  }
  if(modalClose){
    modalClose.forEach( function(element) {
      element.addEventListener('click', hideModal);
    });
  }
  startAnimations();
}

scrollingAnimations(0);
window.addEventListener('load', onLoadFunctions);
window.addEventListener('scroll', userIsScrolling);


