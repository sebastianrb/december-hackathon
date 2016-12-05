function addClass(element, addedClass) {
  var classString = element.className; // returns the string of all the classes for myDiv
  var newClass = classString + " " + addedClass; // Adds the class "main__section" to the string (notice the leading space)
  element.className = newClass; // sets className to the new string
}

var images = document.querySelectorAll(".student-image-grid__image-cont");
var modalBackground = document.querySelector(".user-modal__background-cover");

var i;
for (i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function(e) {

    var modalContainer = document.querySelector(".user-modal__container");
    var modalPosition = modalContainer.getBoundingClientRect();
    var cloneLeft = modalPosition.left.toString() + "px";
    // get the quote box
    var modalQuoteBox = modalContainer.querySelector('.user-modal__photo-block__quote');

    // scale to place
    var clone = scaleMove(e.target.parentNode);
    var image = clone.children;

    //get child elements
    var insidePicture = this.getElementsByClassName("student-image-grid__image-cont__picture")[0];
    // var insideImage = this.getElementsByClassName("student-image-grid__image-cont__image")[0];
    var insideImage = image[0];


    //append classes
    addClass(modalBackground, "user-modal__background-cover--active");
    // addClass(modalContainer, "user-modal__container--active");
    addClass(insideImage, "student-image-grid__image-cont__image--active");

    // GSAP timeline code
    var modalTime = new TimelineLite();

    modalTime.to(clone, 0.7, { top: "3em", left: cloneLeft})
    modalTime.to(clone,0.7,{ clonewidth: "60em", height: "38.5em"}, '-=0.69')
    modalTime.to(modalContainer, 0.2, { opacity: "1", zIndex: 500 })
    modalTime.from(modalQuoteBox, 0.5, {bottom: "-12em"});

        var elementsToTransUp = document.querySelectorAll('.user-modal__info-block__header, .student-bio-text, .bio-info__section-heading, .bio-info__list, .bio-info__section-heading, .career-path__list li, .career-path-update__span');

        for(var i = 0; i < elementsToTransUp.length; i++){
            modalTime.to(elementsToTransUp[i], 0.25, { opacity: "1", y: -30, zIndex: 500 } , "-=0.1")
        }
  });
}


// Brian Merriman's image div clone code:

function scaleMove(e) {

  console.log(e);
  console.log(e.children[0]);
  //GET POSITION OF IMAGE CONT
  thisDim = e.getBoundingClientRect();
  console.log(thisDim);

  picDim = e.parentNode.getBoundingClientRect();
  console.log(picDim);

  clone = e.cloneNode(true);
  console.log(clone);

  clone.className = "";

  //OVERLAY CLONE ON ORIGINAL IMAGE
  clone.style.position = "fixed";
  clone.width = thisDim.width;
  clone.style.top = (thisDim.top).toString() + "px";
  clone.style.left = (thisDim.left).toString() + "px";
  clone.style.width = (picDim.width).toString() + 'px';
  clone.style.height = (picDim.height).toString() + 'px';
  clone.style.zIndex = "400";

  e.parentNode.appendChild(clone);
  document.body.parentNode.appendChild(clone);
  clone.className = "student-image-grid__image-cont__picture--clone";

  return clone;
}

