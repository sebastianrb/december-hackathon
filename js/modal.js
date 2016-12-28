var modalBackground = document.querySelector(".user-modal__background-cover");
var modalImage = document.querySelector(".user-modal__photo-block__photo")
var modalContainer = document.querySelector(".user-modal__container");
var closeButton = document.querySelector('.user-modal__info-block__header__close-icon');
var elementsToTransUp = document.querySelectorAll('.user-modal__photo-block__quote, .user-modal__info-block__header, .student-bio-text, .bio-info__section-heading, .bio-info__list, .bio-info__section-heading, .career-path__list li, .career-path-update__span');

var images = document.querySelectorAll(".student-image-grid__image-cont__image");




for (var i = 0; i < images.length; i++) {

  images[i].addEventListener("click", function(e) {
    var orig = this;
    var modalPosition = modalContainer.getBoundingClientRect();
    modalImage.src = this.src;
    var modalTransitionTimeline = new TimelineMax();
    var imagesBesidesThis = []
    for(var i = 0; i < images.length; i++){
      if(images[i]!=this){
        imagesBesidesThis.push(images[i]);
      }
    }


    var imgClone = cloneOverlayImg(orig);

    // === BEGIN 'TO MODAL'TRANSITION  ===

    //  BRING MODAL BACKGROUND UP
    // modalTransitionTimeline.to(modalBackground, 0.25, {ease: Power1.easeIn, zIndex: 300, opacity: 1,  height: '100%'})
    modalTransitionTimeline.to(modalBackground, 0.25, {ease: Expo.easeInOut, zIndex: 300, opacity: 1,  height: '100%'})

    modalTransitionTimeline.to(imagesBesidesThis, 0.3, {transform: 'scale(0,0)', zIndex: -100, opacity: 0}, '-=0.15');

    // MOVE MODAL INTO POSITION
    // modalTransitionTimeline.to(imgClone, 0.4, { ease: Power1.easeOut, top: modalPosition.top, left: modalPosition.left, zIndex: 600}, '-=0.3')
    modalTransitionTimeline.to(imgClone, 0.4, { ease: Expo.easeInOut, top: modalPosition.top, left: modalPosition.left, zIndex: 600}, '-=0.3')
    // modalTransitionTimeline.to(imgClone,0.4,{ ease: Power1.easeOut, width: modalImage.width, height: modalImage.height}, '-=0.34')
    modalTransitionTimeline.to(imgClone,0.4,{ ease: Expo.easeInOut, width: modalImage.width, height: modalImage.height}, '-=0.34')

    // SHRINK OTHER STUDENT IMAGES IN GRID
    modalTransitionTimeline.to(orig, 0.2, {opacity: 0}, '-=0.4');

    // BRING MODAL UP
    modalTransitionTimeline.to(modalContainer, 0.1, { opacity: "1", zIndex: 500}, '-=0.2')

    // modalTransitionTimeline.to(imgClone, 0.01, {opacity: 0},'+=0.2');
    // MODAL ITEMS TRANSITION UP
    for(var i = 0; i < elementsToTransUp.length; i++){
      modalTransitionTimeline.to(elementsToTransUp[i], 0.12, { opacity: "1", y: -30, zIndex: 1000, ease: Power1.easeOut}, "-=0.005")
    }

    modalTransitionTimeline.add(function(){imgClone.remove()})
    // === END 'TO MODAL' TRANSITION ===



    //modalTransitionTimeline.add(function(){imgClone.remove()})

    closeButton.addEventListener('click', function _close(e){
      var revImgClone = cloneOverlayImg(modalImage);
      modalImage.src = '';
      // ====






      //  REVERSE MODAL BACKGROUND
      modalTransitionTimeline.to(modalBackground, 0.08, {zIndex: -300, height: 0})

      // MODAL ITEMS TRANSITION UP
      modalTransitionTimeline.to(elementsToTransUp, 0.12, { opacity: 0, y: 30, zIndex: -500 }, '-=0.05' )


      // KILL MODAL
      modalTransitionTimeline.to(modalContainer, 0.08, { opacity: 0, zIndex: -500 }, '-=0.13')

      modalTransitionTimeline.to(imagesBesidesThis, 0.01, {opacity: 0.8});

      // RESIZE OTHER STUDENT IMAGES IN GRID TO NORMAL
      modalTransitionTimeline.to(imagesBesidesThis, 0.2, {scale: 1, opacity: 1, zIndex: 500}, '-=0.08');

      var origImagePos = orig.getBoundingClientRect();

      modalTransitionTimeline.to(revImgClone, 0.25, { top: origImagePos.top, left: origImagePos.left}, '-=0.25').to(revImgClone, 0.25,{ width: origImagePos.width, height: origImagePos.height}, '-=0.24');

      modalTransitionTimeline.to(orig, 0.1, {opacity: 1});
      modalTransitionTimeline.add(function(){revImgClone.remove()})

      // ====

      /*
      var revModalTransitionTimeline = new TimelineMax();
      var origImagePos = orig.getBoundingClientRect();
      revModalTransitionTimeline.to(revImgClsone, 0.25, { top: origImagePos.top, left: origImagePos.left}, '+=0.09').to(revImgClone, 0.25,{ width: origImagePos.width, height: origImagePos.height}, '-=0.24');

      revModalTransitionTimeline.add(function(){revImgClone.remove()})
      */
      modalTransitionTimeline = null
      this.removeEventListener('click', _close);
    });


  });
}



// Brian Merriman's image div clone code:

function cloneOverlayImg(img) {

  //GET POSITION OF IMAGE CONT
  thisDim = img.getBoundingClientRect();

  clone = img.cloneNode(true);
  clone.className = "";

  //OVERLAY CLONE ON ORIGINAL IMAGE
  clone.style.position = "fixed";
  clone.width = thisDim.width;
  clone.style.top = (thisDim.top).toString() + "px";
  clone.style.left = (thisDim.left).toString() + "px";
  clone.style.width = (thisDim.width).toString() + 'px';
  clone.style.height = (thisDim.height).toString() + 'px';
  clone.style.zIndex = "400";

  document.body.parentNode.appendChild(clone);

  return clone;
}
