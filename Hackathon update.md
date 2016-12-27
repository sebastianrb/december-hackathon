### Hackathon update

<h3>Meticulousness (25 points)</h3>

<p>(Includes Design to UI Fidelity and Refinement)</p>

<p>One point will be deducted for each list item below, unless otherwise stated.</p>

<h4>Homepage</h4>

<ul>
<li>The UI design header is 118px tall while the webpage header is 104px tall. <em> ---- I have made changes on header <code>padding: 29px 15px 23px;</code> </em></li>
<li>The logos don't match; the "Bov" in the design has font weight of 500 while the web page has the same font-weight as 200. <em> --- I have added the font weight <pre>.header__title__main--bovBlue{
  color: #42bcda;
  font-weight: 500
}</pre></em></li>
<li>The words "Of Programming and Futuristic Engineering" also has the wrong font weight.</li>
<li>The photos on the webpage has a much different ratio from the 3:4 ration of the photos in the UI design.</li>
<li>The footer links on the web page needs text-decoration: none to remove the underline; the footer links in the UI design don't have underline. <em> --- I added text-decoration<pre>
nav a.footer__nav___list__link {
  color: #a2b7bc;
  -webkit-transition: all .2s;
  -moz-transition: all .2s;
  -o-transition: all .2s;
  -ms-transition: all .2s;
  transition: all .2s;
  font-weight: lighter;
  text-decoration: none;
}
</pre></em></li>
<li>The Load More button is much smaller on the web page. <em> --- changed width from 20% to 35% <pre>
button.load-more-container__button {
    background: #404b56;
    border: none;
    padding: 15px;
    /*width: 20%;*/
    width: 35%;
</pre></em></li>
<li>The font size for the students' names appear much smaller on the web page <em> --- Updated the font size from 13px to 14px <pre>.footer__authorsContainer-list {
  font-size: 14px; } .footer__nav__list{
  font-size: 14px;}</pre></li>
<li>The footer link "HOME" on the web page says "BOV ACADEMY HOME." <em> --- Changed to HOME </em> </li>
<li>The "Site developer by…" footer section is not vertically aligned. <em> --- Added one line but not sure whether it works. <pre>
.footer__authorsContainer-title {
  vertical-align: middle; } 
</pre></li>
</ul>

<h4>Modal</h4>

<ul>
<li>The height of the modal in the UI design is 826px, while the height of the HTML/CSS UI is 616px. The overall size of the modal is small on the webpage. Since I am in the holiday spirit, I won't penalize for every smaller dimension. Literally every element on the webpage modal is smaller than its corresponding element on the UI design.</li>
<li>The First Cohort section, the entire second row, is 184px on the UI design, while it is 196px on the web page.</li>
<li>The font size for content on the modal appears in smaller font than the same content on the UI design. For example, the font for the text under the student's name appears in 10px font on the site, but that same font appears in 12px on the UI design.</li>
<li>The texts on the modal that show 20% and 10% don't correspond to the width of the percent bars they represent. For example, one of the elements has "20%," but its corresponding percent bar appears to be the full width at 100%.</li>
<li>The height of the gray quotation box is considerably shorter on the web page than it is on the UI design.</li>
<li>The font weight for the font in quotes (Albert Einstein quote) is less than the corresponding font-weight in the UI design.</li>
<li>The green checkmark box/blue percent box on the UI design has equal height and width (a square with rounded edge) but on the web page the same element does not have equal height and width.</li>
<li>The open-in-new page icon is not vertically aligned with the link to which it belongs.</li>
<li>The student's name and career path should be vertically centered with the Evidential Degree insignia.</li>
<li>The Evidential Degree insignia is smaller than the size given.</li>
</ul>

<p>Design to UI Fidelity Score: -19</p>

<h4>Refinement/Good UX</h4>

<ul>
<li>+3 points for impressive animation: Although the animation has to be sped up and refined a touch, the animation on the web page looks and feels great, considerably better than I expected.</li>
<li>-1 point for no mouse over color change for links in the "Portfolio and Professional Profile" section. <em> --- I added the hover but I am not sure what's the right color to show when hover <pre>
.bio-info__link:hover {
  color: rgb(185, 194, 204);
}
</pre></em></li>
<li>-1 point for buggy UX: After the modal is closed the first time, every subsequent launch doesn't show the quote element under the photo. <em> --- I think Bram fixed it </em></li>
</ul>

<hr>

<h3>Well-Written Code (15 points)</h3>

<ul>
<li>-0.1 closing tags /&gt; not needed in HTML5, e.g.: <code>&lt;link rel="stylesheet" href="./styles/main.css" /&gt;</code> <em> --- done </em>
</li>
<li>-0.4 several 404, including .css files not found (check the dev. console). <em> --- those are animation files for test. I commented them but I have not deleted them. Just in case that you may need them. Otherwise, I think it is better to remove them in our reposive</em> </li>
<li>-0.5 Pollution of global scope (no IFEE) <em> --- No diea </em></li>
<li>-0.5 Lines missing semicolons at the end <em> --- Could not find them </em></li>
<li>-0.5 You are declaring functions within loops (line 12:modal.js), the anonymous function is better declared outside the function. <em> --- Leave this to Sam </em></li>
<li>-1 Indentation issues <em> --- done </em></li>
<li>-1 Code doesn't look clean and not 'use strict'; ("Code organization" guidelines from the Style Guide)</li>
<li>-0.5 More comments</li>
<li>-2 Run-time exception, closing modal? "modal.js:65 Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node."</li>
</ul>

<p><strong>Well-Written Code score</strong>: 15 - 7.5 = 8.5</p>

<h3>Technology and Process (2 points)</h3>

<p><strong>Technology and Process score</strong>: 2</p>

<h3>Bugs (10 points)</h3>

<ul>
<li>-1 Run-time exception closing modals (reported in well-written code).</li>
<li>-1 Images not loading.</li>
</ul>

<p><strong>Bugs score</strong>: 10 - 2 = 8</p>

<h3>Browser Compatibility (12 points)</h3>

<ul><li>-2 Modal text positioning is not OK in Safari</li></ul>

<p><strong>Browser Compatibility score</strong>: 12 - 2 = 10</p>

<h3>Responsiveness</h3>

<ul><li>4 Almost fully responsive, the modal is not fully responsive.</li></ul>

<p><strong>Responsiveness score</strong>: +4</p>

<p><strong>Score: 32.5/39 from Josep</strong></p>
      </div>