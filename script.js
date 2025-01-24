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

const pathnameList = ["/"];

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
    if (pathnameList.includes(window.location.pathname)) {
      setBanner();
    }
  });
}

// 图片加载动画
const images = document.querySelectorAll("img");

function handleImageLoading(image) {
  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("image-wrapper");

  image.parentNode.insertBefore(imageWrapper, image);
  imageWrapper.appendChild(image);

  const loadingAnimation = document.createElement("div");
  loadingAnimation.classList.add("loading-animation");

  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  loadingAnimation.appendChild(spinner);

  imageWrapper.appendChild(loadingAnimation);

  // 图片加载完成
  image.addEventListener("load", () => {
    loadingAnimation.style.display = "none";
    image.style.filter = "blur(0)";
  });
}

// 页脚统计
sendGetRequest("https://api.dailyen.666-114514.eu.org/tj", function (response) {
  uv = JSON.parse(response).uv;
  window.onload = function () {
    document.querySelector("#uv").innerText = uv;
  };
});
