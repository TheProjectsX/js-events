import { useEffect, useState } from "react";

export default function useElementClickTracker(query) {
    const [clickData, setClickData] = useState({
        count: 0,
        element: null,
        event: null,
    });

    const handleElementClicked = (event) =>
        setClickData((prev) => ({
            count: prev.count + 1,
            element: event.target,
            event: event,
        }));

    useEffect(() => {
        const element = document.querySelector(query);
        if (!element) return;

        const handleElementClicked = (event) => {
            setClickData((prev) => ({
                count: prev.count + 1,
                element: event.target,
                event: event,
            }));
        };

        element.addEventListener("click", handleElementClicked);

        return () => {
            element.removeEventListener("click", handleElementClicked);
        };
    }, [query]);

    return { ...clickData, elementClicked: handleElementClicked };
}
