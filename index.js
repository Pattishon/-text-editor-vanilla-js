const textField = document.getElementById("text-field");
textField.innerHTML = localStorage.getItem("text");

function editText(comandName, argument = null) {
  document.execCommand(comandName, false, argument);
  textField.focus();
  setStorage();
}

function toggleOptions(e) {
  const wrapper = e.closest(".button").querySelector(".options");
  if (!e.classList.contains("no-close") && wrapper.classList.contains("show")) {
    document
      .querySelectorAll(".options")
      .forEach((el) => el.classList.remove("show"));
    wrapper.classList.remove("show");
  } else {
    document
      .querySelectorAll(".options")
      .forEach((el) => el.classList.remove("show"));
    wrapper.classList.add("show");
  }
}

document.querySelectorAll(".show-options").forEach((element) => {
  element.addEventListener("click", (e) => {
    toggleOptions(e.target);
  });
});

function changeActiveBgColor(el, color) {
  el
    .closest(".show-options")
    .querySelector(".color-picker__active-color").style.backgroundColor = color;
}
function changeActiveColor(el, color) {
  el
    .closest(".show-options")
    .querySelector(".color-picker__active-color").style.color = color;
}

//save text to local storage with debounce
function setStorage() {
  const text = document.getElementById("text-field").innerHTML;
  localStorage.setItem("text", text);
}

const deboncedSetStorage = debounce(setStorage, 200);
document.addEventListener("keydown", deboncedSetStorage);

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
