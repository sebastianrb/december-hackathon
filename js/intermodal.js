var prev = document.getElementById('intermodal--prev');
var next = document.getElementById('intermodal--next');

prev.addEventListener('click', goToPrev);
next.addEventListener('click', goToNext);

function goToPrev(){
  console.log('go to previous');
}

function goToNext(){
  console.log('go to next');
}
