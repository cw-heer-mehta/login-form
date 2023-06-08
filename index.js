const usernameInput = document.getElementById("username-input");

$("#username-input").on("change", () => {
    var i = $("#username-input").val();
    validateUsername(i);  
})


$("#email-input").on("change", () => {
    var i = $("#email-input").val();
    validateEmail(i);
})


$("#password-input").on("change", () => {
    var i = $("#password-input").val();
    validatePassword(i);
})









$("#password-show-hide").click(() => {
    const typeValues = ["text", "password"]
    const currentValue = $("#password-input").attr("type");
    const index = (currentValue != "password");
    $("#password-input").attr("type", typeValues[Number(index)]);

    const buttonText = ["Show Password", "Hide Password"];
    $("#password-show-hide").text(buttonText[Number(currentValue == "password")]);
})


function validateUsername(val) {
    if(!val || val.length < 3 || val.length > 25){
        $("#username-error").text("Please Enter a valid username that is 3 to 25 characters long");
        return;
    }
    else{
        $("#username-error").text("");
    }
}

function validateEmail(val) {
    const emailFormat = /[0-9a-zA-Z! # $ % & ' * + - / = ? ^ _ \{ | \} \.{0,1}]@[a-z0-9-{0,1}\.{0,1}].[a-z0-9]/g;

    const isValid = val.match(emailFormat) ? val.match(emailFormat).length  == 1 : false;

    if(!isValid){
        $("#email-error").text("Please Enter a valid email address");
        return;
    }
    else{
        $("#email-error").text("");
    }
}

function validatePassword(val){
    const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    // console.log(passwordFormat.test(val));
    if(!passwordFormat.test(val)){
        $("#password-error").text("The password should contain 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character. Please check if the password is valid");
        return;
    }
    else{
        $("#password-error").text("");
        validateConfirmPassword();
    }
}

function validateConfirmPassword(){
    const password = $("#password-input").val();
    const confirmPassword = $("#c-password-input").val();

    if(confirmPassword != password){
        $("#confirm-password-error").text("Confirm Password should match the password entered");
        return;
    }
    else{
        $("#confirm-password-error").text("");
    }
}