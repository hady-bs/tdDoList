let doInput = document.querySelector("input");
let addBtn = document.querySelector(".add-btn");
let mainWork = document.querySelector(".my-work");
let works = document.querySelector(".my-work");
let doArr = [];
if (window.localStorage.getItem("data")) {
  doArr = JSON.parse(window.localStorage.getItem("data"));
  addToElement(doArr);
}
console.log(doArr);
addBtn.onclick = () => {
  if (doInput != "") {
    addToArr(doInput.value);
  }
};

function addToArr(a) {
  const t = {
    id: Date.now(),
    content: a,
    completed: false,
  };
  doArr.push(t);
  addToElement(doArr);
  addToStorge(doArr);
}

function addToElement(v) {
  mainWork.innerHTML = "";
  v.forEach((x) => {
    let div = document.createElement("div");
    div.className = x.completed == false ? "work" : "work done";
    div.setAttribute("data-id", x.id);
    div.innerHTML = x.content;
    let del = document.createElement("button");
    del.className = "delete";
    del.innerHTML = "delete";
    div.append(del);
    mainWork.append(div);
  });
}

function addToStorge(v) {
  window.localStorage.setItem("data", JSON.stringify(v));
}
works.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    rmfromarray(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("work")) {
    e.target.classList.toggle("done");
    searchInArray(e.target.getAttribute("data-id"));
  }
});

function rmfromarray(v) {
  doArr = doArr.filter((li) => {
    li.id != v;
  });
  addToStorge(doArr);
}

function searchInArray(v) {
  for (let i = 0; i < doArr.length; i++) {
    if (doArr[i].id == v) {
      doArr[i].completed = doArr[i].completed == false ? true : false;
    }
  }
  addToStorge(doArr);
}
