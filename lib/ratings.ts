const getRatings = (ratings: number[]) => {
    const count = (arr: number[], element: number) => {
        return arr.filter((ele: number) => ele == element).length;
    };

    const ratingValues = {
        1: count(ratings, 1),
        2: count(ratings, 2),
        3: count(ratings, 3),
        4: count(ratings, 4),
        5: count(ratings, 5)
    };
    return ratingValues;
};

export default getRatings;
