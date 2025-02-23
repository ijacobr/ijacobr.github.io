document.getElementById("btn-draw").addEventListener("click", () => {
    const stairsContainer = document.getElementById("stairs");
    stairsContainer.innerHTML = "";
    const leftPost = document.createElement("div");
    leftPost.classList.add("ladder-post", "left-post");
    stairsContainer.appendChild(leftPost);
    const rightPost = document.createElement("div");
    rightPost.classList.add("ladder-post", "right-post");
    stairsContainer.appendChild(rightPost);
    const numRungs = 10;
    const containerHeight = stairsContainer.clientHeight;
    const containerWidth = stairsContainer.clientWidth;
    const spacing = containerHeight / (numRungs + 1);
    for (let i = 0; i < numRungs; i++) {
        const rung = document.createElement("div");
        rung.classList.add("rung");
        rung.style.width = containerWidth - 20 + "px";
        rung.style.bottom = (i + 1) * spacing + "px";
        stairsContainer.appendChild(rung);
    }
    document.getElementById("btn-climb").style.display = "inline-block";
    const stickFigure = document.getElementById("stickFigure");
    stickFigure.style.display = "block";
    stickFigure.style.left = containerWidth / 2 - 20 + "px";
    stickFigure.style.bottom = "0px";
});

document.getElementById("btn-climb").addEventListener("click", () => {
    let currentStep = 0;
    const maxSteps = 8;
    const stickFigure = document.getElementById("stickFigure");
    const stairsContainer = document.getElementById("stairs");
    const containerHeight = stairsContainer.clientHeight;
    const spacing = containerHeight / (maxSteps + 1);
    const stepInterval = setInterval(() => {
        if (currentStep >= maxSteps) {
            clearInterval(stepInterval);
            return;
        }
        currentStep++;
        stickFigure.style.bottom = currentStep * spacing + "px";
        stickFigure.src =
            currentStep % 2 === 0
                ? "images/left-climb.png"
                : "images/right-climb.png";
    }, 500);
});
