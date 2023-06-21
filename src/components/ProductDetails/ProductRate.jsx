import { Rating } from "@mui/material";

const ProductRate = ({ rate, setNewRate, readonly }) => {
    return (
        <Rating
            name="read-only"
            sx={{
                "& .MuiRating-iconFilled": {
                    color: "hsl(57, 100%, 50%)",
                },
                "& .MuiRating-iconEmpty": {
                    color: "hsl(57, 100%, 50%)",
                },
            }}
            value={rate}
            precision={readonly ? 0.5 : 1}
            readOnly={readonly}
            onChange={(e, newRate) => {
                setNewRate(newRate);
            }}
        />
    );
};

export default ProductRate;
