let path: string;

if (document.title == "Home | Sebastian Braun") path = "./pages";
else path = "../pages";

document.getElementById("haupt-nav").insertAdjacentHTML("afterend", `
<nav id="sub-nav" class="unsichtbar">
  <a class="nav-link" href="${path}/led_beleuchtung.html">LED Beleuchtung</a>
  <a class="nav-link" href="${path}/led_matrix.html">LED Matrix</a>
  <a class="nav-link" href="${path}/nixie_uhr.html">Nixie Uhr</a>
  <a class="nav-link" href="${path}/rustuino.html">Rustuino</a>
</nav>
`);


// Navbar toggle ==================================================================================
const dropdown = document.getElementById("dropdown");
const dropdown_icon = document.getElementById("dropdown_icon");
const haupt_nav = document.getElementById("haupt-nav");
const sub_nav = document.getElementById("sub-nav");

dropdown.onclick = () => {
  if (dropdown_icon.innerText == "+"){
    dropdown_icon.innerText = "-";
    haupt_nav.classList.remove("schatten");
    haupt_nav.style.boxShadow = "none";
    sub_nav.style.display = "flex";
  }
  else{
    dropdown_icon.innerText = "+";
    haupt_nav.style.boxShadow = "5px 5px 8px #B6B6B6"
    sub_nav.style.display = "none";
  }
}


// Image zoom =====================================================================================
const images = document.querySelectorAll("img");

images.forEach((img) => {
  img.onclick = () => {
    if (img.classList.contains("zoomed") == false) {
      img.classList.add("zoomed");
    }
    else {
      img.classList.remove("zoomed");
    }
  }
});
