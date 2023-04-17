"use strict";
const username = document.getElementById("input-username");
const password = document.getElementById("input-password");
const btnSubmit = document.querySelector("#btn-submit");

btnSubmit.addEventListener("click", function () {
  const isValidate = validateInput();
  if (isValidate) {
    //Tìm kiếm người dùng trong userArr
    const user = userArr.find(
      (item) =>
        item.username === username.value && item.password === password.value
    );
    if (user) {
      alert(`Welcome back ${user.username} !!!`);
      //Lưu thông tin user hiện tại vào LocalStorage
      saveToStorage("currentUser", user);

      //Chuyển hướng trang web
      window.location.href = "../index.html";
    } else {
      document.getElementById("password-err").innerHTML =
        "username or password incorrect. Try again or click 'Forgot password' to reset it.";
    }
  }
});

function validateInput() {
  let isValidate = true;
  if (username.value.trim() === "") {
    document.getElementById("username-err").innerHTML = "Please input username";
    isValidate = false;
  } else {
    document.getElementById("username-err").innerHTML = "";
  }
  if (password.value.trim() === "") {
    document.getElementById("password-err").innerHTML = "Please input password";
    isValidate = false;
  } else {
    document.getElementById("password-err").innerHTML = "";
  }

  return isValidate;
}
