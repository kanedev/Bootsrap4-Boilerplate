
 //import '../assets/scss/main.scss';
//  import '../assets/scss/app.scss';


import {Car} from './Car'

// const FontFaceObserver =  require('fontfaceobserver');


// import * as yourModuleName from 'module-name';
require('lazysizes');
// import _ from 'lodash'



// Observation du chargement de la font "Alien"
// const alienObserver = new FontFaceObserver('alien');

// alienObserver.load().then(function () {
//   console.log('Alien font has loaded');
// });
//-------------------------
// The demo site uses two different fonts, so you need to use Promise.all() to wait until both fonts have loaded.

//     Add this promise to your script, right below the FontFaceObservers that you just declared:

// Promise.all([
//   pacificoObserver.load(),
//   robotoObserver.load()
// ]).then(function(){
//   /* Do things */
// });
//--------------------------







// console.log(
//   _.join(['Another', 'module', 'loaded!'], ' ')
// );




const car:Car = new Car();
car.go();

document.getElementById('button').addEventListener('click', ()=>{
  console.log('==============');
  console.log('button clicked');
  console.log('==============');

 

// import('lodash').then((_)=>{
//   console.log(
//     _.join(['Yes', ' I am : ', ' importing loadash dynamicly !'], ' ')
//   );

// })
  

import(/* webpackChunkName: "print" */ './print').then(module => {
      const print = module.default;
  
       print();
     });


})



const cardImage = document.querySelector('.card-image');
const cardTitle = document.querySelector('.card-title');
const cardDesc = document.querySelector('.card-description');


function createImage() {
  const img = new Image();
  img.classList.add("image");
  img.setAttribute('alt', 'A cloud day at a mountain base');
  //img.setAttribute('src', 'https://images.unsplash.com/photo-1516646255117-f9f933680173?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=dc874984018a4253ba7d2a3c53387135');
  cardImage.appendChild(img);
}



const renderCard = () => {
  // cardTitle.textContent = 'Card Title Yo!';
 
  cardTitle.classList.remove('loading');
  cardDesc.classList.remove('loading');
  cardImage.classList.remove('loading');
  createImage();
  cardTitle.textContent = 'Card Title Yo!';
  cardDesc.textContent = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero dicta repellat quibusdam assumenda at distinctio similique eos? Officiis voluptatem accusamus, id odit, quos eaque nemo, dicta quidem eum eligendi veritatis.';

};

 

setTimeout(() => {
  renderCard();
}, 5000);

// window.addEventListener('load', () => {
//   renderCard();
// });