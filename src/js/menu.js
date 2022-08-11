const openButton = document.getElementById("openMenu");
const closeButton = document.getElementById("close");
const navigation = document.getElementById("navigation");
const buttonHiddenClassName = "header__logo--icon-hidden";
const visibleMenuClassName = "header__navigation--visible";

openButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);

function openMenu() {
  openButton.classList.add(buttonHiddenClassName);
  closeButton.classList.remove(buttonHiddenClassName);

  navigation.classList.add(visibleMenuClassName);
}

function closeMenu() {
  openButton.classList.remove(buttonHiddenClassName);
  closeButton.classList.add(buttonHiddenClassName);

  navigation.classList.remove(visibleMenuClassName);
}
