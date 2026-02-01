const Input = (props) => {
    const { type, placeholder, name } = props;
    return(
        <input
        type={type}
        className="w-full border border-slate-400 rounded-md py-2 px-6 focus:ring-2 focus:ring-blue-500 outline-none placeholder: opacity-50"
        placeholder={placeholder}
        name={name}
      />
    )
}

export default Input;