
export const getDhakaDate = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const dhakaTime = new Date(utc + (360 * 60000));
    return dhakaTime;
};
