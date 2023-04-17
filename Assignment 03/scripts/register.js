"use strict";

const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const username = document.getElementById("input-username");
const password = document.getElementById("input-password");
const confirmPassword = document.getElementById("input-password-confirm");

const btnSubmit = document.querySelector("#btn-submit");

//////////////////////////////////////////////////////////
btnSubmit.addEventListener("click", function () {
  const user = new User(
    firstName.value,
    lastName.value,
    username.value,
    password.value
  );

  //Check input data
  const validate = validateInput(user);
  if (validate) {
    console.log(user);

    userArr.push(user);
    saveToStorage("userArr", userArr);
    alert("Register successfully!!!");
    window.location.href = "../pages/login.html";
  }
});

//////////////////////////////////////////////////////
function validateInput(user) {
  let isValidate = true;
  if (firstName.value.trim() === "") {
    document.getElementById("firstname-err").innerHTML =
      "Please input firstname";
    isValidate = false;
  } else {
    document.getElementById("firstname-err").innerHTML = "";
  }
  if (lastName.value.trim() === "") {
    document.getElementById("lastname-err").innerHTML = "Please input lastname";
    isValidate = false;
  } else {
    document.getElementById("lastname-err").innerHTML = "";
  }
  if (username.value.trim() === "") {
    document.getElementById("username-err").innerHTML = "Please input username";
    isValidate = false;
  } else {
    document.getElementById("username-err").innerHTML = "";
  }
  if (password.value.trim() === "") {
    document.getElementById("password-err").innerHTML = "Please input password";
    isValidate = false;
  } else if (password.value.trim().length <= 8) {
    document.getElementById("password-err").innerHTML =
      "Password must be at least 8 characters";
    isValidate = false;
  } else {
    document.getElementById("password-err").innerHTML = "";
  }
  if (confirmPassword.value.trim() === "") {
    document.getElementById("confirm-password-err").innerHTML =
      "Please input confirm password";
    isValidate = false;
  } else if (password.value !== confirmPassword.value) {
    document.getElementById("confirm-password-err").innerHTML =
      "Those passwords didn’t match. Try again.";
    isValidate = false;
  } else {
    document.getElementById("confirm-password-err").innerHTML = "";
  }

  //Kiểm tra trong mảng xem username đã tồn tại hay chưa ?
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].username === user.username) {
      document.getElementById("username-err").innerHTML =
        " That username is taken. Try another.";
      isValidate = false;
      break;
    }
  }

  return isValidate;
}

////////////////////////////////////////////////
