// DOM Elements
const uploadBtn = document.querySelector(".upload-btn");
const loaderBtn = document.querySelector(".loaderbtn");
const uploadIcon = document.querySelector(".upload-icon");
const fileInput = document.getElementById("logoUpload");
const uploadText = document.querySelector(".upload-text");
const removeFileBtn = document.querySelector(".remove-file");
const umbrellaImage = document.querySelector(".umbrella-image");
const loader = document.querySelector(".loader");

// Color configuration
const colors = ["Blue", "Pink", "Yellow"];
const LOADING_DELAY = 1000; // 1 second delay for loading animations
const MAX_LOGO_WIDTH = 700;
const MAX_LOGO_HEIGHT = 250;


  //  COLOR SELECTION FUNCTIONALITY


// Handle color selection changes
document.querySelector(".color-options").addEventListener("click", function (e) {
  const clickedElement = e.target;
  
  // Only proceed if a color circle was clicked
  if (clickedElement.classList.contains("circle")) {
    const body = document.body;
    const currentLogo = document.querySelector(".logo-preview");
    const selectedColor = clickedElement.classList[1]; // Get the color name
    
    // Reset umbrella and show loading state
    umbrellaImage.src = "";
    umbrellaImage.alt = "";
    loader.classList.remove("hidden");
    loaderBtn.classList.remove("hidden");
    uploadIcon.classList.add("visible");
    
    // Hide logo during transition if it exists
    if (currentLogo) currentLogo.classList.add("hidden");
    
    // Reset body background and button color classes
    body.className = "";
    colors.forEach(color => {
      uploadBtn.classList.remove(color);
    });
    
    // Apply new color scheme
    body.classList.add(`${selectedColor}-lightbg`);
    uploadBtn.classList.add(selectedColor);
    
    // Update color selection indicators
    updateColorSelectionUI(clickedElement, selectedColor);
    
    // Load new umbrella image after delay
    setTimeout(() => {
      umbrellaImage.src = `./images/${selectedColor} umbrella.png`;
      umbrellaImage.alt = `${selectedColor} Umbrella`;
    }, LOADING_DELAY);
    
    // Handle when new image finishes loading
    umbrellaImage.onload = () => {
      loader.classList.add("hidden");
      loaderBtn.classList.add("hidden");
      uploadIcon.classList.remove("visible");
      if (currentLogo) currentLogo.classList.remove("hidden");
    };
  }
});

// Update visual indicators for selected color
function updateColorSelectionUI(selectedCircle, color) {
  // Reset all circles
  document.querySelectorAll(".circle").forEach(circle => {
    circle.className = `circle ${circle.classList[1]}`;
    const existingIndicator = circle.querySelector(".small-circle");
    if (existingIndicator) existingIndicator.remove();
  });
  
  // Add selection indicator to clicked circle
  selectedCircle.classList.add(`${color}-light`);
  const selectionIndicator = document.createElement("span");
  selectionIndicator.classList.add("small-circle", color);
  selectedCircle.appendChild(selectionIndicator);
}

/* ------------------------------
   FILE UPLOAD FUNCTIONALITY
------------------------------- */

// Trigger file input when button is clicked
uploadBtn.addEventListener("click", () => fileInput.click());

// Handle file selection
fileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  
  // Show loading state
  showLoadingState(file.name);
  
  // Create image preview
  createLogoPreview(file);
});

// Remove uploaded file
removeFileBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  resetFileUpload();
});

// Show loading state during file processing
function showLoadingState(filename) {
  umbrellaImage.src = "";
  umbrellaImage.alt = "";
  loader.classList.remove("hidden");
  loaderBtn.classList.remove("hidden");
  uploadIcon.classList.add("visible");
  uploadText.textContent = filename;
  removeFileBtn.classList.remove("hidden");
}

// Create preview of uploaded logo
function createLogoPreview(file) {
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);
  
  img.onload = function () {
    setTimeout(() => {
      // Hide loading indicators
      loader.classList.add("hidden");
      loaderBtn.classList.add("hidden");
      uploadIcon.classList.remove("visible");
      
      // Restore umbrella image
      const currentColor = document.querySelector(".circle.selected")?.classList[1] || "Blue";
      umbrellaImage.src = `./images/${currentColor} umbrella.png`;
      umbrellaImage.alt = `${currentColor} Umbrella with Logo`;
      
      // Check image dimensions
      if (img.width > MAX_LOGO_WIDTH || img.height > MAX_LOGO_HEIGHT) {
        alert("Image must be 700x250px or smaller.");
        resetFileUpload();
        return;
      }
      
      // Remove existing preview if exists
      const existingPreview = document.querySelector(".logo-preview");
      if (existingPreview) existingPreview.remove();
      
      // Create new preview
      const preview = document.createElement("img");
      preview.src = objectUrl;
      preview.classList.add("logo-preview");
      preview.alt = "Uploaded Logo Preview";
      document.querySelector(".umbrella-wrapper").appendChild(preview);
      
      // Clean up object URL
      URL.revokeObjectURL(objectUrl);
    }, LOADING_DELAY * 2); // Longer delay for file processing
  };
  
  img.src = objectUrl;
}

// Reset file upload to initial state
function resetFileUpload() {
  fileInput.value = "";
  uploadText.textContent = "Upload Logo";
  removeFileBtn.classList.add("hidden");
  
  const existingPreview = document.querySelector(".logo-preview");
  if (existingPreview) existingPreview.remove();
}

/* ------------------------------
   INITIALIZATION
------------------------------- */

// Initialize with first color selected
window.addEventListener("DOMContentLoaded", () => {
  const firstColorOption = document.querySelector(".circle");
  if (firstColorOption) firstColorOption.click();
});
// const uploadBtn = document.querySelector(".upload-btn");
// const loaderbtn = document.querySelector(".loaderbtn");
// const uploadIcon = document.querySelector(".upload-icon");
// const colors = ["Blue", "Pink", "Yellow"];
// document
//   .querySelector(".color-options")
//   .addEventListener("click", function (e) {
//     const body = document.querySelector("body");
//     const circle = e.target;

//     if (circle.classList.contains("circle")) {
//       const umbrella = document.querySelector(".umbrella-image");
//       const loader = document.querySelector(".loader");

//       const logo = document.querySelector(".logo-preview");
//       umbrella.setAttribute("src", "");
//       umbrella.setAttribute("alt", "");

//       loader.classList.remove("hidden");
//       loaderbtn.classList.remove("hidden");
//       uploadIcon.classList.add("visible");
//       if (logo) logo.classList.add("hidden");
//       body.className = "";

//       colors.forEach((color) => {
//         uploadBtn.classList.remove(color);
//       });
//       const color = circle.classList[1];
//       body.classList.add(`${color}-lightbg`);
//       uploadBtn.classList.add(color);

//       setTimeout(() => {
//         umbrella.src = `./images/${color} umbrella.png`;
//         umbrella.setAttribute("alt", "Umbrella Image");
//       }, 1000);
//       document.querySelectorAll(".circle").forEach((el) => {
//         el.className = `circle ${el.classList[1]}`; // remove any light class or inner circle
//         const existing = el.querySelector(".small-circle");
//         if (existing) existing.remove();
//       });

//       circle.classList.add(`${color}-light`);
//       const innerCircle = document.createElement("span");
//       innerCircle.classList.add("small-circle", color);
//       circle.appendChild(innerCircle);

//       umbrella.onload = () => {
//         loader.classList.add("hidden");
//         loaderbtn.classList.add("hidden");
//         uploadIcon.classList.remove("visible");
//         if (logo) logo.classList.remove("hidden");
//       };
//     }
//   });
// window.addEventListener("DOMContentLoaded", () => {
//   const firstCircle = document.querySelector(".circle");
//   if (firstCircle) firstCircle.click();
// });

// const fileInput = document.getElementById("logoUpload");
// const leftSection = document.querySelector(".left");
// const uploadText = document.querySelector(".upload-text");
// const removeFileBtn = document.querySelector(".remove-file");
// uploadBtn.addEventListener("click", () => {
//   fileInput.click();
// });

// fileInput.addEventListener("change", function () {
//   const file = this.files[0];
//   if (!file) return;
//   const umbrella = document.querySelector(".umbrella-image");
//   const image = umbrella.getAttribute("src");
//   umbrella.setAttribute("src", "");
//   umbrella.setAttribute("alt", "");
//   const loader = document.querySelector(".loader");
//   loader.classList.remove("hidden");
//   loaderbtn.classList.remove("hidden");
//   uploadIcon.classList.add("visible");
//  uploadText.textContent = file.name;
//   removeFileBtn.classList.remove("hidden");

//   const img = new Image();
//   const objectUrl = URL.createObjectURL(file);

//   img.onload = function () {
//     setTimeout(() => {
//       loader.classList.add("hidden");
//       loaderbtn.classList.add("hidden");
//       uploadIcon.classList.remove("visible");
//       umbrella.setAttribute("src", image);
//       umbrella.setAttribute("alt", "Umbrella Image");
//       if (img.width <= 700 && img.height <= 250) {
//         const existing = document.querySelector(".logo-preview");
//         if (existing) existing.remove();

//         const preview = document.createElement("img");
//         preview.src = objectUrl;
//         preview.classList.add("logo-preview");
//         const wrapper = document.querySelector(".umbrella-wrapper");
//         wrapper.appendChild(preview);
//       } else {
//         alert("Image must be 700x250px or smaller.");
//       }
//       URL.revokeObjectURL(objectUrl);
//     }, 2000);
//   };

//   img.src = objectUrl;
// });
// removeFileBtn.addEventListener("click", function (e) {
//   e.stopPropagation();
//   fileInput.value = ""; // reset input
//   uploadText.textContent = "Upload Logo"; // reset button text
//   removeFileBtn.classList.add("hidden");

//   // Remove logo preview if exists
//   const existing = document.querySelector(".logo-preview");
//   if (existing) existing.remove();
// });

