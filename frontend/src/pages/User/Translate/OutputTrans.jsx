import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "react-feather";

const InputTrans = (props) => {
  const {outputSelect, setOutputSelect, setInputSelect, languages, inputSelect} = props;
    const handleOutputChange = (selected) => {
      console.log("value language", languages)
      if (selected.value === inputSelect?.value) {
        // swap
        setInputSelect(outputSelect);
      }
    
      setOutputSelect(selected);
    };
    if (outputSelect === null ) {
    return <div className="relative w-full">
        <div className="w-full bg-white border rounded-md px-4 py-2 flex justify-between items-center">
          <span>No data available in Language</span>
        </div>
      </div>;
  }
  if ( !outputSelect) {
  return <div>Loading...</div>;
}
  return (
    <Listbox value={outputSelect} onChange={handleOutputChange}>
      <div className="relative w-full">
        <ListboxButton className="w-full bg-white border rounded-md px-4 py-2 flex justify-between items-center">
          <span>{outputSelect.label}</span>
          <ChevronDown size={16} />
        </ListboxButton>

        <ListboxOptions className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-50">
          {languages.map((lang) => (
            <ListboxOption
                          key={lang.value}
                          value={lang}
                          disabled={!lang.isactive}
                          className={({disabled}) => `px-4 py-2 ${disabled ? "cursor-not-allowed text-gray-400" : "cursor-pointer hover:bg-blue-100"}`}
                        >
                          {lang.label}
                        </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default InputTrans;
