const dropdown = document.getElementById("dropdown");
const haupt_nav = document.getElementById("haupt-nav");
const sub_nav = document.getElementById("sub-nav");
dropdown.onclick = () => {
    if (dropdown.innerText == "˃Projekte") {
        dropdown.innerText = "˅Projekte";
        haupt_nav.className = "";
        sub_nav.className = "schatten";
    }
    else {
        dropdown.innerText = "˃Projekte";
        haupt_nav.className = "schatten";
        sub_nav.className = "unsichtbar";
    }
};
