"use strict";

if (currentUser) {
  const pageSize = document.getElementById("input-page-size");
  const category = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");

  btnSubmit.addEventListener("click", function () {
    if (validateInput()) {
      //Cập nhật lại currentUser
      currentUser.pageSize = Number.parseInt(pageSize.value);
      currentUser.category = category.value;
      saveToStorage("currentUser", currentUser);

      //Cập nhật lại mảng userArr
      const index = userArr.findIndex(
        (userItem) => userItem.username === currentUser.username
      );
      userArr[index] = currentUser;
      saveToStorage("userArr", userArr);
      alert("Setting successfully!!!");
      pageSize.value = "";
      category.value = "General";
      window.location.href = "../pages/news.html";
    }
  });

  /////////////////////////////////
  //Kiểm tra dữ liệu người dùng nhập vào
  function validateInput() {
    let isValidate = true;

    if (
      Number.isNaN(Number.parseInt(pageSize.value)) &&
      category.value === "General"
    ) {
      alert("Please input number and select Category!");
      isValidate = false;
      return;
    }
    if (category.value === "General") {
      alert("Please select Category");
      isValidate = false;
    }
    if (pageSize.value === "") {
      alert("Please input number");
      isValidate = false;
    }

    return isValidate;
  }
  //////////////////////////////////////////////////
} else {
  alert("Please Login/Register for use application");
  window.location.href = "../index.html";
}
