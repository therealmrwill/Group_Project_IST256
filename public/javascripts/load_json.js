function updateImage(data){
    for(i=0; i<data.length; i++){
        const imageInfo = data[i];
        const span = $("<p id='prebuiltSandwiches'>").text(imageInfo.title);
        const img = $("<img/ id='prebuiltSandwiches'>").attr("src", "/images/"+imageInfo.image);
        const div = $("<div></div>").append(img).append(span);
        $("#imageBuilder").append(div);
    }
}

$(document).ready(function (){
    $.get("../data/prebuiltSubs.json", updateImage);
})


$(document).ready(function(){
    $("#searchItem").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#imageBuilder div").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

  