const API_KEY = 'nQO2c7IdRr32Y91GWtYHhm0TFn5QxxxU7xBXR7JmgZdanCBHgsjXL2Oq';
const photoContainer = document.getElementById('photoContainer');
const favoritesList = document.getElementById('favorites_list');
const maxFavorites = 5;

// Function to fetch images from Pexels API
async function fetchImages() {
    try {
        const response = await fetch(`https://api.pexels.com/v1/curated?per_page=10`, {
            headers: {
                Authorization: API_KEY
            }
        });
        const data = await response.json();
        const photos = data.photos;
        photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.src.medium; // You can choose different sizes (small, medium, large)
            img.alt = photo.photographer;
            img.classList.add('photo');
            photoContainer.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

fetchImages();




const photos = document.querySelectorAll('.photo');
let currentPhotoIndex = 0;

function showPhoto(index) {
    photos.forEach(photo => {
        photo.style.display = 'none';
    });
    photos[index].style.display = 'block';
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    showPhoto(currentPhotoIndex);
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    showPhoto(currentPhotoIndex);
}

showPhoto(0);

document.addEventListener("DOMContentLoaded", function() {
    let favoritesList = document.getElementById("favorites_list");
    let maxFavorites = 5;

    photos.forEach(photo => {
        photo.addEventListener("click", function(event) {
            if (event.target.tagName === "IMG") {
                let newWindow = window.open("", "_blank");

                let alertMsg = document.createElement("p");
                alertMsg.textContent = "You can only add a maximum of 5 favorites. Please remove at least one favorite first.";
                alertMsg.style.color = "red";
                alertMsg.style.display = "none";

                let addButton = document.createElement("button");
                addButton.textContent = "Add to Favorites";
                addButton.addEventListener("click", function() {
                    if (favoritesList.children.length < maxFavorites) {
                        let favoriteImage = document.createElement("img");
                        favoriteImage.src = event.target.src;
                        favoritesList.appendChild(favoriteImage);
                        newWindow.close();
                    } else {
                        alertMsg.style.display = "block";
                    }
                });

                let imgContainer = document.createElement("div");
                imgContainer.style.textAlign = "center";
                let clonedImage = event.target.cloneNode();
                clonedImage.style.width = "700px";
                clonedImage.style.height = "600px";
                imgContainer.appendChild(clonedImage);
                imgContainer.appendChild(document.createElement("br"));
                imgContainer.appendChild(addButton);
                imgContainer.appendChild(alertMsg);
                newWindow.document.body.appendChild(imgContainer);
            }
        });
    });

    favoritesList.addEventListener("click", function(event) {
        if (event.target.tagName === "IMG") {
            if (!event.target.nextSibling || event.target.nextSibling.tagName !== "BUTTON") {
                let removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.addEventListener("click", function() {
                    event.target.remove();
                    removeButton.remove();
                });

                event.target.parentNode.appendChild(removeButton);
            }
        }
    });
});