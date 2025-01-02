export const initializeGlobalClickTracker = () => {
    const trackUserClicks = (e) => {
        const currentClickPosition = {
            x: e.clientX,
            y: e.clientY,
        };

        const pastClickDetails =
            JSON.parse(
                sessionStorage.getItem("global-event-userGlobalClickDetails")
            ) ?? {};

        const newCount = parseInt(pastClickDetails.clickCount ?? 0) + 1;
        const newClickPositions = [
            ...(pastClickDetails.positions ?? []),
            currentClickPosition,
        ];

        sessionStorage.setItem(
            "global-event-userGlobalClickDetails",
            JSON.stringify({
                clickCount: newCount,
                positions: newClickPositions,
            })
        );

        const event = new CustomEvent("globalClickCount", {
            detail: {
                count: newCount,
                currentPosition: currentClickPosition,
                positions: newClickPositions,
            },
        });

        window.dispatchEvent(event);
    };

    window.addEventListener("click", trackUserClicks);
};
