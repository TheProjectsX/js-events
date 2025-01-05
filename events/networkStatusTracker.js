export const initializeNetworkStatusTracker = (callback = (status) => {}) => {
    const checkNetworkStatus = () => {
        const status = navigator.onLine ? "online" : "offline";

        // Run Callback
        callback(status);

        // Dispatch Event
        const event = new CustomEvent("networkStatusChange", {
            detail: { status },
        });
        window.dispatchEvent(event);
    };

    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    // Initial check
    checkNetworkStatus();
};
