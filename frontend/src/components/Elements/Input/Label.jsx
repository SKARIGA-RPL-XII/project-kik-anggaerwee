const Label = (props) => {
    const { htmlFor, children } = props;
  return (
    <label
        htmlFor={htmlFor}
        name={htmlFor}
        className="leading-7 text-sm font-semibold">
        {children}
    </label>
  );
};

export default Label;
