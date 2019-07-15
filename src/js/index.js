 var $ = require('jquery');
 import 'popper';

 import 'bootstrap/dist/js/bootstrap.min.js'


// // include through webpack.ProvidePlugin with exports-loader
// import 'bootstrap/js/dist/util'
//  import 'bootstrap/js/dist/carousel'
//  import 'bootstrap/js/dist/dropdown'
//  import 'bootstrap/js/dist/tab'

// import "exports-loader?Alert!bootstrap/js/dist/alert"
// import "exports-loader?Button!bootstrap/js/dist/button"
// import "exports-loader?Collapse!bootstrap/js/dist/collapse"
// import "exports-loader?Modal!bootstrap/js/dist/modal"
// import "exports-loader?Popover!bootstrap/js/dist/popover"
// import "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy"
//  import "exports-loader?Tab!bootstrap/js/dist/tab"
//  import "exports-loader?Tooltip!bootstrap/js/dist/tooltip"

//import 'bootstrap/js/dist/modal'
// import 'bootstrap/js/dist/tooltip'

console.log('Getting ready...');

$(function() {
  console.log('Ready!');
});

jQuery(document).ready(function() {
	$('.carousel').carousel({
    	pause: "false",
    	interval: 7000
	});
   }); 
