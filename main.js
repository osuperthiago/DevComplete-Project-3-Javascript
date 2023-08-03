

const galleryImages = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    },
];

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
];

//Menu Section

function menuHandler (){

document.querySelector("#open-nav-menu").addEventListener("click", function(){
    document.querySelector("header nav .wrapper").classList.add("nav-open")
})

document.querySelector("#close-nav-menu").addEventListener("click", function(){
    document.querySelector("header nav .wrapper").classList.remove("nav-open")
})

}

function celciusToFahr(temperature){
    let farh = (temperature * 9/5) + 32
    return farh;
}

//Greeting Section

function greetingHandler (){

    let currentHour = new Date ().getHours();
let greetingText;

if (currentHour < 12){
    greetingText = "Good Morning.";
} else if (currentHour < 19){
    greetingText = "Good Afternoon.";
} else if (currentHour < 24){
    greetingText = "Good Night.";
} else {
    greetingText = " Out of Time in the day, somehow.";
}

const weatherCondition = "rainsss";
const userLocation = "New jersey";
let temperature = 0.1717;

let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1)}°C outside.`;
let fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celciusToFahr(temperature).toFixed(1)}°F outside.`;

document.querySelector("#greeting").innerHTML = greetingText;
document.querySelector("p#weather").innerHTML = celsiusText;

document.querySelector(".weather-group").addEventListener("click", function(e) {
    if (e.target.id == "celsius") {
        document.querySelector("p#weather").innerHTML = celsiusText;
    } else if (e.target.id == "fahr") {
        document.querySelector("p#weather").innerHTML = fahrText;
    }

});


}

//Local Time Section

function clickHandler(){
    setInterval(function(){
        let localTime = new Date ();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,"0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,"0");
    },1000);
   
}

// Gallery Section

function galleryHandler(){

    let mainImage = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");
     
    
    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;
    
    galleryImages.forEach(function(image,index){
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.setected = index === 0 ? true : false;
    
        thumb.addEventListener("click", function(e){
            let selectecIndex = e.target.dataset.arrayIndex;
            let selectedImage = galleryImages[selectecIndex];
            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;
            thumbnails.querySelectorAll("img").forEach(function(img){
                img.dataset.setected = false;
            })
            e.target.dataset.setected = true;
        });
    
        thumbnails.appendChild(thumb);
    });

}

//Products section

function populateProducts(productList) {

    let productsSection = document.querySelector(".products-area");

    //apaga a lista antes de formar uma nova para nao ficar acumulando
    productsSection.textContent = "";

        // Run a loop through products and create an HTML element ("product-item") for each of them
        productList.forEach(function(product,index){

            // create the HTML elemtn for the individual product
            let productElm = document.createElement("div");
            productElm.classList.add("product-item");
    
            //create the product image
            let productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = "Image for " + product.title;
    
            //create the product details section
            let productDetails = document.createElement("div");
            productDetails.classList.add("product-details");
    
            // create product title, author, price-tielt and price
            let productTitle = document.createElement("h3");
            productTitle.classList.add("product-title");
            productTitle.textContent = product.title;
    
            let productAuthor = document.createElement("p");
            productAuthor.classList.add("product-author");
            productAuthor.textContent = product.author;
    
            let pricetitle= document.createElement("p");
            pricetitle.classList.add("price-title");
            pricetitle.textContent = "Price";
    
            let productPrice= document.createElement("p");
            productPrice.classList.add("product-price");
            productPrice.textContent = product.price > 0 ? "$ " + product.price.toFixed(2) : "Free" ;
    
            //append the product details
            productDetails.append(productTitle);
            productDetails.append(productAuthor);
            productDetails.append(pricetitle);
            productDetails.append(productPrice);
    
            //Add all child HTML element of the product
            productElm.append(productImage);
            productElm.append(productDetails);
    
            //Add complete individual product to the section
            productsSection.append(productElm);
            
        });

}


function productsHander (){

    let freeProducts = products.filter(function(item){
        return item.price <=0 || !item.price;
    });

    let paidProducts = products.filter(function(item){
        return item.price >0;
    });

    populateProducts(products);

    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;

    let productsFilter = document.querySelector(".products-filter");
    productsFilter.addEventListener("click", function(e){
        if (e.target.id == "all") {
            populateProducts(products);
        } else if(e.target.id == "paid"){
            populateProducts(paidProducts);
        } else if (e.target.id == "free") {
            populateProducts(freeProducts);
        }
    });

}

function footerHanlder (){

    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `© ${currentYear} - All rights reserved`;

}



//Page Load

menuHandler();
greetingHandler ();
clickHandler();
galleryHandler();
productsHander ();
footerHanlder ();





