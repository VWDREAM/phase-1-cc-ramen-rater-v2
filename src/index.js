// index.js
console.log("JavaScript file loaded successfully!");

// Callbacks

export function handleClick(ramen) {
  const detailImg = document.querySelector('#ramen-detail > .detail-image');
  const detailName = document.querySelector('#ramen-detail > .name');
  const detailRestaurant = document.querySelector('#ramen-detail > .restaurant');
  const detailsRating = document.getElementById('rating-display');
  const detailsComment = document.getElementById('comment-display');

  if (detailImg && detailName && detailRestaurant && detailsRating && detailsComment) {
      detailImg.src = ramen.image;
      detailName.textContent = ramen.name;
      detailRestaurant.textContent = ramen.restaurant;
      detailsRating.textContent = ramen.rating;
      detailsComment.textContent = ramen.comment;
  } else {
      console.error("One or more detail elements not found.");
  }
}

const addSubmitListener = () => {
    const form = document.getElementById("new-ramen");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = form.name.value;
        const restaurant = form.restaurant.value;
        const image = form.image.value;
        const rating = form.rating.value;
        const comment = form.comment.value;
        const newRamen = { name, image, restaurant, rating, comment, id: 10000 };

        const ramenMenu = document.getElementById("ramen-menu");
        const img = document.createElement("img");
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.id = "new-image";
        ramenMenu.appendChild(img);

        // Add click event listener to the new image
        img.addEventListener("click", () => {
            handleClick(newRamen); // Pass the newRamen object.
        });
    });
};

const displayRamens = () => {
    fetch("http://localhost:3000/ramens")
        .then(response => response.json())
        .then(ramens => {
            const ramenMenu = document.getElementById("ramen-menu");

            ramens.forEach(ramen => {
                const img = document.createElement("img");
                img.src = ramen.image;
                img.alt = ramen.name;
                img.dataset.id = ramen.id; // Add dataset id

                img.addEventListener("click", function() {
                    handleClick(ramen);
                });

                ramenMenu.appendChild(img);
            });
        });
};

const main = () => {
    displayRamens();
    addSubmitListener();
};

// Ensure the DOM is fully loaded before running main
document.addEventListener("DOMContentLoaded", main);

// Export functions for testing
export {
    displayRamens,
    addSubmitListener,
    handleClick,
    main,
};
