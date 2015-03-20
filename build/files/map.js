function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(38.0070546,23.8270203),
    zoom:18,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);