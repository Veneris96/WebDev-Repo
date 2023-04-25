const addProductForm = document.getElementById("product-info");
const table = document.getElementById("products-list");
const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const productId = document.getElementById("product-id");
const brandEdit = document.getElementById("brand-edit");
const nameEdit = document.getElementById("name-edit");
const descEdit = document.getElementById("description-edit");
const priceEdit = document.getElementById("price-edit");
const confirmEdit = document.getElementById("confirm-changes");
const closeEditModal = document.getElementById("cancel-edit");
const productNameDelete = document.getElementById("product-name-delete");
const deleteModal = document.getElementById("delete-product");
const deleteForm = document.getElementById("delete-form");
const confirmDeletion = document.getElementById("confirm-deletion");
const closeDeleteModal = document.getElementById("cancel-deletion");
const productsList = document.getElementById("products-selection");
const deleteSelection = document.getElementById("delete-selected");
const deleteBtn = document.getElementById("deleteBtn")
let arrayData = [];

const getToken = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
        const credential = {
            username: "matteo.dev@outlook.com",
            password: "870621345bvb.96.",
        };
        try {
            const data = await fetch(
                "https://striveschool-api.herokuapp.com/api/account/login",
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(credential),
                }
            );
            const response = await data.json();

            const { access_token } = response;
            localStorage.setItem("token", JSON.stringify(access_token));
            token = access_token;
        } catch (error) {
            console.log(error);
        }
    }
    return token;
};
getToken();

const createDataTable = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
        await getToken().then((res) => (token = res));
    }

    try {
        const data = await fetch(
            "https://striveschool-api.herokuapp.com/api/product/",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const response = await data.json();

        arrayData = response;
        arrayData.forEach((item, i) => {

            const tableRow = document.createElement("tr");
            const brandCell = document.createElement("td");
            const nameCell = document.createElement("td");
            const descriptionCell = document.createElement("td");
            const priceCell = document.createElement("td");
            const editCell = document.createElement("td");
            const editBtn = document.createElement("button");
            editBtn.innerText = ("Modifica Prodotto");

            tableRow.classList.add("table-row");
            brandCell.classList.add("brand", "cell");
            nameCell.classList.add("name", "cell");
            descriptionCell.classList.add("description", "cell");
            priceCell.classList.add("price", "cell");
            editCell.classList.add("edit", "cell");
            editBtn.classList.add("edit-btn");


            table.appendChild(tableRow);
            tableRow.appendChild(brandCell);
            tableRow.appendChild(nameCell);
            tableRow.appendChild(descriptionCell);
            tableRow.appendChild(priceCell);
            tableRow.appendChild(editCell);
            editCell.appendChild(editBtn);

            brandCell.innerText = (item.brand);
            nameCell.innerText = (item.name);
            descriptionCell.innerText = (item.description);
            priceCell.innerText = ("€" + item.price);


            editBtn.addEventListener("click", (product) => {
                editModal.showModal();

                productId.innerText = item._id;
                nameEdit.value = item.name;
                brandEdit.value = item.brand;
                descEdit.value = item.description;
                priceEdit.value = item.price;
            });
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};

addProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("modelname").value;
    const description = document.getElementById("description").value;
    const brand = document.getElementById("brand").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const price = document.getElementById("price").value;

    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
        await getToken().then((res) => (token = res));
    }

    try {
        await fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },

            body: JSON.stringify({
                name: name,
                description: description,
                brand: brand,
                imageUrl: imageUrl,
                price: price,
            })
        }).then(response => {
            response.json().then(async (data) => {
                console.log(data)
            })
        }).then(() => window.location.reload())
        alert("Prodotto aggiunto con successo.");
    } catch (error) {
        alert("C'è un errore: " + error)
    };
});

const editProduct = async (id, body) => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
        await getToken().then((res) => (token = res));
    }
    try {
        await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }).then(() => window.location.reload());
        alert("Prodotto modificato con successo");
    } catch (error) {
        console.log("C'è un errore: " + error)
    };
};

editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(editForm);
    const body = Object.fromEntries(data.entries());

    body.price = Number(body.price);

    editProduct(productId.innerText, body);
});

closeEditModal.addEventListener("click", () => {
    editModal.close();
});

deleteBtn.addEventListener('click', (product) => {
    deleteModal.showModal();

});

const deleteProduct = async (id) => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
        await getToken().then((res) => (token = res));
    }
    await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).catch((error) => {
        console.log("C'è un errore: " + error)
    }).then(() => window.location.reload());
};

createDataTable().then((res) => {
    const selection = res.map((product) => {
        return `<option selected hidden disabled>Seleziona il prodotto</option>
        <option value=${product._id}>${product.name}</option>`;
    });
    deleteSelection.innerHTML = selection;
    res.slice().map((product) => (product, productsList));
});

deleteSelection.addEventListener('change', () => {
    const selectedValue = deleteSelection.value;

    confirmDeletion.addEventListener("click", () => {
        deleteProduct(selectedValue);
    });
});

closeDeleteModal.addEventListener("click", () => {
    deleteModal.close();
});