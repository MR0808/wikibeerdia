const getYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    return Number(year);
};

export default getYear;
