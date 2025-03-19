window.onload = function () {
    // Get the modal elements
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-content");
    const closeBtn = document.getElementById("close");

    // Add click event to all preview images
    document.querySelectorAll(".preview-image").forEach((img) => {
        img.addEventListener("click", function () {
            modal.style.display = "block";
            // Use the data attribute for the full-size image
            modalImg.src = this.dataset.fullsize;
        });
    });

    // Close the modal when the user clicks the close button
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Optional: close modal if the user clicks outside the image
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
