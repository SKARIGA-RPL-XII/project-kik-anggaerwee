import Label from './Label.jsx';
import Input from './Input.jsx';

const InputForm = (props) => {
    const { title, name, type, placeholder } = props;
    return(
        <div className="flex flex-col mt-6">
            <Label htmlFor={name} >{title}</Label>
            <Input type={type} name={name} placeholder={placeholder}/>
        </div>
    )
}

export default InputForm;