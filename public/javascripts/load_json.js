function updateImage(data){
    for(i=0; i<data.length; i++){
        const imageInfo = data[i];
        const img = $("<img/>").attr("src", "/images/"+imageInfo.image);
        const div = $("<div><div>".append(img));
        $("#images").append(div);
    }
}

$(document).ready(function (){
    $.get("data/images.json", updatesImage);
})