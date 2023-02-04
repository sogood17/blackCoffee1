// import "./styles.css";

const espressoMenuName = document.querySelector("#espresso-menu-name");
const confirmBtn = document.querySelector("#espresso-menu-submit-button");
const menuCount = document.querySelector(".menu-count");
const espressoMenuForm = document.querySelector("#espresso-menu-form");
const menuList = document.querySelector("#espresso-menu-list");
let menuNameValue = "";
let menuName = document.querySelector(".menu-name-value");

const menu = [];

const render = () => {
  const template = menu
    .map((item, index) => {
      return `<li data-menu-id="${index}" className="menu-name-value">
  <span>${item.name}</span>
  <button class="modify">수정</button>
  <button class="delete">삭제</button>
</li>`;
    })
    .join("");
  menuList.innerHTML = template;
  setMenuCount();
};

//메뉴 갯수 카운트
const setMenuCount = () => {
  menuCount.innerText = `총 ${menuList.querySelectorAll("li").length}개`;
};

//메뉴인풋값
espressoMenuName.addEventListener("change", (e) => {
  menuNameValue = e.target.value;
});

//메뉴 이름 입력(엔터)
espressoMenuForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (menuNameValue === "") {
    window.confirm("메뉴 이름을 입력해주세요.");
  } else {
    menu.push({ name: menuNameValue });
    localStorage.setItem("menu", JSON.stringify(menu));
    render();
    espressoMenuName.value = "";
    menuNameValue = "";
  }
});

//메뉴 이름 입력(버튼 클릭)
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (menuNameValue === "") {
    alert("메뉴 이름을 입력해주세요.");
  } else {
    menu.push({ name: menuNameValue });
    localStorage.setItem("menu", JSON.stringify(menu));
    render();
    espressoMenuName.value = "";
    menuNameValue = "";
  }
});

//수정
const writeMenuName = (e) => {
  menuNameValue = prompt(
    "수정할 메뉴명을 입력하세요.",
    e.target.closest("li").querySelector("span").innerText
  );
  if (menuNameValue === "") {
    writeMenuName(e);
  }
};

//수정, 삭제 버튼 클릭
menuList.addEventListener("click", (event) => {
  if (event.target.className === "modify") {
    writeMenuName(event);
    menu.splice(event.target.closest("li").dataset.menuId, 1, {
      name: menuNameValue
    });
    // menu.splice(event.target.dataset.menuId, 1, menuNameValue);
    localStorage.setItem("menu", JSON.stringify(menu));
    render();
  } else if (event.target.className === "delete") {
    if (window.confirm("삭제하시겠습니까?")) {
      menu.splice(event.target.closest("li").dataset.menuId, 1);
      localStorage.setItem("menu", JSON.stringify(menu));
      render();
    }
  }
});
