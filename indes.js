import { initializeGlobalClickTracker } from "./events/globalClickTracker.js";
import { initializePageViewTracker } from "./events/pageViewsTracker.js";
import { initializeElementClickTracker } from "./events/elementClickTracker.js";
import { initializeElementsClickTracker } from "./events/elementsClickTracker.js";
import { initializeInactivityTracker } from "./events/inactivityTracker.js";

// Select Element
const $ = (query) => {
    return document.querySelector(query);
};

// [*]: Initialize User Clicks
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

// [*]: Initialize Page view tracker
initializePageViewTracker();

window.addEventListener("pageViewCount", (e) => {
    console.log(`[${e.detail.count}] Current URL:`, e.detail.currentUrl);
});

// [*]: Initialize element click tracker
initializeElementClickTracker("#click-elm-1", (count, element, event) => {
    element.innerText = "Clicked Me " + count + " times!";
});

initializeElementClickTracker("#click-elm-2", (count, element, event) => {
    element.innerText = "Clicked Me " + count + " times!";
});

// Check the Event
window.addEventListener("elementClicksCount", (e) => {
    console.log(`Clicked [${e.detail.count}]:`, e.detail.element);
});

// [*]: Initialize Elements click tracker
// Selector: button:not([id]) -> Every button without an ID
initializeElementsClickTracker("button:not([id])", (count, element, event) => {
    element.innerText = "Clicked Elements " + count + " times!";
});

// Check the Event
window.addEventListener("elementsClickCount", (e) => {
    console.log(`Clicked [${e.detail.count}]:`, e.detail.element);
});

// [*]: Initialize track Inactivity of Webpage
initializeInactivityTracker(
    4,
    (inactivityTime) => {
        console.log(
            "This is from Direct Callback. Time",
            inactivityTime,
            "seconds"
        );
    },
    true
);

// Check the Event
window.addEventListener("userInactivityDetected", (e) => {
    console.log(
        "This is from Event Listener Callback. Time",
        e.detail.inactivityTime,
        "seconds"
    );
});
