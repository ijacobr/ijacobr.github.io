document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleButton");
    const menu = document.getElementById("menu");
    const travelingDiv = document.getElementById("traveling");
    const pictureDiv = document.getElementById("picture");

    function updateMenuStyle() {
        if (window.innerWidth < 400) {
            if (menu.classList.contains("hidden")) {
                menu.style.display = "none";
                toggleButton.innerHTML = "▲";
            } else {
                menu.style.display = "block";
                toggleButton.innerHTML = "▼";
            }
        } else {
            menu.classList.remove("hidden");
            menu.style.display = "flex";
            menu.style.listStyleType = "none";
            menu.style.justifyContent = "center";
            toggleButton.innerHTML = "▼";
        }
    }

    toggleButton.addEventListener("click", () => {
        if (window.innerWidth < 400) {
            if (menu.classList.contains("hidden")) {
                toggleButton.innerHTML = "▼";
                menu.style.display = "block";
                menu.classList.remove("hidden");
            } else {
                toggleButton.innerHTML = "▲";
                menu.style.display = "none";
                menu.classList.add("hidden");
            }
        }
    });

    window.addEventListener("resize", updateMenuStyle);
    updateMenuStyle();

    const exercise1 = menu.querySelector("li:first-child");
    const exercise2 = document.getElementById("e2");

    exercise1.addEventListener("click", () => {
        travelingDiv.style.display = "block";
        pictureDiv.style.display = "none";
    });

    exercise2.addEventListener("click", () => {
        travelingDiv.style.display = "none";
        pictureDiv.style.display = "block";
    });



    const transportInput = document.getElementById("transportationInput");
    const transportImage = document.getElementById("transportationImage");

    const transportImages = {
        bike: "images/bike.jpg",
        scooter: "images/scooter.jpg",
        car: "images/car.jpg",
        skateboard: "images/skateboard.jpg",
    };

    transportInput.addEventListener("input", () => {
        const query = transportInput.value.trim().toLowerCase();

        if (transportImages.hasOwnProperty(query)) {
            transportImage.src = transportImages[query];
            transportImage.style.display = "block";
        } else {
            transportImage.src = "";
            transportImage.style.display = "none";
        }
    });


    
    function changeHeartColor(event) {
        const newColor = event.target.getAttribute("data-color");
        document.getElementById("heart").style.color = newColor;
    }

    const heartButtons = document.querySelectorAll(".heart-button");
    heartButtons.forEach((button) => {
        button.addEventListener("click", changeHeartColor);
    });
});
