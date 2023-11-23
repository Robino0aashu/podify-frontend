import {Link} from "react-router-dom";

const TextWithHover = ({displayText, active, targetLink, onClick}) => {
    return (
        <button onClick={onClick}>
            <Link to={targetLink}>
            <div className="flex items-center justify-start cursor-pointer">
            <div
                className={`${
                    active ? "text-white" : "text-gray-500"
                } font-semibold hover:text-white`}
            >
                {displayText}
            </div>
        </div>
        </Link>
        </button>
        
        
    );
};

export default TextWithHover;
