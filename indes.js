import { initializeClickTracker } from "./events/clickTracker.js";
import { initializePageViewTracker } from "./events/pageViewsTracker.js";

// Select Element
const $ = (query) => {
    return document.querySelector(query);
};

// Initialize User Clicks
initializeClickTracker();

// Function to visualize the click/touch on the screen
function visualizeClick(position) {
    const marker = document.createElement("div");
    marker.classList.add("marker");

    // Set the position of the marker (center it on the click/touch)
    marker.style.left = `${position.x}px`;
    marker.style.top = `${position.y}px`;

    // Append the marker to the body
    document.body.appendChild(marker);
}

window.addEventListener("userClickCount", (e) => {
    $("#click-count").innerText = e.detail.count;
    visualizeClick(e.detail.currentPosition);
});

// Initialize Page view tracker
initializePageViewTracker();

window.addEventListener("pageViewCount", (e) => {
    console.log(`[${e.detail.count}] Current URL:`, e.detail.currentUrl);
});
