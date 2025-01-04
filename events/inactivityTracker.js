export const initializeInactivityTracker = (
    waitSeconds = 60,
    callback = (inactivityTime) => {},
    loopTracker = false
) => {
    const INACTIVITY_LIMIT = waitSeconds * 1000; // Convert Seconds to Milliseconds

    let inactivityTimer;
    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        const event = new CustomEvent("userInactivityDetected", {
            detail: {
                inactivityTime: waitSeconds,
            },
        });

        inactivityTimer = setTimeout(() => {
            callback(waitSeconds);
            window.dispatchEvent(event);
            if (loopTracker) {
                initializeInactivityTracker(waitSeconds);
            }
        }, INACTIVITY_LIMIT);
    };

    // Start the Tracker when Function called
    resetInactivityTimer();

    // Listen for movement Events
    window.addEventListener("click", resetInactivityTimer);
    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);
    window.addEventListener("scroll", resetInactivityTimer);
};
