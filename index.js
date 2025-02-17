import { initializeGlobalClickTracker } from "./events/globalClickTracker.js";
import { initializePageViewTracker } from "./events/pageViewsTracker.js";
import { initializeElementClickTracker } from "./events/elementClickTracker.js";
import { initializeElementsClickTracker } from "./events/elementsClickTracker.js";
import { initializeInactivityTracker } from "./events/inactivityTracker.js";
import { initializeScrollTracker } from "./events/scrollTracker.js";
import { initializeUserTime, getUserTime } from "./events/userVisitTime.js";
import { initializeElementVisibilityTracker } from "./events/elementVisibilityTracker.js";
import { initializeKeyCombinationTracker } from "./events/keyCombinationTracker.js";
import { initializeNetworkStatusTracker } from "./events/networkStatusTracker.js";

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
// Stopping from Checking Inactivity. (We are developing now, man!)
// initializeInactivityTracker(
//     4,
//     (inactivityTime) => {
//         console.log(
//             "This is from Direct Callback. Time",
//             inactivityTime,
//             "seconds"
//         );
//     },
//     true
// );

// Check the Event
window.addEventListener("userInactivityDetected", (e) => {
    console.log(
        "This is from Event Listener Callback. Time",
        e.detail.inactivityTime,
        "seconds"
    );
});

// [*]: Initialize track scroll of webpage
initializeScrollTracker();

// Check the Event
window.addEventListener("scrolled", (e) => {
    // console.table({
    //     percentage: e.detail.percentage,
    //     pixels: e.detail.pixels,
    //     pageHeight: e.detail.pageHeight,
    // });
    console.log(e.detail);
    $("#scrollIndicator").innerText = `${e.detail.percentage}%`;
});

// [*]: Initialize user visit time
initializeUserTime();

// Check user Visit Time
setTimeout(() => {
    const visitTime = getUserTime();

    console.log(visitTime);
}, 1500);

// [*]: Initialize Element Visibility Tracker
initializeElementVisibilityTracker("#isVisible", (element, isVisible) => {
    if (isVisible) {
        console.log(element, "is Visible (From callback)");
    }
});

// Check Event
window.addEventListener("elementVisible", (e) => {
    if (e.detail.isVisible) {
        console.log(e.detail.element, "is Visible (From event)");
    }
});

// [*]: Initialize key combination tracker
initializeKeyCombinationTracker(["alt", "ctrl", "k"], (keys, event) => {
    console.log("Keys pressed!", keys);
});

// Check Event
window.addEventListener("keyCombinationPressed", (e) => {
    $("#keyCombinations").innerHTML = `Pressed: ${e.detail.keys.map(
        (key) => `<kbd>${key}</kbd>`
    )}`;
    $("#keyCombinations").style.display = "block";
});

// [*]: Initialize Network status Stacker
initializeNetworkStatusTracker((status) =>
    console.log("Status from callback:", status)
);

// Check Event
window.addEventListener("networkStatusChange", (e) => {
    $("#networkStatus").innerText = `Network Status: ${e.detail.status}`;
});
