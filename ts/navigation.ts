let path: string;

if (document.title == "Home | Sebastian Braun") path = "./pages";
else path = "../pages";

document.getElementById("haupt-nav").insertAdjacentHTML("afterend", `
<nav id="sub-nav" class="active">
  <a class="nav-link" href="${path}/led_beleuchtung.html">LED Beleuchtung</a>
  <a class="nav-link" href="${path}/led_matrix.html">LED Matrix</a>
  <a class="nav-link" href="${path}/nixie_uhr.html">Nixie Uhr</a>
  <a class="nav-link" href="${path}/rustuino.html">Rustuino</a>
</nav>

<nav id="mobile-nav">
  <a class="nav-link" href="#" id="mobile-dropdown">+Menu</a>
</nav>
`);


// Navbar toggle ==================================================================================
const dropdown = document.getElementById("dropdown");
const mobile_dropdown = document.getElementById("mobile-dropdown");
const haupt_nav = document.getElementById("haupt-nav");
const sub_nav = document.getElementById("sub-nav");

dropdown.onclick = () => {
  if (dropdown.innerText == "+Projekte"){
    dropdown.innerText = "-Projekte";
    haupt_nav.style.boxShadow = "none";
    sub_nav.classList.remove("active");
  }
  else{
    dropdown.innerText = "+Projekte";
    sub_nav.classList.add("active");
    haupt_nav.style.boxShadow = "5px 5px 8px #B6B6B6"
  }
}

mobile_dropdown.onclick = () => {
  if (mobile_dropdown.innerText == "+Menu") {
    mobile_dropdown.innerText = "-Menu";
    haupt_nav.classList.remove("active");
    sub_nav.classList.remove("active");
  }
  else {
    mobile_dropdown.innerText = "+Menu";
    haupt_nav.classList.add("active");
    sub_nav.classList.add("active");
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
