## Paramour &middot; ![GitHub](https://img.shields.io/github/license/sevora/paramour.svg) ![GitHub repo size](https://img.shields.io/github/repo-size/sevora/paramour)
A matchmaking web-application that uses chemistry and compatibility as criteria for scoring.

## Overview
I wanted to create my own matchmaking site. First I decided for criteria by researching about how two people can go along with each other in a romantic setting. I came to the conclusion that chemistry and compatibility may be good way for scoring people on each other. 

Chemistry is computed by getting the hobbies, values, and intellect type based on Gardner's Theory of Multiple Intelligences while compatibility is based off of the Myer-Briggs Personality Test. The scores going from zero to a hundred percent are added together and averaged for the final score.

This application also doesn't require a database. That is achieved by using QR codes instead. Once a user finishes the survey, their QR image will be generated and must be saved in their device for use in the matchmaking algorithm. The image contains a compressed version of their answers and is decompressed server side.

## Installation
- `npm install` to install all the dependencies.
- `npm start` to start the node server.
- `npm run build` to run grunt tasks which would prepare the assets.
- `npm run dev` to do grunt tasks then start the server.

## Third-Party Dependencies
### Frontend
- [Barba.js](https://barba.js.org/) - Page transitions and single-page experience. Is ES6 and above.
- [GSAP](https://greensock.com/gsap/) - Greensock Animation Plugin. Allows building animations on javascript easily. 
Works in tandem with Barba.js
- [JQuery](https://jquery.com/) - Old DOM Tree Manipulator.
- [Selectize](https://selectize.github.io/selectize.js/) - HTML5 select element enhancement especially for multiple select.

## Development
### Frontend
#### Functionality
Due to the page transition with Barba.js, things have gotten quite complicated. 
To run scripts meant for certain pages only, they needed to be added on the views array 
found in [transition.js](./assets/js/components/transition.js) and those page scripts must 
be defined (for consistency) inside as direct children of the [javascript assets directory](./assets/js/). 
All the javascript files are bundled, therefore prevent naming inconsistencies and duplications among all the pages.

#### Design and UI/UX
The concept is heavily based from [Material Design](https://material.io/design/) to provide a comfortable and 
slick experience for mobile users. It is also responsive but is mobile-first to support mobile devices. All the stylesheets
are bundled, therefore prevent naming inconsistencies and duplications among all the pages.
