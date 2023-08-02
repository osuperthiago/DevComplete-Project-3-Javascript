

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



//Page Load

menuHandler();
greetingHandler ();
clickHandler();
galleryHandler();





