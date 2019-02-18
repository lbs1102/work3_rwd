/*圖片全螢幕顯示*/
var min_photo = document.querySelectorAll(".min_photo");
if (this.innerWidth < 763) {
    min_photo.forEach(e => e.removeEventListener("click", full_screen))
}
else {
    min_photo.forEach(e => e.addEventListener("click", full_screen));
}

window.addEventListener("resize", () => {
    if (this.innerWidth < 763) {
        min_photo.forEach(e => e.removeEventListener("click", full_screen))
        clear_full_screen();
    }
    else {
        min_photo.forEach(e => e.addEventListener("click", full_screen));
    }
}
);
function full_screen() {
    this.parentNode.classList.add("show");
}
/*避免bug 畫面變更寬度自動清除背景圖片*/
function clear_full_screen() {
    let photo_card_show = document.querySelector(".photo_card.show");
    if (photo_card_show == null) return;
    else { photo_card_show.classList.remove("show"); }
}
/*全螢幕圖片關閉*/
var cross_array = document.querySelectorAll(".cross");
cross_array.forEach(e => e.addEventListener("click", () => { e.parentNode.parentNode.classList.remove("show") }));
// /*max-width:763...... 張數選擇*/
var next_arrows = document.querySelectorAll(".next_arrow");
var last_arrows = document.querySelectorAll(".last_arrow");
next_arrows.forEach(e => e.addEventListener("click", () => { last_next_control("next", e) }))
last_arrows.forEach(e => e.addEventListener("click", () => { last_next_control("last", e) }))
//利用父節點ID名稱來指定所點選到之箭頭下一張
function last_next_control(control, e) {
    let photo_list = document.querySelector("#" + e.parentNode.id);
    let photo_cards = photo_list.querySelectorAll(".photo_card");;
    for (let index = 0; index < photo_cards.length; index++) {
        const y = photo_cards[index].classList;
        if (y.contains("min_show")) {
            y.toggle("min_show");
            if (control == "next") { z = index + 1; }
            else if (control == "last") { z = index - 1 }
            z == photo_cards.length ? z = 0 : z;
            z < 0 ? z = photo_cards.length - 1 : z;
            photo_cards[z].classList.add("min_show");
            break;
        }

    }
}
/*首頁箭頭效果*/
var page_opening_arrow = document.querySelector("#page_opening_arrow");
var photo_array = document.querySelector("#photo_array");
page_opening_arrow.addEventListener("click", () => {
    photo_array.scrollIntoView({ behavior: "smooth", block: "start" });
})
/*偵測當前頁面高度 自動維持螢幕位置*/
var natural_photo = document.querySelector("#natural_photo");
var food_photo = document.querySelector("#food_photo");
var people_photo = document.querySelector("#people_photo");
let time;
window.addEventListener("scroll", () => {
    if (this.innerWidth > 763 || (this.scrollY > (people_photo.offsetTop + (people_photo.offsetHeight / 2)))) return clearTimeout(time);
    if (time) clearTimeout(time);
    time = setTimeout(photo_scroll, 100)
})
function photo_scroll() {
    if ((window.scrollY + 300) > natural_photo.offsetTop) {
        if ((window.scrollY + 300) > food_photo.offsetTop) {
            if ((window.scrollY + 300) > people_photo.offsetTop) {
                people_photo.scrollIntoView(({ behavior: "smooth", block: "start" }));
            }
            else {
                food_photo.scrollIntoView(({ behavior: "smooth", block: "start" }));
            }
        }
        else {
            natural_photo.scrollIntoView(({ behavior: "smooth", block: "start" }));
        }
    };
}