import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Breadcrumb = (props) => {
    const {type, subtype} = props;
  return (
    <nav className="flex m-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
          >
            {type}
          </a>
        </li>
        <li>
          <div className="flex items-center space-x-1.5">
            <i className="fa-solid fa-angle-right"></i>
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
            >
              {subtype}
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
