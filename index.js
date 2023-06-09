let validUsername = false;
let validEmail = false;
let validPassword = false;
let validCPassword = false;
let buttonEnabled = false;

const usernameInput = document.getElementById("username-input");


//FORM
$("#username-input").on("input", () => {
    var i = $("#username-input").val();
    validateUsername(i);
})


$("#email-input").on("input", () => {
    var i = $("#email-input").val();
    validateEmail(i);
})


$("#password-input").on("input", () => {
    var i = $("#password-input").val();
    validatePassword(i);
})

$("#c-password-input").on("input", () => {
    validateConfirmPassword(true);
})


$("#password-show-hide").click(() => {
    const typeValues = ["text", "password"]
    const currentValue = $("#password-input").attr("type");
    const index = (currentValue != "password");
    $("#password-input").attr("type", typeValues[Number(index)]);

    const buttonClass = ["fa-regular fa-eye", "fa-regular fa-eye-slash"];
    $("#password-show-hide").attr("class", buttonClass[Number(currentValue == "password")]);
})


$("#c-password-show-hide").click(() => {
    const typeValues = ["text", "password"]
    const currentValue = $("#c-password-input").attr("type");
    const index = (currentValue != "password");
    $("#c-password-input").attr("type", typeValues[Number(index)]);

    const buttonClass = ["fa-regular fa-eye", "fa-regular fa-eye-slash"];
    $("#c-password-show-hide").attr("class", buttonClass[Number(currentValue == "password")]);
})


function validateUsername(val) {
    if (!val || val.length < 3 || val.length > 25) {
        $("#username-error").text("Please Enter a valid username that is 3 to 25 characters long");
        $("#username-input").addClass("wrong");
        $("#username-input").removeClass("right");
        validUsername = false;
        if (buttonEnabled) {
            disableButton();
        }
        return;
    }
    else {
        $("#username-error").text("");
        $("#username-input").addClass("right");
        $("#username-input").removeClass("wrong");
        validUsername = true;
        enableButton();
    }
}

function validateEmail(val) {
    const emailFormat = /[0-9a-zA-Z! # $ % & ' * + - / = ? ^ _ \{ | \} \.{0,1}]@[a-z0-9-{0,1}\.{0,1}].[a-z0-9]/g;

    const isValid = val.match(emailFormat) ? val.match(emailFormat).length == 1 : false;

    if (!isValid) {
        $("#email-error").text("Please Enter a valid email address");
        $("#email-input").addClass("wrong");
        $("#email-input").removeClass("right");
        validEmail = false;
        if (buttonEnabled) {
            disableButton();
        }
        return;
    }
    else {
        $("#email-error").text("");
        $("#email-input").addClass("right");
        $("#email-input").removeClass("wrong");
        validEmail = true;
        enableButton();
    }
}

function validatePassword(val) {
    const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    // console.log(passwordFormat.test(val));
    if (!passwordFormat.test(val)) {
        $("#password-error").text("The password should contain 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character. Please check if the password is valid");
        $("#password-input").addClass("wrong");
        $("#password-input").removeClass("right");
        validPassword = false;
        if (buttonEnabled) {
            disableButton();
        }
        return;
    }
    else {
        $("#password-error").text("");
        validateConfirmPassword(false);
        $("#password-input").addClass("right");
        $("#password-input").removeClass("wrong");
        validPassword = true;
        enableButton();
    }
}

function validateConfirmPassword(fromInput) {
    const password = $("#password-input").val();
    const confirmPassword = $("#c-password-input").val();

    if (fromInput) {
        validatePassword(password);
    }

    if (confirmPassword != password) {
        $("#confirm-password-error").text("Confirm Password should match the password entered");
        $("#c-password-input").addClass("wrong");
        $("#c-password-input").removeClass("right");
        validCPassword = false;
        if (buttonEnabled) {
            disableButton();
        }
        return;
    }
    else {
        $("#confirm-password-error").text("");
        $("#c-password-input").addClass("right");
        $("#c-password-input").removeClass("wrong");
        validCPassword = true;
        enableButton();
    }
}


function enableButton() {
    if (validUsername &&
        validEmail &&
        validPassword &&
        validCPassword) {

        $("#submit-btn")
            .text("Submit")
            .removeClass("disabled")
            .addClass("active-button")
            .attr("disabled", false);

        buttonEnabled = true;
    }
    else {
        return;
    }
}


function disableButton() {
    $("#submit-btn")
        .text("Please enter valid data to submit")
        .removeClass("active-button")
        .addClass("disabled")
        .attr("disabled", "true");

    buttonEnabled = false;

}


//SUBMIT
$("form").submit((e) => {
    e.preventDefault();
    console.log("submit")
    const username = $("#username-input").val();
    const useremail = $("#username-input").val();

    $("#modal")
        .removeClass("hide-modal")
        .addClass("modal");

    $("#main-container").addClass("disable-doc")

    const htmlData = `Username: <b>${username}</b> <br> Email: <b>${useremail}`;

    $("#modal-data").html(htmlData);
    console.log(htmlData);

})


//MODAL

$("#modal-close").click(() => {
    console.log("close")
    closeModal();
})


function closeModal() {
    $("#modal").removeClass("modal").addClass("hide-modal");
    $("#main-container").removeClass("disable-doc");

    $("form")[0].reset();

    validUsername = false;
    validEmail = false;
    validPassword = false;
    validCPassword = false;
    buttonEnabled = false;

    disableButton();


}