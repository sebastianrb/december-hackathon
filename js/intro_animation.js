var tL = new TimelineLite();

var body = document.body;
var header = document.querySelectorAll('header.load1')[0];
var mainHeader = document.querySelectorAll('.load2')[0];
var imageGrid = document.querySelectorAll('.load3')[0];
var footer = document.querySelectorAll('.load4')[0];

tL.to(body,0.8,{opacity:'1.0', ease: Strong.easeIn});
tL.to(header,1,{opacity:'1.0', ease: Strong.easeIn}, '-=.2');
tL.to(mainHeader,1,{opacity:'1.0', ease: Strong.easeIn},'-=.1');

  
tL.to(imageGrid,1,{opacity:'1.0', ease: Strong.easeIn}, '-=.1');
tL.to(footer,1,{opacity:'1.0', ease: Strong.easeIn}, '-=.4');

