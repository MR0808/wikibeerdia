import { Star } from "lucide-react";

const Rating = ({ rating }: { rating: number }) => {
    // rating = 2
    // 1 <= 2 true
    // 2 <= 2 true
    // 3 <= 2 false
    // ....
    const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);

    return (
        <div className="flex items-center gap-x-1">
            {stars.map((isFilled, i) => {
                const className = `w-3 h-3`;
                return isFilled ? (
                    <Star fill="#000000" className={className} key={i} />
                ) : (
                    <Star className={className} key={i} />
                );
            })}
        </div>
    );
};

export default Rating;
