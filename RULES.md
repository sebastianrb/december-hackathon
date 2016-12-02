##December Hackathon Requirements and Rules

###Hackathon Rules

1. **Each team should have a Project Manager**
    * Project Manager Responsibilities:

        - Keep your team productive and on schedule

        - Ensure your teammate feels motivated and appreciated

        - Ensure your team adheres to the hackathon rules outlined below

        - Ensure your team project is delivered successfully and on time (Remember that late submissions are not accepted)

2. **Some teams have a mentor**
    * Mentor Responsibilities:

        - Ensure each mentee improves his or her web programming skills, especially in the areas where the mentee specifically asks the mentor for help

        - Motivate the each mentee and share any valuable tips and insights that can help them become better developers (make sure you do this)


3. **Don't copy any code from existing websites or frameworks. We will check your submission for code plagiarism.**

4. **Each teammate must contribute at least 30% of the work. If your team has just two students, each teammate must contribute at least 40% of the work.**

5. **No project is accepted after the deadline.**

6. **You will submit the project on GitHub; use one of the teammate's repo.**

7. **When you submit the project , you can't make changes to it until we review the project.**

8. **You can use Sass, if you and your teammate know Sass. If your teammate doesn't know Sass, you will be responsible for teaching your teammate enough Sass to build the project, or you can take full responsibility for the Sass/CSS aspect of the project, if your teammate agrees with the plan and you really want to use Sass.**

9. **Animation: We didn’t yet cover animation in any our courses, but the project includes a bit of animation. Since each team has three students, decide if one teammate should focus entirely on the animation while the other teammates focus on the UI layout and styling. The student who agrees to do the animation will likely have to research and practice to get the animation just right.**


###Project Requirements

1. **The website will be responsive, but full responsiveness isn’t mandatory during the hackathon, particularly since we have not given you the UI design for the tablet and mobile phone views. We have given you the UI design for just the desktop view. You won’t lose points if your final submission isn’t responsive, but you will get bonus 5 points (this is huge) if the site is responsive.**

2. **The website must work on the latest version of the three most popular browsers, whichever those browsers are; you can research this.**

3. **The website should adhere to standard HTML and CSS specifications, and it must be accessible. You can use a CSS-validator to ensure the markup doesn’t have errors.**

4. **The UI design shows four columns for the photos. On desktops, when the window is wide enough to accommodate four columns, we will show the four columns. But when the browser window is too narrow to show four columns, we will show two columns. Note that we will not show three columns. A couple of days after the hackathon, you will learn why we will show either two columns or four columns and never three columns.**

    * **On mobile phones, we may have to show a single column, but we prefer to show two columns. Decide if two columns look good enough on mobile phones. If we can get two columns to look good on mobile phones, let’s do two columns and never one column. But if two columns look two small and odd on mobile phones, let’s go with one column on mobile phones.**

    *   **Feel encouraged to look at any UI Frameworks, like Bootstrap and Skeleton for UI dev tips. Also, for this dynamic 4-column and 2-column layout, you may find the Isotope library1 helpful. While you can’t use isotope, you can learn from their code how they accomplished the dynamic layouts.**

5. **You need not build a drop-down menu for the icon with the dots shown at the top right of the UI, across from the logo.**

6. **When the user hovers over any of the photos, for now, simply change the opacity to 0.7. A few days after the hackathon, you will learn that each photo is an animated GIF that shows 4 sequential photos and stops on the last photo. Essentially, you will simply play (then stop, not loop) the animated GIF on mouse over. But you don’t have to worry with this for the hackathon. Simply change the opacity a bit to indicate to the user that he has hovered over the photo.**

7. **When the user clicks the photo, we will show the modal window. You can see the modal UI design in the assets folder.**

    1. The Modal will use this animation: http://tympanus.net/Development/ImageGridEffects/index2.html

    2. Notice the way the transition is smooth and uses an easing animation. Use whatever technology is necessary to get you to complete transition animation.

    3. Notice the content to the right of the photo fades in and ever so delicately slides up with a staggered animation (that is, one part of the content slides in after the next) as it arrives on the screen. Don’t mess this up. While this bit of animation is straightforward per single item, you have to tweak it to get it just right for the sequential move to look smooth and lovely. If the animation is ugly or jerky, I will definitely notice. If you want to win, this sort of timing has to be right. The Student website homepage is quite easy to create, but the modal and small refinements (and the creativity of the photos; more on this soon) will help to make the Bov Academy student website the best one of its kind. You will make this possible, but you have to dig deep and be meticulous. Each of the teams developing the student website has some of our best students, so we expect the best from you.

    4. The Career Path Progress section will use a formula to calculate the percentage of each progress bar. You will get the formula after the hackathon, if your team wins. For now, use percentage to scale the process bars. The tiny progress bar should use percentage for its width so that we can easily set it to the right percentage, depending on the student’s current progress in the program. When the progress bar width is 85% or more, it will turn the green color you see in the first progress bar on the modal UI design. When it is less than 85%, it will be blue. When it is 100%, the checkmark will be displayed, replacing the “%” text.

8. **Intro Animation: Skip this for now. After the hackathon, I will explain to the winning team how the photos will be revealed when the page loads.**

9. **Create a JSON file that represents all the data for the site. A few days after the hackathon, we will populate the entire site, including the photos, with the content from the single JSON file.**

