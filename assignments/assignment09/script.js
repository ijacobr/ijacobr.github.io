class Pizza {
    constructor(name, ingredients, sauce, cheese, price, image) {
        this.name = name;
        this.ingredients = ingredients;
        this.sauce = sauce;
        this.cheese = cheese;
        this.price = price;
        this.image = image;
    }

    getPizzaSection = () => {
        let section = document.createElement("div");
        section.classList.add("pizza-box");
        section.innerHTML = `
            <img src="${this.image}" alt="${this.name}">
            <h3>${this.name}</h3>
        `;
        section.addEventListener("click", () => openModal(this));
        return section;
    };
}

const pizzas = [
    new Pizza(
        "Margherita",
        "Tomato, Basil",
        "Tomato Sauce",
        "Mozzarella",
        8.99,
        "images/margherita.jpg"
    ),
    new Pizza(
        "Pepperoni",
        "Pepperoni, Tomato",
        "Tomato Sauce",
        "Mozzarella",
        9.99,
        "images/pepperoni.jpg"
    ),
    new Pizza(
        "BBQ Chicken",
        "Chicken, Onion",
        "BBQ Sauce",
        "Cheddar",
        10.99,
        "images/bbq_chicken.jpg"
    ),
    new Pizza(
        "Veggie",
        "Bell Pepper, Olives",
        "Tomato Sauce",
        "Mozzarella",
        9.49,
        "images/veggie.jpg"
    ),
    new Pizza(
        "Hawaiian",
        "Ham, Pineapple",
        "Tomato Sauce",
        "Mozzarella",
        10.49,
        "images/hawaiian.jpg"
    ),
];

const pizzaContainer = document.getElementById("pizza-container");
pizzas.forEach((pizza) => pizzaContainer.appendChild(pizza.getPizzaSection()));

const openModal = (pizza) => {
    document.getElementById("modalTitle").textContent = pizza.name;
    document.getElementById("modalIngredients").textContent = pizza.ingredients;
    document.getElementById("modalSauce").textContent = pizza.sauce;
    document.getElementById("modalCheese").textContent = pizza.cheese;
    document.getElementById("modalPrice").textContent = pizza.price;

    const modalImg = document.getElementById("modalImage");
    modalImg.src = pizza.image;
    modalImg.classList.add("rotate");

    setTimeout(() => modalImg.classList.remove("rotate"), 500);

    document.getElementById("pizzaModal").style.display = "block";
};

const closeModal = () => {
    document.getElementById("pizzaModal").style.display = "none";
};
