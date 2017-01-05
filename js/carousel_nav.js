var navButtonList = document.querySelector('.user-modal__carousel__nav__buttons');

navButtonList.addEventListener('click', switchSlide);

function switchSlide(e) {
			
    var currentSlide = document.querySelector('.user-modal__carousel__slide--selected');
    var clickedNavId = e.target.id;
    var newSlideId = 'carousel-slide-' + clickedNavId.substr(-1);
    var newSlide = document.getElementById(newSlideId);

    currentSlide.classList.remove('user-modal__carousel__slide--selected');
    newSlide.classList.add('user-modal__carousel__slide--selected');

}
