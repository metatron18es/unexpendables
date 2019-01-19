var ticking = false;
var last_known_scroll_position = 0;

function statAnimations() {
  animatedStart = document.querySelector(".animated-start");
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

function userIsScrolling(e) {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      scrollingAnimations(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
}

function scrollingAnimations(scroll_pos) {
  var viewPortHeight = window.innerHeight;
  var documentHeight = document.body.scrollHeight;
  var animatedZones = document.querySelectorAll('.animated-zone');

  if(animatedZones){
    animatedZones.forEach( function(element) {
      var posicionTop = getTop(element);
      var dataScroll = 200;
      var startPosAnimation = viewPortHeight - dataScroll;
      if((posicionTop < (scroll_pos + startPosAnimation)) || (scroll_pos + viewPortHeight + 200) >= documentHeight) {
        element.classList.remove('animated-zone');
        }
    });
  }

}

scrollingAnimations(0);
window.addEventListener("load", statAnimations);
window.addEventListener("scroll", userIsScrolling);
