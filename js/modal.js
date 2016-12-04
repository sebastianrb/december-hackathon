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
        //get child elements
        var insidePicture = this.getElementsByClassName("student-image-grid__image-cont__picture")[0];
        var insideImage = this.getElementsByClassName("student-image-grid__image-cont__image")[0];
        //append classes
        addClass(modalBackground, "user-modal__background-cover--active");
        addClass(modalContainer, "user-modal__container--active");
        addClass(insidePicture, "student-image-grid__image-cont__picture--active");
        addClass(insideImage, "student-image-grid__image-cont__image--active");
    });
}
