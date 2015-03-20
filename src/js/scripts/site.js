$(document).ready(function(){

  $('.menu-mobile__reveal').click(function(){
    $('.menu-mobile').slideToggle();
  });

  $(".article-preview").click(function() {
    window.location = $(this).find("a").attr("href"); 
    return false;
  });

});
