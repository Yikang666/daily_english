function setBanner() {
  fetch("https://mirror.666-114514.eu.org/https://open.iciba.com/dsapi/")
    .then((response) => response.json())
    .then((data) => {
      document
        .querySelector(".banner img")
        .setAttribute("src", data.fenxiang_img);
      document.querySelector(".banner audio").setAttribute("src", data.tts);
    })
    .catch((error) => console.error("Error fetching data:", error));
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

// 页脚访客统计
fetch("https://api.dailyen.666-114514.eu.org/tj")
  .then((response) => response.json())
  .then((data) => {
    document.querySelector("#uv").innerHTML = data.uv;
  })
  .catch((error) => console.error("Error fetching UV count:", error));
