export const capitaliseSentence = (sentence: string) => {
    const words = sentence.split(" ");

    return words
        .map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");
};
