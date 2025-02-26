document.addEventListener("DOMContentLoaded", () => {
    const items = [
        { title: "Happy Birthday", img: "images/birthday.jpg" },
        { title: "Crazy Clown", img: "images/clown.jpg" },
        { title: "It's Raining", img: "images/rain.jpg" },
        { title: "Quiet Time", img: "images/read.jpg" },
        { title: "Working Hard", img: "images/shovel.jpg" },
        { title: "Work from Home", img: "images/work.jpg" },
    ];
    const content = document.getElementById("content");
    items.forEach((item) => {
        const titleSection = document.createElement("section");
        titleSection.classList.add("title-item");
        titleSection.textContent = item.title;
        titleSection.addEventListener("click", () => {
            showPopup(item);
        });
        content.appendChild(titleSection);
    });
    const showPopup = (item) => {
        const popup = document.getElementById("popup");
        const popupTitle = document.getElementById("popup-title");
        const popupImg = document.getElementById("popup-img");
        popupTitle.textContent = item.title;
        popupImg.src = item.img;
        popupImg.alt = item.title;
        popup.classList.remove("hidden");
    };
    document.getElementById("close").addEventListener("click", () => {
        document.getElementById("popup").classList.add("hidden");
    });
});
