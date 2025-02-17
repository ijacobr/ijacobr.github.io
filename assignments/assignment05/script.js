window.onload = function () {
    document.getElementById("col1of3").onclick = () => {
        document.getElementById("hello-text").innerHTML += "hello<br>";
    };

    document.getElementById("color-picker").addEventListener("input", function () {
            const selectedColor = this.value;
            document.getElementById("star").style.color = selectedColor;
        });

    document.getElementById("img").addEventListener("click", function() {
        this.src = "https://picsum.photos/150?random="+ new Date().getTime();
    });
};