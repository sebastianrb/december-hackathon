function addClass(element, addedClass) {
  var classString = element.className; // returns the string of all the classes for myDiv
  var newClass = classString + " " + addedClass; // Adds the class "main__section" to the string (notice the leading space)
  element.className = newClass; // sets className to the new string
}

var images = document.querySelectorAll(".student-image-grid__image-cont");
var modalBackground = document.querySelector(".user-modal__background-cover");
var modalContainer = document.querySelector(".user-modal__container");
var modalPosition = modalContainer.getBoundingClientRect();
var cloneLeft = modalPosition.left.toString() + "px";

var i;
for(i = 0; i < images.length; i++) {
    images[i].addEventListener("click", function(e) {
       // scale to place
        var clone = scaleMove(e.target.parentNode);
        var image = clone.children;

        //get child elements
        var insidePicture = this.getElementsByClassName("student-image-grid__image-cont__picture")[0];
        // var insideImage = this.getElementsByClassName("student-image-grid__image-cont__image")[0];
        var insideImage =  image[0];


        //append classes
        addClass(modalBackground, "user-modal__background-cover--active");
        // addClass(modalContainer, "user-modal__container--active");
        addClass(insideImage, "student-image-grid__image-cont__image--active");

        // GSAP timeline code
        var modalTime = new TimelineLite();

        modalTime.to(clone, 0.5, {top:"3em", left: cloneLeft, width: "60em", height: "38.5em", transform: "translateX(-50%)"}).to(modalContainer, 0.2, {opacity: "1", zIndex: 500});

    });
}


// Brian Merriman's image div clone code:

function scaleMove(e){

    console.log(e);
    console.log(e.children[0]);
    //GET POSITION OF IMAGE CONT
    thisDim = e.getBoundingClientRect();
    console.log(thisDim);

    picDim = e.parentNode.getBoundingClientRect();
    console.log(picDim);

    clone = e.cloneNode(true);
    console.log(clone);

    clone.className="";

    //OVERLAY CLONE ON ORIGINAL IMAGE
    clone.style.position = "fixed";
    clone.width = thisDim.width;
    clone.style.top = (thisDim.top).toString() + "px";
    clone.style.left = (thisDim.left).toString() + "px";
    // clone.style.width = (picDim.width).toString() + 'px';
    // clone.style.height = (picDim.height).toString() + 'px';
    clone.style.zIndex = "400";

    e.parentNode.appendChild(clone);
    document.body.parentNode.appendChild(clone);
    clone.className = "student-image-grid__image-cont__picture--clone";

    return clone;
}
