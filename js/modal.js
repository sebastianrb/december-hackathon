(function() {


    var studentImageGrid = document.querySelector('.student-image-grid');
    var studentImageGridImages = document.querySelectorAll(".student-image-grid__image-cont__image");


    var modalBackground = document.querySelector(".user-modal__background-cover");
    var modalStudentProfileImage = document.querySelector(".user-modal__photo-block__photo");
    var modalContainer = document.querySelector(".user-modal__container");

    var modalExitButton = document.querySelector('.user-modal__info-block__header__close-icon');

    var elementsToTransUp = document.querySelectorAll('.user-modal__photo-block__quote, .user-modal__info-block__header, .student-bio-text, .bio-info__section-heading, .bio-info__list, .bio-info__section-heading, .career-path__list li, .career-path-update__span');

    var bodyElement = document.querySelector('body');
    
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

        for(var i = 0; i < studentImageGridImages.length; i++){
            if(studentImageGridImages[i] === selectedStudentImage){
                currentProfileID = i;
                break;
            }
        }

        var studentImageClone = imgCloneOverlayImg(selectedStudentImage);
        var studentImagesBesidesClicked = [];

        var modalEnterTransitionTimeline = new TimelineMax();
        var modalPosition = modalContainer.getBoundingClientRect();

        // SET MODAL STUDENT PROFILE IMAGE TO CLICKED/SELECTED IMAGE - THIS NEEDS TO BE DONE BEFORE ANIMATION STARTS SO PROPER IMAGE IS PRESET IN MODAL 
        // HERE WILL ALSO SET MODAL PROFILE DATA TO STUDENT'S JSON DATA
        modalStudentProfileImage.src = selectedStudentImage.src;



        // ============================================
        // disable scroll on body when modal is visible
        // ============================================
        bodyElement.classList.add('disable-scroll');

        // ===================================
        // === ENTER 'TO MODAL'TRANSITION  ===
        // ===================================
        
        //
        
        modalEnterTransitionTimeline.set(elementsToTransUp,{className: '+=hide_modal_items'})
        //  BRING MODAL BACKGROUND FORWARD
        modalEnterTransitionTimeline.to(modalBackground, 0.15, { className: '+=user-modal__background-cover--active' });

        // SHRINK OTHER STUDENT IMAGES IN GRID
        modalEnterTransitionTimeline.to(studentImageGridImages, 0.3, { className: '+=shrink_grid_images'}, '-=0.1');

        // MOVE CLONED STUDENT IMAGE INTO POSITION OVERLAYING MODAL PROFILE IMAGE
        modalEnterTransitionTimeline.to(studentImageClone, 0.7, { top: modalPosition.top, left: modalPosition.left, zIndex: 300 }, '-=0.25');
        modalEnterTransitionTimeline.to(studentImageClone, 0.7, { width: modalStudentProfileImage.width, height: modalStudentProfileImage.height }, '-=0.69');


        // BRING MODAL FORWARD AND OPAQUE7
        modalEnterTransitionTimeline.to(modalContainer, 0.2, { className: '+=user-modal__container--active' }, '-=0.2');


        // MODAL ITMES TRANSITION - IN THIS TRANSITION WE QUICKLY TRANSITION UP THE MAJORITY OF PROFILE ITEMS IN THE MODAL BEFORE SLOWLY TRANSITIONING UP THE LAST FEW PROFILE ITEMS; THIS GIVES THE USER A SENSE THAT THE ITEMS WERE ALL TRANSITIONED AT THE SAME SPEED. OTHERWISE, WHEN THE ITEMS ARE TRANSITIONED UP AT THE SAME SPEED THE TRANSITION APPEARS TOO FAST OR TOO SLOW TO THE USER

        // MODAL ITEMS TRANSITION PART 1 - FAST TRANSITION FOR MAJORITY OF ITEMS TO SPOOF LONGER TRANSITION ANIMATION
        for (var k = 0; k < elementsToTransUp.length; k++) {
            modalEnterTransitionTimeline.to(elementsToTransUp[k], 0.2, { className: '-=hide_modal_items' }, "-=0.13");
        }


        // REMOVE CLONED IMAGE USED IN TRANSTION 
        // NOTE: THIS CAUSES SLIGHT FLICKERING
        modalEnterTransitionTimeline.add(function() { studentImageClone.remove(); });

        //KILL TRANSITION TIMELINE
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

        // THIS FUNCTION NEEDS TO BE GENERALIZED FOR WHEN EXITING AFTER SWITCHING PROFILES IN MODAL FUNCTION exitModalTransition(IMG)

        var modalExitTransitionTimeline = new TimelineMax();
        var revImgClone = imgCloneOverlayImg(modalStudentProfileImage);
        var selectedStudentImage = studentImageGridImages[currentProfileID]
        var selectedStudentImagePosDim = selectedStudentImage.getBoundingClientRect();


        modalStudentProfileImage.src = '';

        // ============================================
        // re-enable scroll on body when modal is closed
        // ============================================
        bodyElement.classList.remove('disable-scroll');


        // =====================================
        // === START 'EXIT MODAL' TRANSITION ===
        // =====================================

        // REVERSE MODAL BACKGROUND
        modalExitTransitionTimeline.to(modalBackground, 0.4, { className:'-=user-modal__background-cover--active' });

        // FADE OUT/UP MODAL ITEMS AND CONTAINER 
        modalExitTransitionTimeline.to(elementsToTransUp, 0.35, { className:'+=hide_modal_items' }, '-=0.25');
        modalExitTransitionTimeline.to(modalContainer, 0.35, { className: '-=user-modal__container--active'}, '-=0.30');

        // RESIZE/FULLY FADE-IN/BRING FORWARD OTHER STUDENT IMAGES ON GRID
        modalExitTransitionTimeline.to(studentImageGridImages, 0.25, { className: '-=shrink_grid_images' }, '-=0.38');

        // TRANSITION CLONED IMAGE TO SELECTED STUDENT IMAGE'S CURRENT POSITION
        modalExitTransitionTimeline.to(revImgClone, 0.7, { top: selectedStudentImagePosDim.top, left: selectedStudentImagePosDim.left }, '-=0.42');
        modalExitTransitionTimeline.to(revImgClone, 0.7, { width: selectedStudentImagePosDim.width, height: selectedStudentImagePosDim.height }, '-=0.69');


        // REMOVE CLONE 
        // NOTE THIS MAY CAUSE FLICKERING
        modalExitTransitionTimeline.add(function() { revImgClone.remove(); });

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
          currentProfileID = studentImageGridImages.length;
      }


      selectedStudentImage = studentImageGridImages[currentProfileID]
      var modalNextProfileTransitionTimeline = new TimelineMax();
      var modalStudentProfileImagePos = modalStudentProfileImage.getBoundingClientRect();
      

      modalStudentProfileImage.src = selectedStudentImage.src;
    }

    function goToNext(){
      currentProfileID+=1;
      if(currentProfileID >= studentImageGridImages.length){
          currentProfileID = 0;
      }


      selectedStudentImage = studentImageGridImages[currentProfileID]
      var modalNextProfileTransitionTimeline = new TimelineMax();
      var modalStudentProfileImagePos = modalStudentProfileImage.getBoundingClientRect();
      

      modalStudentProfileImage.src = selectedStudentImage.src;
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

        // OVERLAY IMAGE (SHOULD CALCLUATE ZINDEX BASED ON ORIG IMAGE INDEX + N)
        imgClone.style.zIndex = "1000";
        imgClone.style.opacity = "1";

        // ADD CLONE TO HTML SO IT APPEARS!
        document.body.parentNode.appendChild(imgClone);

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
