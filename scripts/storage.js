"use strict";
//Hàm lấy dữ liệu từ localStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Hàm lưu dữ liệu vào localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//Lấy dữ liệu userArr từ localStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

//Chuyển đổi về dạng Class Instance => Trả về 1 mảng chứa các Instance của Class User
const userArr = users.map((user) => parseUser(user));

//console.log(userArr);
//Lấy dữ liệu từ user đang đăng nhập

let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

//Lấy dữ liệu todoArr từ localStorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

//Chuyển đổi từ Obj về Class Instance
const todoArr = todos.map((todo) => parseTask(todo));
/////////////////////////////////////////////
//Hàm chuyển đổi từ JS Object về dạng Class Instance
function parseUser(userData) {
  //console.log(userData);
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );

  return user;
}

//////////////////////
//Hàm chuyển đổi từ JS Object sang Class Instance của task Class
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
