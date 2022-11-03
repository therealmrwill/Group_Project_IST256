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


      //User Info 
      const userName = $("#username").val(currentAccount.username);
      const password = $("#password").val(currentAccount.password);

      const birthdayYr = $("#BirthdayYr").val(currentAccount.birthdayYr);
      const birthdayMo = $("#BirthdayMo").val(currentAccount.birthdayMo);
      const birthdayDay = $("#BirthdayDay").val(currentAccount.birthdayDay);

      //Location Info
      const address = $("#streetAddress").val(currentAccount.address);
      const city = $("#city").val(currentAccount.city);
      const state = $("#state").val(currentAccount.state);
      const postalCode = $("#postalCode").val(currentAccount.postalCode);
      const deliveryInstructions = $("#deliveryInstructions").val(currentAccount.deliveryInstructions);  
      
       
} 


function saveAccountData(){

  //User Info
  const username = $('#username')[0].value;
  const password = $('#password')[0].value;
  const birthdayYr = $("#BirthdayYr")[0].value;
  const birthdayMo = $("#BirthdayMo")[0].value;
  const birthdayDay = $("#BirthdayDay")[0].value;


  //Location Info
  const address = $("#streetAddress")[0].value;
  const city = $("#city")[0].value;
  const state = $("#state")[0].value;
  const deliveryInstructions = $("#deliveryInstructions")[0].value;
  const postalCode = $("#postalCode")[0].value;


    $.post("/setData", { username, password, address, city, state, birthdayYr, birthdayMo, birthdayDay, deliveryInstructions, postalCode }, loadAccountData);
}

  