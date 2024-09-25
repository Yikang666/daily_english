// 发送请求
const xhr = new XMLHttpRequest();

function sendGetRequest(url, callback) {
  xhr.open("GET", url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.response);
    }
  };
  xhr.send();
}

function setBanner() {
  sendGetRequest(
    "https://mirror.666-114514.eu.org/https://open.iciba.com/dsapi/",
    function (response) {
      const data = JSON.parse(response);
      document
        .querySelector(".banner img")
        .setAttribute("src", data.fenxiang_img);
      document.querySelector(".banner audio").setAttribute("src", data.tts);
    }
  );
}

setBanner();

// Pjax 无感刷新
function pjaxOnload() {
  const pjax = new Pjax({
    selectors: ["title", "#main"],
  });

  document.addEventListener("pjax:send", function () {
    NProgress.start();
  });

  document.addEventListener("pjax:complete", function () {
    NProgress.done();
  });
}
