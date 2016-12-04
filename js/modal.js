function addClass(element, addedClass) {
  var classString = element.className; // returns the string of all the classes for myDiv
  var newClass = classString + " " + addedClass; // Adds the class "main__section" to the string (notice the leading space)
  element.className = newClass; // sets className to the new string
}

var images = document.querySelectorAll(".student-image-grid__image-cont");
var modalBackground = document.querySelector(".user-modal__background-cover");
var modalContainer = document.querySelector(".user-modal__container");

var i;
for(i = 0; i < images.length; i++) {
    images[i].addEventListener("click", function(e) {
       // scale to place
        var clone = scaleMove(event.target.parentNode);
        var image = clone.children;

        //get child elements
        var insidePicture = this.getElementsByClassName("student-image-grid__image-cont__picture")[0];
        // var insideImage = this.getElementsByClassName("student-image-grid__image-cont__image")[0];
        var insideImage =  image[0];


        //append classes
        addClass(modalBackground, "user-modal__background-cover--active");
        addClass(modalContainer, "user-modal__container--active");
        addClass(clone, "student-image-grid__image-cont__picture--active");
        addClass(insideImage, "student-image-grid__image-cont__image--active");
        // clone.setAttribute('style', 'top: 3em; left: 50%; position: fixed; z-index: 400;');

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
    // clone.style.top = (thisDim.top).toString() + "px";
    // clone.style.right = (thisDim.right).toString() + "px";
    // clone.style.width = (picDim.width).toString() + 'px';
    // clone.style.height = (picDim.height).toString() + 'px';
    clone.style.zIndex = "400";

    e.parentNode.appendChild(clone);
    document.body.parentNode.appendChild(clone);
    clone.className = "student-image-grid__image-cont__picture--clone";

    return clone;
}
