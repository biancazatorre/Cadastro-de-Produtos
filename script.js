document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const productTable = document.getElementById("product-table");
    const newProductButton = document.getElementById("new-product");
    const viewProductsButton = document.getElementById("view-products");
    const productForm = document.getElementById("product-form");
    const productList = document.getElementById("product-list");

    let products = [];

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const price = parseFloat(document.getElementById("price").value);
        const available = document.getElementById("available").value;

        const product = { name, description, price, available };

        products.push(product);
        products.sort((a, b) => a.price - b.price);

        displayProducts();
        form.reset();
        toggleView();
    });

    newProductButton.addEventListener("click", () => {
        toggleView();
    });

    viewProductsButton.addEventListener("click", () => {
        displayProducts();
        toggleView();
    });

    function displayProducts() {
        productTable.innerHTML = "";
        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.available}</td>
                <td><button class="delete-button" data-index="${index}">Excluir</button></td>
            `;
            productTable.appendChild(row);
        });

        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                if (confirm("Tem certeza que deseja excluir este produto?")) {
                    products.splice(index, 1);
                    displayProducts();
                }
            });
        });
    }

    function toggleView() {
        if (productForm.style.display === "none") {
            productForm.style.display = "block";
            productList.style.display = "none";
        } else {
            productForm.style.display = "none";
            productList.style.display = "block";
        }
    }

    // Initialize view
    productForm.style.display = "block";
    productList.style.display = "none";
});
