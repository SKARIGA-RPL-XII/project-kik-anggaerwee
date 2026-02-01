import { Children } from "react";

const Button = (props) => {
    const {children, onClick = () => {}, type = "button"} = props;
    return (
        <button 
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 mt-5 text-white rounded-md cursor-pointer"
            type={type}
            onClick={() => onClick()}
        >
            {children}
          </button>
    )
}

export default Button;