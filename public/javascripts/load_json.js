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

function getInfo(){
    $.get("/getAccountInfo", loadAccountData);
}


function loadAccountData(accountInfo){
      const currentAccount = accountInfo[0];

      const userName = $("#username").val(currentAccount.userName);
      const password = $("#password").val(currentAccount.password);
      const address = $("#streetAddress").val(currentAccount.address);
      const city = $("#city").val(currentAccount.city);
      const state = $("#state").val(currentAccount.state);
      const birthdayYr = $("#BirthdayYr").val(currentAccount.birthdayYr);
      const birthdayMo = $("#BirthdayMo").val(currentAccount.birthdayMo);
      const birthdayDay = $("#BirthDay").val(currentAccount.birthdayDay);
      
    
} 


function saveAccountData(){
    const username = $('#updateUsername').value;
    const password = $('#updatePassword').value;
    const address = $("#streetAddress").value;
    const city = $("#city").value;
    const state = $("#state").value;
    const birthdayYr = $("#BirthdayYr").value;
    const birthdayMo = $("#BirthdayMo").value;
    const birthdayDay = $("#BirthDay").value;

    $.post("/setData", { username, password, address, city, state, birthdayYr, birthdayMo, birthdayDay }, loadAccountData);
}

  