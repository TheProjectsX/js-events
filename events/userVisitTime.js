export const initializeUserTime = () => {
    sessionStorage.setItem("global-events-userVisitTime", new Date().toJSON());
};

export const getUserTime = () => {
    const userVisitTime = sessionStorage.getItem("global-events-userVisitTime");
    if (!userVisitTime) return null;

    const currentTime = new Date();
    const userVisitTimeObj = new Date(userVisitTime);

    const visitTimeInMill = currentTime - userVisitTimeObj;

    const visitTimeInSec = Math.floor(visitTimeInMill / 1000);

    return {
        seconds: visitTimeInSec,
        milliseconds: visitTimeInMill,
    };
};
