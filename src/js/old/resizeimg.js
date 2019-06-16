const sharp = require('sharp');
const fs = require('fs');
const directorySRC = './src/assets/depotMedia';
const directoryDIST = './src/assets/media';
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');


//node js/resizeimg.js


//Cleaning the distination directory
fs.readdirSync(directoryDIST).forEach(file => {
   fs.unlink(`${directoryDIST}/${file}`, err => {
            if (err) throw err;
          });
    }); 

//Resizing images from the src directory to the the dist directory
    let sizes = [250,576,768,992,1200]

    fs.readdirSync(directorySRC).forEach(file => {
    
        sizes.forEach(function(size, index, array) {
    
            sharp(`${directorySRC}/${file}`)
            .resize(width= size) // width, height
            .toFile(`${directoryDIST}/${index}-${file}`);
    
        });
    
        }); 




imagemin([`${directoryDIST}/4-*`], `${directoryDIST}`, {
  use: [imageminWebp({quality: 50})]
}).then(() => {
  console.log('Webp Done!');
});
    
    
    
    
    
    
    

