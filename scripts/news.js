"use strict";
console.log(currentUser);
if (currentUser) {
  const newContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  let totalResults = 0;

  //////////////////////////////////////////
  // Hàm lấy dữ liệu từ API
  const getDataNew = async function (country, page) {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=c9a3272f4a394adf9ba4621b66289441`
    );

    const data = await res.json();

    //Hiển thị danh sách
    displayNewList(data);
  };

  /////////////////////////////
  //Hàm kiểm tra điều kiện và ấn nút Previous
  function checkBtnPrev() {
    //Nếu đang ở trang thì ẩn nút Previous đi
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }

  ///////////////////////////////////
  //Hàm kiểm tra điều kiện và ấn nút Next
  function checkBtnNext() {
    if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }

  ///////////////////////////////////
  //Khi click vào nút Previous
  btnPrev.addEventListener("click", function () {
    //Hiển thị danh sách phía trước
    getDataNew("gb", --pageNum.textContent);
  });
  ///////////////////////////////////////
  //Khi click vào nút Next
  btnNext.addEventListener("click", function () {
    //Gọi hàm này để hiển thị danh sách tin tức tiếp theo
    getDataNew("gb", ++pageNum.textContent);
  });
  //////////////////////////////

  function displayNewList(data) {
    //Lấy giá trị cho biến totalResults
    totalResults = data.totalResults;
    //console.log(data);
    checkBtnPrev();
    checkBtnNext();
    let html = "";
    data.articles.forEach(function (article) {
      html += `<div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
          <div class="row no-gutters">
              <div class="col-md-4">
                  <img src=${article.urlToImage}
                      class="card-img"
                      alt="img">
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                      <h5 class="card-title">${article.title}</h5>
                      <p class="card-text">${article.description}</p>
                      <a class="btn btn-primary" href=${article.url}>View</a>
                  </div>
              </div>
          </div>
      </div>
  </div>`;
    });
    newContainer.innerHTML = html;
  }
  getDataNew("gb", 1);
} else {
  alert("Please Login/Register for use application");
  window.location.href = "../index.html";
}
