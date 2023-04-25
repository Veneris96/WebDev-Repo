const spinLoader = document.getElementById("spin-loader");
const productContainer = document.getElementById("details-container")
const parsedVariable = new URLSearchParams(window.location.search);
const id = parsedVariable.get("id")
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
getToken()


getItemId(id)

function getItemId(productId) {
    showSpinner();

    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
        getToken().then((response) => (token = response));
    }

    fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkYmE1MWFhMDUwYTAwMTRmYjA5MDkiLCJpYXQiOjE2ODI0MzEyNTgsImV4cCI6MTY4MzY0MDg1OH0.mBvakiaKSc2DfmVuYg_8V8NXewM9ZgiVG3ZvMlTTRkI`
        }
    }).then((response) => {
        response.json().then((data) => {
            console.log(data);
            arrayData.push(data)
            arrayData.forEach((item, i) => {
                
                let card = document.createElement("div");
                            let productDetails = document.createElement("div");
                            let productImg = document.createElement("img");
                            let productName = document.createElement("h2");
                            let productBrand = document.createElement("h3");
                            let productDescription = document.createElement("p");
                            let productPrice = document.createElement("b");
                
                            productDetails.classList.add("product-details");
                            card.classList.add("card-body");
                            productImg.classList.add("product-image");
                            productName.classList.add("product-name");
                            productBrand.classList.add("product-brand");
                            productDescription.classList.add("product-description");
                            productPrice.classList.add("product-price");
                
                            productContainer.appendChild(card)
                            card.appendChild(productImg);
                            card.appendChild(productDetails);
                            productDetails.appendChild(productName);
                            productDetails.appendChild(productBrand);
                            productDetails.appendChild(productDescription);
                            productDetails.appendChild(productPrice);
                
                            productImg.src = item.imageUrl;
                            productName.innerText = item.name;
                            productBrand.innerText = item.brand;
                            productDescription.innerText = item.description;
                            productPrice.innerText = "€" + item.price;
            });
        });
        hideSpinner();
    }).catch((error) => {
        alert("C'è un errore: " + error)
        console.log("C'è un errore: " + error)
    });
};




// const getItemId = async (productId)  => {
//     let token = JSON.parse(localStorage.getItem("token"));
//     if (!token) {
//         await getToken().then((response) => (token = response));
//     }
    
//     try {
//         const response =await fetch ("https://striveschool-api.herokuapp.com/api/product/" + productId, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//         });
//         const data = await response.json();
//         console.log(data);
//         arrayData = data.Object;
//         arrayData.forEach((item, i) => {
            
//             let card = document.createElement("div");
//             let productDetails = document.createElement("div");
//             let productImg = document.createElement("img");
//             let productName = document.createElement("h5");
//             let productBrand = document.createElement("h6");
//             let productDescription = document.createElement("p");
//             let productPrice = document.createElement("b");

//             productDetails.classList.add("product-details");
//             card.classList.add("card-body");
//             productImg.classList.add("product-image");
//             productName.classList.add("product-name");
//             productBrand.classList.add("product-brand");
//             productDescription.classList.add("product-description");
//             productPrice.classList.add("product-price");

//             productContainer.appendChild(card)
//             card.appendChild(productImg);
//             card.appendChild(productDetails);
//             productDetails.appendChild(productName);
//             productDetails.appendChild(productBrand);
//             productDetails.appendChild(productDescription);
//             productDetails.appendChild(productPrice);

//             productImg.src = item.imageUrl;
//             productName.innerText = item.name;
//             productBrand.innerText = item.brand;
//             productDescription.innerText = item.description;
//             productPrice.innerText = "€" + item.price;
//         });
//     } catch (error) {
//         alert("C'è un errore: " + error)
//     };
// };
// getItemId(id)
