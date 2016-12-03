function addClass(element, addedClass) {
  var classString = element.className; // returns the string of all the classes for myDiv
  var newClass = classString + " " + addedClass; // Adds the class "main__section" to the string (notice the leading space)
  element.className = newClass; // sets className to the new string
}


document.querySelectorAll("grid-image-container").addEventListener("click", function(event) {
   //get elements to animate

});

// document.getElementById("un-animate-button").addEventListener("click", function(event) {
//    //get elements to animate
// });
