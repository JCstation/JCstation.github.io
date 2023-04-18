/**!
 * lg-fullscreen.js | 1.1.0 | February 23rd 2019
 * http://sachinchoolur.github.io/lg-fullscreen.js
 * Copyright (c) 2016 Sachin N; 
 * @license GPLv3 
 */
const navBtn = document.getElementById('nav-btn');
const navMenu = document.getElementById('nav-menu');

navBtn.addEventListener('click', function() {
  if (navMenu.style.display === 'none') {
    navMenu.style.display = 'block';
  } else {
    navMenu.style.display = 'none';
  }
});

