const dropdown = document.getElementById("dropdown");
const dropdown_arrow = document.getElementById("dropdown_icon");
const haupt_nav = document.getElementById("haupt-nav");
const sub_nav = document.getElementById("sub-nav");

dropdown.onclick = () => {
  if(dropdown_arrow.innerText == "+"){
    dropdown_arrow.innerText = "-";
    haupt_nav.className = "";
    sub_nav.className = "schatten";
  }
  else{
    dropdown_arrow.innerText = "+";
    haupt_nav.className = "schatten";
    sub_nav.className = "unsichtbar";
  }
}
