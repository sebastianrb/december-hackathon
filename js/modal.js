var modalBackground = document.querySelector(".user-modal__background-cover");
var modalImage = document.querySelector(".user-modal__photo-block__photo")
var modalContainer = document.querySelector(".user-modal__container");
var closeButton = document.querySelector('.user-modal__info-block__header__close-icon');
var elementsToTransUp = document.querySelectorAll('.user-modal__photo-block__quote, .user-modal__info-block__header, .student-bio-text, .bio-info__section-heading, .bio-info__list, .bio-info__section-heading, .career-path__list li, .career-path-update__span');
var quoteBlockSymbol = window.getComputedStyle(document.querySelector('.user-modal__info-block__header__close-icon'), ':before');
var images = document.querySelectorAll(".student-image-grid__image-cont__image");




for (var i = 0; i < images.length; i++) {

  images[i].addEventListener("click", function(e) {
    var origImg = this;
    var modalPosition = modalContainer.getBoundingClientRect();
    modalImage.src = this.src;
    var modalTransitionTimeline = new TimelineMax();
    var imagesBesidesThis = []
    for(var i = 0; i < images.length; i++){
      if(images[i]!=this){
        imagesBesidesThis.push(images[i]);
      }
    }


    var imgClone = cloneOverlayImg(origImg);

    // === BEGIN 'TO MODAL'TRANSITION  ===

    //  BRING MODAL BACKGROUND UP
    modalTransitionTimeline.to(modalBackground, 0.15, { zIndex: 300, opacity: 1,  height: '100%'})

    // SHRINK OTHER STUDENT IMAGES IN GRID
    modalTransitionTimeline.to(imagesBesidesThis, 0.3, {transform: 'scale(0,0)', zIndex: -100, opacity: 0}, '-=0.1');

    // MOVE MODAL INTO POSITION
    modalTransitionTimeline.to(imgClone, 0.7, {  top: modalPosition.top, left: modalPosition.left, zIndex: 300},'-=0.25')
    modalTransitionTimeline.to(imgClone,0.7,{  width: modalImage.width, height: modalImage.height}, '-=0.69')

    modalTransitionTimeline.to(origImg, 0.01, {opacity: 0, zIndex: -500}, '-=0.72');

    // BRING MODAL UP
    modalTransitionTimeline.to(modalContainer, 0.2, { opacity: "1", zIndex: 500}, '-=0.2')


    
    // MODAL ITEMS TRANSITION UP
    for(var i = 0; i < elementsToTransUp.length-4; i++){
      modalTransitionTimeline.to(elementsToTransUp[i], 0.2, { opacity: "1", top: '0px'}, "-=0.13")
    }

    for(var i =  elementsToTransUp.length-4; i < elementsToTransUp.length; i++){
      modalTransitionTimeline.to(elementsToTransUp[i], 0.3, { opacity: "1", top: '0px'}, "-=0.15")
    }

    modalTransitionTimeline.add(function(){imgClone.remove()})
    
    modalTransitionTimeline = null


    // === END 'TO MODAL' TRANSITION ===



    

    closeButton.addEventListener('click', function _close(e){
      var modalTransitionTimelineExit = new TimelineMax();
      var revImgClone = cloneOverlayImg(modalImage);
      modalImage.src = '';
      // ====






      //  REVERSE MODAL BACKGROUND
      modalTransitionTimelineExit.to(modalBackground, 0.4, {zIndex: -300, height: 0, opacity: 0})

      modalTransitionTimelineExit.to(elementsToTransUp, 0.35, {opacity: 0, top: '-50px' }, '-=0.25' )
      modalTransitionTimelineExit.to(modalContainer, 0.35, { opacity: 0, zIndex: -500 }, '-=0.30');
      // KILL MODAL
      // MODAL ITEMS TRANSITION UP



      modalTransitionTimelineExit.to(imagesBesidesThis, 0.01, {opacity: 0.8});

      // RESIZE OTHER STUDENT IMAGES IN GRID TO NORMAL
      modalTransitionTimelineExit.to(imagesBesidesThis, 0.25, {scale: 1, opacity: 1, zIndex: 500}, '-=0.38');

      var origImagePos = origImg.getBoundingClientRect();

      modalTransitionTimelineExit.to(revImgClone, 0.7, { top: origImagePos.top, left: origImagePos.left}, '-=0.42').to(revImgClone, 0.7,{ width: origImagePos.width, height: origImagePos.height}, '-=0.69');

      modalTransitionTimelineExit.to(origImg, 0.2, {opacity: 1, zIndex: 500});
    
      modalTransitionTimelineExit.add(function(){revImgClone.remove()})
     
      modalTransitionTimelineExit = null
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
  clone.style.zIndex = "1000";
  clone.style.opacity = "1";

  document.body.parentNode.appendChild(clone);

  return clone;
}
