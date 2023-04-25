const productId = document.createElement("p");
const spinLoader = document.getElementById("spin-loader");
const productContainer = document.getElementById("container");
let arrayData = [];

const showSpinner = () => {
    spinLoader.style.display = ("block")
};
const hideSpinner = () => {
    spinLoader.style.display = ("none")
};

const getToken = async () => {
    let token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
        const credentials = {
            username: 'matteo.dev@outlook.com',
            password: '870621345bvb.96.',
        };
        try {
            const data = await fetch(
                'https://striveschool-api.herokuapp.com/api/account/login',
                {
                    headers: {
                        'Content-type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(credentials),
                }
            );

            const response = await data.json();

            const { access_token } = response;
            localStorage.setItem('token', JSON.stringify(access_token));
            token = access_token;
        } catch (error) {
            console.log(error);
        }
    }
    return token;
}

const getData = async () => {
    showSpinner();

  
    let token = JSON.parse(localStorage.getItem('token'));

    if (!token) {
        await getToken().then((response) => (token = response));
    }

    try {
        let response = await fetch(
            'https://striveschool-api.herokuapp.com/api/product/',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        let data = await response.json();

        arrayData = data;
        arrayData.forEach((item, i) => {

            let cardContainerA = document.createElement("a");
            let card = document.createElement("div");
            let productDetails = document.createElement("div");
            let productImg = document.createElement("img");
            let productName = document.createElement("h5");
            let productBrand = document.createElement("h6");
            let productDescription = document.createElement("p");
            let productPrice = document.createElement("b");
            const productId = document.createElement("p");

            cardContainerA.classList.add("product-link");
            cardContainerA.setAttribute("href", `Dettaglio/dettaglio.html?id=`+item._id);
            productDetails.classList.add("product-details");
            card.classList.add("card-body");
            productImg.classList.add("product-image");
            productName.classList.add("product-name");
            productBrand.classList.add("product-brand");
            productDescription.classList.add("product-description");
            productPrice.classList.add("product-price");
            productId.classList.add("product-id");
            productId.style.display = ("none");

            productContainer.appendChild(cardContainerA)
            cardContainerA.appendChild(card);
            card.appendChild(productImg);
            card.appendChild(productDetails);
            productDetails.appendChild(productName);
            productDetails.appendChild(productBrand);
            productDetails.appendChild(productDescription);
            productDetails.appendChild(productPrice);
            productDetails.appendChild(productId);

            productId.innerText = item._id;
            productImg.src = item.imageUrl;
            productName.innerText = item.name;
            productBrand.innerText = item.brand;
            productDescription.innerText = item.description;
            productPrice.innerText = "€" + item.price;

        });       
        hideSpinner();
        return response;
    } catch (error) {
        console.log(error);
    }
}
getData()



