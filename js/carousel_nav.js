var navButtonList = document.querySelector('.user-modal__carousel__nav__buttons');

navButtonList.addEventListener('click', switchSlide);

function switchSlide(e) {

    // make sure li is the click target
    if (e.target.nodeName !== 'LI') {
      return null;
    }

    var currentSlide = document.querySelector('.user-modal__carousel__slide--selected');
    var currentNav = document.querySelector('.modal__nav__button--active');
    var clickedNav = e.target;
    var clickedNavId = clickedNav.id;
    var targetSlideId = 'carousel-slide-' + clickedNavId.substr(-1);
    var newSlide = document.getElementById(targetSlideId);

    // switch between slides
    currentSlide.classList.remove('user-modal__carousel__slide--selected');
    newSlide.classList.add('user-modal__carousel__slide--selected');

    // update current slide indicator (bullet nav fill color)
    currentNav.classList.remove('modal__nav__button--active');
    clickedNav.classList.add('modal__nav__button--active');

}
