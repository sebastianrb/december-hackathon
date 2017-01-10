(function() {

  var studentImageGrid = document.querySelector('.student-image-grid');
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
  var prevPreviewPanel = document.querySelector(".intermodal__profile-preview--prev");
  var nextPreviewPanel = document.querySelector(".intermodal__profile-preview--next");
  var prevPreviewPanelImage = document.querySelector(".intermodal__profile-preview--prev img");
  var nextPreviewPanelImage = document.querySelector(".intermodal__profile-preview--next img");
  var currentProfileID = null;
  var studentImageGridImages;

  //*********************************//
  //        EVENT LISTENERS          //
  //*********************************//

  // ADD EVENT LISTENER TO STUDENT IMAGE GRID
  studentImageGrid.addEventListener('click', openModal);
  modalExitButton.addEventListener('click', closeModal);

  // EVENT LISTENERS FOR INTER-MODAL NAVIGATION
  prev.addEventListener('click', goToPrev);
  next.addEventListener('click', goToNext);
  prev.addEventListener('mouseover', previewPrevProfile);
  next.addEventListener('mouseover', previewNextProfile);
  prev.addEventListener('mouseout', closePreviewPrevProfile);
  next.addEventListener('mouseout', closePreviewNextProfile);

  //*********************************//
  //        EVENT HANDLERS           //
  //*********************************//

  // BEGIN MODAL TRANSITION FUNCTION
  function openModal(e) {

    var selectedStudentImage = e.target;
    var studentImagesBesidesClicked = [];
    var modalEnterTransitionTimeline = new TimelineMax();
    var studentImageClone = imgCloneOverlayImg(selectedStudentImage);
    var modalImagePosition;
    var i;

    studentImageGridImages = Array.prototype.slice.call(document.querySelectorAll(".student-image-grid__image-cont__image"));
    currentProfileID = studentImageGridImages.indexOf(selectedStudentImage);

    // SET MODAL STUDENT PROFILE IMAGE TO CLICKED/SELECTED IMAGE - THIS NEEDS TO BE DONE BEFORE ANIMATION STARTS SO PROPER IMAGE IS PRESET IN MODAL
    // HERE WILL ALSO SET MODAL PROFILE DATA TO STUDENT'S JSON DATA
    modalStudentProfileImage.src = selectedStudentImage.src;


    //ASSIGN IMAGES IN THE PROFILE PREVIEW PANELS
    setPreviewNextImage(currentProfileID);
    setPreviewPrevImage(currentProfileID);


    // ===================================
    // === ENTER 'TO MODAL'TRANSITION  ===
    // ===================================

    modalEnterTransitionTimeline.set(elementsToTransUp, { className: '+=hide_modal_items' });
    //  BRING MODAL BACKGROUND FORWARD
    modalEnterTransitionTimeline.to(modalBackground, 0.4, { className: '+=user-modal__background-cover--active' });

    // SHRINK OTHER STUDENT IMAGES IN GRID
    modalEnterTransitionTimeline.to(studentImageGridImages, 0.3, { className: '+=shrink_grid_images' }, '-=0.1');

    modalImagePosition = modalStudentProfileImage.getBoundingClientRect();
    // MOVE CLONED STUDENT IMAGE INTO POSITION OVERLAYING MODAL PROFILE IMAGE
    modalEnterTransitionTimeline.to(studentImageClone, 0.7, { top: modalImagePosition.top, left: modalImagePosition.left, ease: Power2.easeInOutExpo }, '-=0.25');
    modalEnterTransitionTimeline.to(studentImageClone, 0.7, { width: modalStudentProfileImage.width, height: modalStudentProfileImage.height }, '-=0.69');


    // BRING MODAL FORWARD AND OPAQUE
    modalEnterTransitionTimeline.to(modalContainer, 0.2, { className: '+=user-modal__container--active' }, '-=0.23');


    // MODAL ITMES TRANSITION - IN THIS TRANSITION WE QUICKLY TRANSITION UP THE MAJORITY OF PROFILE ITEMS IN THE MODAL BEFORE SLOWLY TRANSITIONING UP THE LAST FEW PROFILE ITEMS; THIS GIVES THE USER A SENSE THAT THE ITEMS WERE ALL TRANSITIONED AT THE SAME SPEED. OTHERWISE, WHEN THE ITEMS ARE TRANSITIONED UP AT THE SAME SPEED THE TRANSITION APPEARS TOO FAST OR TOO SLOW TO THE USER

    // MODAL ITEMS TRANSITION PART 1 - FAST TRANSITION FOR MAJORITY OF ITEMS TO SPOOF LONGER TRANSITION ANIMATION

    for (i = 0; i < elementsToTransUp.length; i++) {
      modalEnterTransitionTimeline.to(elementsToTransUp[i], 0.3, { className: '-=hide_modal_items' }, "-=0.25");
    }


    // REMOVE CLONED IMAGE USED IN TRANSTION
    // NOTE: THIS CAUSES SLIGHT FLICKERING
    modalEnterTransitionTimeline.add(function() { studentImageClone.remove(); });

    //adjust body scrolling toggle
    modalEnterTransitionTimeline.add(function() { bodyElement.classList.add('disable-scroll'); });

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

  function closeModal(e) {

    var modalExitTransitionTimeline = new TimelineMax();
    var revImgClone = imgCloneOverlayImg(modalStudentProfileImage);
    var selectedStudentImage = studentImageGridImages[currentProfileID];
    var selectedStudentImagePosDim = selectedStudentImage.getBoundingClientRect();

    modalStudentProfileImage.src = '';
    // revImgClone.style.objectPosition = '50% 50%';
    mainElement.appendChild(revImgClone);

    selectedStudentImage.classList.remove('shrink_grid_images');
    selectedStudentImage.classList.add('currentProfile_grid_image');

    // SCROLL TO POSITION OF CURRENT IMAGE ON GRID
    window.scrollTo(0, (selectedStudentImagePosDim.top + window.pageYOffset - 250));

    // RECALCULATE IMAGE POSITION AFTER SCROLL
    selectedStudentImagePosDim = selectedStudentImage.getBoundingClientRect();


    // =====================================
    // === START 'EXIT MODAL' TRANSITION ===
    // =====================================


    // REVERSE MODAL BACKGROUND

    // FADE OUT/UP MODAL ITEMS AND CONTAINER
    modalExitTransitionTimeline.to(elementsToTransUp, 0.25, { className: '+=hide_modal_items' }, '-=0.25');
    modalExitTransitionTimeline.to(modalContainer, 0.25, { className: '-=user-modal__container--active' }, '-=0.30');

    modalExitTransitionTimeline.to(modalBackground, 0.4, { className: '-=user-modal__background-cover--active' });

    // RESIZE/FULLY FADE-IN/BRING FORWARD OTHER STUDENT IMAGES ON GRID
    modalExitTransitionTimeline.to(studentImageGridImages, 0.25, { className: '-=shrink_grid_images' }, '-=0.48');

    // TRANSITION CLONED IMAGE TO SELECTED STUDENT IMAGE'S CURRENT POSITION

    //******************************************************************************************************//
    modalExitTransitionTimeline.to(revImgClone, 0.8, { objectPosition: 'left', top: selectedStudentImagePosDim.top, left: selectedStudentImagePosDim.left, ease: Back.easeOut, }, '-=0.25');
    modalExitTransitionTimeline.to(revImgClone, 0.8, { width: selectedStudentImagePosDim.width, height: selectedStudentImagePosDim.height }, '-=0.71');


    // REMOVE CLONE
    // NOTE THIS MAY CAUSE FLICKERING
    modalExitTransitionTimeline.to(selectedStudentImage, 0.1, { className: '-=currentProfile_grid_image' });
    modalExitTransitionTimeline.add(function() { revImgClone.remove(); });

    // // RE-ENABLE BODY SCROLL AFTER TRANSITION IS COMPLETE
    modalExitTransitionTimeline.add(function() { bodyElement.classList.remove('disable-scroll'); });

    // RESET PROFILE ID
    currentProfileID = null;

    // KILL EXIT MODAL TIMELINE
    modalExitTransitionTimeline = null;

    // ==================================
    // === END 'EXIT MODAL TRANSTION' ===
    // ==================================

  } // END OF CLOSE MODAL FUNCTION

  //****************************************//
  //  FUNCTIONS TO NAVIGATE BETWEEN MODALS //
  //***************************************//

  function goToPrev() {

    currentProfileID -= 1;

    if (currentProfileID < 0) {
      currentProfileID = studentImageGridImages.length - 1;
    }

    //SMOTTH TRANSITION PREVIEW PANEL IMAGES
    var changePreviewPrevImage = new TimelineMax();
    changePreviewPrevImage.to(prevPreviewPanelImage, 0.3, {
      opacity: 0.3
    });
    changePreviewPrevImage.to(prevPreviewPanelImage, 0.3, {
      opacity: 1
    }, "-=.2");

    //ASSIGN IMAGES IN THE PROFILE PREVIEW PANELS
    setPreviewNextImage(currentProfileID);
    setPreviewPrevImage(currentProfileID);

    _switchModal(currentProfileID);

  }

  function goToNext() {

    currentProfileID += 1;

    if (currentProfileID >= studentImageGridImages.length) {
      currentProfileID = 0;
    }

    //SMOTTH TRANSITION PREVIEW PANEL IMAGES
    var changePreviewNextImage = new TimelineMax();
    changePreviewNextImage.to(nextPreviewPanelImage, 0.2, {
      opacity: 0.3
    });
    changePreviewNextImage.to(nextPreviewPanelImage, 0.2, {
      opacity: 1
    }, "-=.1");

    //ASSIGN IMAGES IN THE PROFILE PREVIEW PANELS
    setPreviewNextImage(currentProfileID);
    setPreviewPrevImage(currentProfileID);

    _switchModal(currentProfileID);

  }

  //***********************************//
  // SWITCH MODALS ANIMATION FUNCTION  //
  //**********************************//

  function _switchModal(profileID, cropAmt) {
    var selectedStudentImage = studentImageGridImages[profileID];
    var modalNextProfileTransitionTimeline = new TimelineMax();
    var modalStudentProfileImagePos = modalStudentProfileImage.getBoundingClientRect();
    var imgClone = selectedStudentImage.cloneNode(true);

    // STYLE THE CLONE
    imgClone.className = "";
    imgClone.style.position = "fixed";
    imgClone.style.width = modalStudentProfileImagePos.width + 'px';
    imgClone.style.height = modalStudentProfileImagePos.height + 'px';
    imgClone.style.top = "0";
    imgClone.style.left = (modalStudentProfileImagePos.width * -1.5) + 'px';
    imgClone.style.objectFit = "cover";
    imgClone.style.zIndex = 500;
    imgClone.style.opacity = 0;

    // APPEND THE CLONE TO THE MODAL IMAGE CONTAINER
    modalStudentProfileImageBlock.appendChild(imgClone);


    // TRANSITION ANIMATION TIMELINE
    modalNextProfileTransitionTimeline.to(elementsToTransUp, 0.35, { className: '+=hide_modal_items' });
    modalNextProfileTransitionTimeline.to(imgClone, 0.3, { left: 0, opacity: 1 });
    modalNextProfileTransitionTimeline.to(elementsToTransUp, 0.35, { className: '-=hide_modal_items' }, '-=0.25');
    modalNextProfileTransitionTimeline.add(function() {
      imgClone.remove();
      modalStudentProfileImage.src = selectedStudentImage.src;
    });
  }

  // ********************************** //
  //         ARROW HOVER FUNCTIONS      //
  //       used to show preview of next/previous  //
  //       profiles when user hovers over arrows  //
  // ********************************** //

  function previewNextProfile(event) {
      nextPreviewPanel.classList.remove("intermodal__profile-preview--next");
      nextPreviewPanel.classList.add("intermodal__profile-preview--next--active");
  }

  function previewPrevProfile(event) {
      prevPreviewPanel.classList.remove("intermodal__profile-preview--prev");
      prevPreviewPanel.classList.add("intermodal__profile-preview--prev--active");
  }

  function closePreviewNextProfile(event) {
      nextPreviewPanel.classList.remove("intermodal__profile-preview--next--active");
      nextPreviewPanel.classList.add("intermodal__profile-preview--next");
  }

  function closePreviewPrevProfile(event) {
      prevPreviewPanel.classList.remove("intermodal__profile-preview--prev--active");
      prevPreviewPanel.classList.add("intermodal__profile-preview--prev");
  }


  // ********************************** //
  //         IMAGE CLONE FUNCTION       //
  //       used to clone image for      //
  //     transition from grid to modal  //
  // ********************************** //

  function imgCloneOverlayImg(imgToClone, cropAmt) {

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
    modalBackground.appendChild(imgClone);

    return imgClone;

  }

  function setPreviewNextImage(ID) {
      //handle next scenarios: currentProfileID + 1 is greather than studentImageGridImages.length - 1
      if((ID + 1) <= (studentImageGridImages.length - 1)) {
        nextPreviewPanelImage.src = studentImageGridImages[ID + 1].src;
      } else {
        nextPreviewPanelImage.src = studentImageGridImages[0].src;
    }
  }

  function setPreviewPrevImage(ID) {
      //handle prev scenarios: currentProfileID - 1 is less than 0
      if((ID - 1) >= 0) {
        prevPreviewPanelImage.src = studentImageGridImages[ID - 1].src;
      } else {
        prevPreviewPanelImage.src = studentImageGridImages[studentImageGridImages.length - 1].src;
      }
  }

})();

