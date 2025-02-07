import { useEffect, useState } from "react";

const useGlobalClickTracker = () => {
    const [clickDetails, setClickDetails] = useState({
        count: 0,
        currentPosition: {},
        positions: [],
    });

    const handleGlobalClickEvent = (e) => {
        const currentClickPosition = {
            x: e.clientX,
            y: e.clientY,
        };

        setClickDetails((prev) => ({
            count: prev.count + 1,
            currentPosition: currentClickPosition,
            positions: [...prev.positions, currentClickPosition],
        }));
    };

    useEffect(() => {
        window.addEventListener("click", handleGlobalClickEvent);

        return () => {
            window.removeEventListener("click", handleGlobalClickEvent);
        };
    }, []);

    return clickDetails;
};

export default useGlobalClickTracker;
