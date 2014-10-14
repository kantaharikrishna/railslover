//= require jquery
//= require jquery_ujs
//= require anythingslider
//= require bootstrap
//= require jquery.purr
$(document).ready(function() {
$('img')
  .error(function() {
    $(this).attr("src", "/assets/no-image.gif");
	$(this).attr("class", "img-rounded");
	$(this).attr("width", 13);
  });
  
  
});