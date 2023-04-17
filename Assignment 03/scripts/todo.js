"use strict";

if (currentUser) {
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");

  displayTodoList();

  /////////////////////////////////
  function displayTodoList() {
    let html = "";

    //Lọc các todo (task) là của user đang đăng nhập để hiển thị
    todoArr
      .filter((todo) => todo.owner === currentUser.username)
      .forEach(function (todo) {
        html += `<li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">×</span></li>`;
      });
    todoList.innerHTML = html;

    eventToggleTask();
    eventDeleteTask();
  }

  ///////////////////////////////////////////
  //   Add task vào list khi click
  btnAdd.addEventListener("click", function () {
    //Kiểm tra xem người dùng đã nhập hay chưa ?
    if (inputTask.value.trim().length === 0) {
      alert("Please input Task!");
    } else {
      const todo = new Task(inputTask.value, currentUser.username, false);

      //Thêm task vào mảng todoArr
      todoArr.push(todo);
      //Lưu dữ liệu xuống localStorage
      saveToStorage("todoArr", todoArr);
      //Hiển thị lại danh sách
      displayTodoList();
      //Xóa dữ liệu tại khung nhập sau khi add
      inputTask.value = "";
    }
  });

  //////////////////////////////////
  // sự kiện ToggleTask
  function eventToggleTask() {
    //Lấy tất cả các phần tử li chứa thông tin các task
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        //Nhấn vào dòng li nhưng tránh '×' ra
        if (e.target !== liEl.children[0]) {
          //Toggle class checked
          liEl.classList.toggle("checked");
          //Tìm task vừa click
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === currentUser.username &&
              todoItem.task === liEl.textContent.slice(0, -1) //Lấy nội dung task loại bỏ '×'
          );
          //Thay đổi thuộc tính isDone
          todo.isDone = liEl.classList.contains("checked") ? true : false;

          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  ///////////////////////////////
  //Xóa Task
  function eventDeleteTask() {
    //Lấy tất cả các phần tử nút delete khi click
    document.querySelectorAll("#todo-list .close").forEach(function (closeEL) {
      closeEL.addEventListener("click", function () {
        const isDelete = confirm("Are you sure ?");
        if (isDelete) {
          //Tìm vị trí task ấn delete trong mảng todoArr
          const index = todoArr.findIndex(
            (item) =>
              item.owner === currentUser.username &&
              item.task === closeEL.parentElement.textContent.slice(0, -1)
          );

          //Xóa task khỏi mảng
          todoArr.splice(index, 1);
          saveToStorage("todoArr", todoArr);

          //Hiển thị lại danh sách
          displayTodoList();
        }
      });
    });
  }
} else {
  alert("Please Login/Register for use application");
  window.location.href = "../index.html";
}
