//do stuff when button clicked
document.getElementById("btn-click-me").onclick = () => {
    console.log("WOW!");
    document.getElementById("result").innerHTML = "Hi Jacob";
};

//change color
document.getElementById("btn-color").onclick = () => {
    const messageP = document.getElementById("message");
    messageP.innerHTML = "Goodbye";
    messageP.classList.add("sad");
};

document.getElementById("btn-click-me").onclick = () => {
    document.getElementById("result").classList.add("good-times");
};

document.getElementById("btn-color").onclick = () => {
    document.getElementById("message").classList.add("bad-times");
};

document.getElementById("btn-clear").onclick = () => {
    document.getElementById("text-clear").classList.add("clear");
};

document.getElementById("feeling").onkeydown = () => {
}