let path: string;

if (document.title == "Home | Sebastian Braun") path = "./pages";
else path = "../pages";

document.getElementById("haupt-nav").insertAdjacentHTML("afterend", `
<header id="sub-nav" class="unsichtbar">
  <nav>
    <li class="nav-link"><a class="link-text" href="${path}/led_beleuchtung.html">LED Beleuchtung</a></li>
    <li class="nav-link"><a class="link-text" href="${path}/led_matrix.html">LED Matrix</a></li>
    <li class="nav-link"><a class="link-text" href="${path}/nixie_uhr.html">Nixie Uhr</a></li>
    <li class="nav-link"><a class="link-text" href="${path}/rustuino.html">Rustuino</a></li>
  </nav>
</header>
`);


// Navbar toggle ==================================================================================
const dropdown = document.getElementById("dropdown");
const dropdown_icon = document.getElementById("dropdown_icon");
const haupt_nav = document.getElementById("haupt-nav");
const sub_nav = document.getElementById("sub-nav");

dropdown.onclick = () => {
  if(dropdown_icon.innerText == "+"){
    dropdown_icon.innerText = "-";
    haupt_nav.classList.remove("schatten");
    sub_nav.classList.add("schatten");
    sub_nav.classList.remove("unsichtbar");
  }
  else{
    dropdown_icon.innerText = "+";
    haupt_nav.classList.add("schatten");
    sub_nav.classList.remove("schatten");
    sub_nav.classList.add("unsichtbar");
  }
}
