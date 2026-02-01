const Breadcrumb = (props) => {
    const {type, subtype} = props;
  return (
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
          <a
            href="#"
            class="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
          >
            {type}
          </a>
        </li>
        <li>
          <div class="flex items-center space-x-1.5">
            <svg
              class="w-3.5 h-3.5 rtl:rotate-180 text-body"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m9 5 7 7-7 7"
              />
            </svg>
            <a
              href="#"
              class="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
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
