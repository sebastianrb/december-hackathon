(function() {


    var studentImageGrid = document.querySelector('.student-image-grid');
    var studentImageGridImages;


    var modalBackground = document.querySelector(".user-modal__background-cover");
    var modalStudentProfileImage = document.querySelector(".user-modal__photo-block__photo");
    var modalStudentProfileImageBlock = document.querySelector(".user-modal__photo-block");
    var modalContainer = document.querySelector(".user-modal__container");

    var modalExitButton = document.querySelector('.user-modal__info-block__header__close-icon');

    var elementsToTransUp = document.querySelectorAll('.user-modal__photo-block__quote, .user-modal__info-block__header, .bio-info__section-heading, .user-modal__info-block__main-content--bio-info-wrapper, .career-path__list li, .career-path-update__span, .user-modal__carousel__nav__container');

    var bodyElement = document.querySelector('body');
    var mainElement = document.querySelector('main');

    var prev = document.getElementById('intermodal--prev');
    var next = document.getElementById('intermodal--next');


    prev.addEventListener('click', goToPrev);
    next.addEventListener('click', goToNext);
    var currentProfileID = null;

    // ADD EVENT LISTENER TO STUDENT IMAGE GRID
    studentImageGrid.addEventListener('click', transitionModal);


    // BEGIN MODAL TRANSITION FUNCTION
    function transitionModal(e) {
        var selectedStudentImage = e.target;

        // // ============================================
        // // disable scroll on body when modal is visible1
        // // ============================================
        // bodyElement.classList.add('disable-scroll');

        studentImageGridImages = Array.prototype.slice.call(document.querySelectorAll(".student-image-grid__image-cont__image"));
        currentProfileID = studentImageGridImages.indexOf(selectedStudentImage);

        var studentImageClone = imgCloneOverlayImg(selectedStudentImage);
        var studentImagesBesidesClicked = [];

        var modalEnterTransitionTimeline = new TimelineMax();

        // SET MODAL STUDENT PROFILE IMAGE TO CLICKED/SELECTED IMAGE - THIS NEEDS TO BE DONE BEFORE ANIMATION STARTS SO PROPER IMAGE IS PRESET IN MODAL
        // HERE WILL ALSO SET MODAL PROFILE DATA TO STUDENT'S JSON DATA
        modalStudentProfileImage.src = selectedStudentImage.src;

        // ===================================
        // === ENTER 'TO MODAL'TRANSITION  ===
        // ===================================

        //

        modalEnterTransitionTimeline.set(elementsToTransUp,{className: '+=hide_modal_items'});
        //  BRING MODAL BACKGROUND FORWARD
        modalEnterTransitionTimeline.to(modalBackground, 0.15, { className: '+=user-modal__background-cover--active' });

        // SHRINK OTHER STUDENT IMAGES IN GRID
        modalEnterTransitionTimeline.to(studentImageGridImages, 0.3, { className: '+=shrink_grid_images'}, '-=0.1');

        var modalImagePosition = modalStudentProfileImage.getBoundingClientRect();
        // MOVE CLONED STUDENT IMAGE INTO POSITION OVERLAYING MODAL PROFILE IMAGE
        modalEnterTransitionTimeline.to(studentImageClone, 0.7, { top: modalImagePosition.top, left: modalImagePosition.left, ease: Power2.easeOut}, '-=0.25');
        modalEnterTransitionTimeline.to(studentImageClone, 0.7, { width: modalStudentProfileImage.width, height: modalStudentProfileImage.height }, '-=0.69');


        // BRING MODAL FORWARD AND OPAQUE
        modalEnterTransitionTimeline.to(modalContainer, 0.2, { className: '+=user-modal__container--active' }, '-=0.1');


        // MODAL ITMES TRANSITION - IN THIS TRANSITION WE QUICKLY TRANSITION UP THE MAJORITY OF PROFILE ITEMS IN THE MODAL BEFORE SLOWLY TRANSITIONING UP THE LAST FEW PROFILE ITEMS; THIS GIVES THE USER A SENSE THAT THE ITEMS WERE ALL TRANSITIONED AT THE SAME SPEED. OTHERWISE, WHEN THE ITEMS ARE TRANSITIONED UP AT THE SAME SPEED THE TRANSITION APPEARS TOO FAST OR TOO SLOW TO THE USER

        // MODAL ITEMS TRANSITION PART 1 - FAST TRANSITION FOR MAJORITY OF ITEMS TO SPOOF LONGER TRANSITION ANIMATION

        for (var k = 0; k < elementsToTransUp.length; k++) {
            modalEnterTransitionTimeline.to(elementsToTransUp[k], 0.3, { className: '-=hide_modal_items' }, "-=0.25");
        }

        // REMOVE CLONED IMAGE USED IN TRANSTION
        // NOTE: THIS CAUSES SLIGHT FLICKERING
        modalEnterTransitionTimeline.add(function() { studentImageClone.remove(); });

        //adjust body scrolling toggle
        modalEnterTransitionTimeline.add(function(){bodyElement.classList.add('disable-scroll');});

        //KILL TRANSITION TIMELIN
        modalEnterTransitionTimeline = null;


        // ====================================
        // === END 'ENTER MODAL' TRANSITION ===
        // ====================================

        // THOUGHTS ON ENTER MODAL TRANSITION
        // BTM - PERHAPS MAY NOT NEED CLONE - CAN MOVE MODAL OVER ORIGINAL IMAGE AND THEN TRANSITION INTO PLACE (USING TIMELINE FROM() FUNCTION!)
        // FROM POSITION X,Y TO ORIGINAL POS
        // BTM - SHOULD PROBABLY CLEAR APPLIED STYLES DUE TO TRANSTIONS AFTER/MIGHT BE BETTER TO TRANSITION ITEMS TO OTHER CLASSES INSTEAD OF DIRECTLY MODIFYING CSS PROPERTIES?



    } // END OF MODAL TRANSITION EVENT LISTENER



    modalExitButton.addEventListener('click', function _close(e) {

        var modalExitTransitionTimeline = new TimelineMax();
        var revImgClone = imgCloneOverlayImg(modalStudentProfileImage);
        mainElement.appendChild(revImgClone);
        var selectedStudentImage = studentImageGridImages[currentProfileID];

        modalStudentProfileImage.src = '';

        selectedStudentImage.classList.remove('shrink_grid_images');
        selectedStudentImage.classList.add('currentProfile_grid_image');

        var selectedStudentImagePosDim = selectedStudentImage.getBoundingClientRect();

        // SCROLL TO POSITION OF CURRENT IMAGE ON GRID
        window.scrollTo(0, (selectedStudentImagePosDim.top + window.pageYOffset + 100));

        // RECALCULATE IMAGE POSITION AFTER SCROLL
        selectedStudentImagePosDim = selectedStudentImage.getBoundingClientRect();


        // =====================================
        // === START 'EXIT MODAL' TRANSITION ===
        // =====================================

        // REVERSE MODAL BACKGROUND

        // FADE OUT/UP MODAL ITEMS AND CONTAINER
        modalExitTransitionTimeline.to(elementsToTransUp, 0.25, { className:'+=hide_modal_items' }, '-=0.25');
        modalExitTransitionTimeline.to(modalContainer, 0.25, { className: '-=user-modal__container--active'}, '-=0.30');

        modalExitTransitionTimeline.to(modalBackground, 0.4, { className:'-=user-modal__background-cover--active' });

        // RESIZE/FULLY FADE-IN/BRING FORWARD OTHER STUDENT IMAGES ON GRID
        modalExitTransitionTimeline.to(studentImageGridImages, 0.25, { className: '-=shrink_grid_images' }, '-=0.48');

        // TRANSITION CLONED IMAGE TO SELECTED STUDENT IMAGE'S CURRENT POSITION
        modalExitTransitionTimeline.to(revImgClone, 0.8, { top: selectedStudentImagePosDim.top, left: selectedStudentImagePosDim.left, ease: Back.easeOut, }, '-=0.25');
        modalExitTransitionTimeline.to(revImgClone, 0.8, { width: selectedStudentImagePosDim.width, height: selectedStudentImagePosDim.height }, '-=0.71');


        // REMOVE CLONE
        // NOTE THIS MAY CAUSE FLICKERING
        modalExitTransitionTimeline.to(selectedStudentImage, 0.1, {className: '-=currentProfile_grid_image'});
        modalExitTransitionTimeline.add(function() { revImgClone.remove(); });

        // RE-ENABLE BODY SCROLL AFTER TRANSITION IS COMPLETE
        modalExitTransitionTimeline.add(function(){bodyElement.classList.remove('disable-scroll');});

        // RESET PROFILE ID
        currentProfileID = null;

        // KILL EXIT MODAL TIMELINE
        modalExitTransitionTimeline = null;

        // ==================================
        // === END 'EXIT MODAL TRANSTION' ===
        // ==================================


    }); // END OF EXIT MODAL BUTTON EVENT LISTENER



    function goToPrev(){
      currentProfileID-=1;
      if(currentProfileID < 0){
          currentProfileID = studentImageGridImages.length - 1;
      }


      selectedStudentImage = studentImageGridImages[currentProfileID];
      var modalNextProfileTransitionTimeline = new TimelineMax();
      var modalStudentProfileImagePos = modalStudentProfileImage.getBoundingClientRect();

      var imgClone =  selectedStudentImage.cloneNode(true);
      imgClone.className = "";
      imgClone.style.position = "fixed";
      imgClone.style.width = modalStudentProfileImagePos.width + 'px';
      imgClone.style.height = modalStudentProfileImagePos.height + 'px' ;
      imgClone.style.top = "0";
      imgClone.style.left = (modalStudentProfileImagePos.width*-1.5) + 'px';
      imgClone.style.objectFit = "cover";
      imgClone.style.zIndex = 500;
      modalStudentProfileImageBlock.appendChild(imgClone);
      modalNextProfileTransitionTimeline.to([elementsToTransUp, modalStudentProfileImage], 0.35, { className:'+=hide_modal_items' });
      modalNextProfileTransitionTimeline.to(imgClone, 0.3, {left: 0});
      modalNextProfileTransitionTimeline.to([elementsToTransUp,modalStudentProfileImage], 0.35, { className:'-=hide_modal_items' }, '-=0.25');
      modalNextProfileTransitionTimeline.add(function() { imgClone.remove(); modalStudentProfileImage.src = selectedStudentImage.src;});

    }

    function goToNext(){

      currentProfileID+=1;
      if(currentProfileID >= studentImageGridImages.length){
          currentProfileID = 0;
      }


      selectedStudentImage = studentImageGridImages[currentProfileID];
      var modalNextProfileTransitionTimeline = new TimelineMax();
      var modalStudentProfileImagePos = modalStudentProfileImage.getBoundingClientRect();

      var imgClone =  selectedStudentImage.cloneNode(true);
      imgClone.className = "";
      imgClone.style.position = "fixed";
      imgClone.style.width = modalStudentProfileImagePos.width + 'px';
      imgClone.style.height = modalStudentProfileImagePos.height + 'px' ;
      imgClone.style.top = "0";
      imgClone.style.left = (modalStudentProfileImagePos.width*-1.5) + 'px';
      imgClone.style.objectFit = "cover";
      imgClone.style.zIndex = 500;
      modalStudentProfileImageBlock.appendChild(imgClone);
      modalNextProfileTransitionTimeline.to(elementsToTransUp, 0.35, { className:'+=hide_modal_items' });
      modalNextProfileTransitionTimeline.to(imgClone, 0.3, {left: 0});
      modalNextProfileTransitionTimeline.to(elementsToTransUp, 0.35, { className:'-=hide_modal_items' }, '-=0.25');
      modalNextProfileTransitionTimeline.add(function() { imgClone.remove(); modalStudentProfileImage.src = selectedStudentImage.src;});


    }

    function imgCloneOverlayImg(imgToClone) {

        //GET POSITION/DIMENSIONS OF IMAGE
        thisDim = imgToClone.getBoundingClientRect();

        // CLONE IMAGE
        imgClone = imgToClone.cloneNode(true);
        imgClone.className = "";

        //POSITION CLONE OVER ORIGINAL IMAGE
        imgClone.style.position = "fixed";

        imgClone.style.top = (thisDim.top).toString() + "px";
        imgClone.style.left = (thisDim.left).toString() + "px";
        imgClone.style.width = (thisDim.width).toString() + 'px';
        imgClone.style.height = (thisDim.height).toString() + 'px';

        //set object-fit
        imgClone.style.objectFit = 'cover';

        // OVERLAY IMAGE (SHOULD CALCLUATE ZINDEX BASED ON ORIG IMAGE INDEX + N)
        imgClone.style.zIndex = "300";
        imgClone.style.opacity = "1";

        // ADD CLONE TO HTML SO IT APPEARS!
        // document.body.parentNode.appendChild(imgClone);
        modalBackground.appendChild(imgClone);

        return imgClone;

    }

})();

// BTM - PROFILE SWITCH TRANSITION PLANS
// NEED GLOBAL VAR CURRENTPROFILE TO TRACK CURRENT PROFILE
// RIGHT ARROW 'CLICK' EVENT LISTENER
// LEFT ARROW 'CLICK' EVENT LISTENER
// 1. GET NEXT/PREV PROFILE IMAGE
// 2. TRANSITION CURRENT PROFILE OUT
// 3. TRANSITION NEW PROFILE IN
// 4. DELETE OLD EVENT LISTENER
// 5. UPDATE NEW/OLD IMAGES ON GRID FOR TRANSITION DOWN
// 6. UPDATE CURRENTPROFILE GLOBAL -> THIS IS REQUIRED SO IMAGE GOES TO PROPER POSITION WHEN EXITING
// 7. UPDATE MODAL EXIT BUTTON EVENT LISTENER
// 6. THATS ALL FOLKS
