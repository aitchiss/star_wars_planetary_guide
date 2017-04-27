# star_wars_planetary_guide

This web application pulls data from the Star Wars API (http://swapi.co/api/planets/) and displays it in a table. 

### To run the app

- download this repo and run "npm install" in the main directory
- run the command "npm start" in the main directory
- go to http://localhost:3000/

All script files have been bundled using Webpack into bundle.js

### Assumptions made

The current version of the app assumes:

- That the API will remain in its current format, but additional pages may be added.
- That the column title "populations" in the initial design was a typo, and therefore I have omitted the final 's'
- That planets for which every column's data is 'unknown' should not be rendered to the screen (only one such instance currently spotted in API)
- That a hover colour is desirable for the 'calls to action' on the page. I have added this, but it can be removed or amended easily, according to end user preferences
- That an alternative use of the colour scheme and an alternative layout for smaller screens is permissable, in order to optimise the user experience for those browsing on smaller tablets or mobile.

### Other notes

- Being currently unfamiliar with testing suites that can be used for asynchronous activities, there are a limited number of tests in the project. Given the time constraints, I was unable to conduct enough research to be able to take a TDD approach to asynchronous elements. However, all aspects were fully tested in the browser, and I look forward to taking more time to explore such testing options.
