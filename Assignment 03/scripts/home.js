"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

displayHome();

/////////////////////////////////////////////////////////
//Hàm hiển thị thông tin theo Modal
function displayHome() {
  if (currentUser) {
    //Nếu đang có người dùng thì ẩn loginModal, hiển thị mainContent
    loginModal.style.display = "none";
    mainContent.style.display = "block";

    //Thông báo chào mừng
    welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
  } else {
    //Ngược lại ẩn mainContent hiển thị loginModal
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

//////////////////////////////////////////
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Are you sure ?");
  if (isLogout) {
    currentUser = null;
    saveToStorage("currentUser", currentUser);
    displayHome();
  }
});
