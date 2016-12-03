$(document).ready(function(){
    $('.parallax').parallax();
});

function addClass(element, addedClass) {
  var classString = element.className; // returns the string of all the classes for myDiv
  var newClass = classString + " " + addedClass; // Adds the class "main__section" to the string (notice the leading space)
  element.className = newClass; // sets className to the new string
}


document.getElementById("animate-button").addEventListener("click", function(event) {
   //get elements to animate
    var paragraph = document.querySelector(".section__p");
    var header = document.querySelector(".section__h3");
    //add classes
    header.className = "section__h3";
    paragraph.className = "section__p";
    addClass(header, "fade-down");
    addClass(paragraph, "fade-up");
    //do crazy things with the buttons!
    addClass(this, "scale-out");
});

document.getElementById("un-animate-button").addEventListener("click", function(event) {
   //get elements to animate
    var paragraph = document.querySelector(".section__p");
    var header = document.querySelector(".section__h3");
    //remove animation classes classes
    header.className = "section__h3";
    paragraph.className = "section__p";
    addClass(header, "fade-out");
    addClass(paragraph, "fade-out");
});
