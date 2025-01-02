import { initializeGlobalClickTracker } from "./events/globalClickTracker.js";
import { initializePageViewTracker } from "./events/pageViewsTracker.js";
import { initializeElementClickTracker } from "./events/elementClickTracker.js";

// Select Element
const $ = (query) => {
    return document.querySelector(query);
};

// Initialize User Clicks
initializeGlobalClickTracker();

// Function to visualize the click/touch on the screen
function visualizeClick(position) {
    const marker = document.createElement("div");
    marker.classList.add("marker");

    // Set the position of the marker (center it on the click/touch)
    marker.style.left = `${position?.x}px`;
    marker.style.top = `${position?.y}px`;

    // Append the marker to the body
    document.body.appendChild(marker);
}

window.addEventListener("globalClickCount", (e) => {
    $("#click-count").innerText = e.detail.count;
    // visualizeClick(e.detail.currentPosition);
});

// Initialize Page view tracker
initializePageViewTracker();

window.addEventListener("pageViewCount", (e) => {
    console.log(`[${e.detail.count}] Current URL:`, e.detail.currentUrl);
});

// Initialize element click tracker
initializeElementClickTracker("#click-elm-1", (count, element, event) => {
    element.innerText = "Clicked Me " + count + " times!";
});

initializeElementClickTracker("#click-elm-2", (count, element, event) => {
    element.innerText = "Clicked Me " + count + " times!";
});

// Check the Event
window.addEventListener("elementsClickCount", (e) => {
    console.log(`Clicked [${e.detail.count}]:`, e.detail.element);
});
