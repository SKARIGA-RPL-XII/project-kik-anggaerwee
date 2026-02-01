import Input from "./Input";
const Label = (props) => {
    const { text } = props;
  return (
    <label htmlFor="" className="flex items-center gap-2">
      <Input />
      {text}
    </label>
  );
};

export default Label;
