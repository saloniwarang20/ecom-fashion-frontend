import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

const options = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Name (A-Z)", value: "name" },
];

export default function SortDropName({
  sortBy,
  setSortBy,
}) {

  const [open, setOpen] = useState(false);

  const dropDownRef = useRef(null);

  const selected = options.find(
    (o) => o.value === sortBy
  );


  useEffect(() => {

    function handleClickOutside(e) {

      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);


  return (
    <div
      className="relative w-full sm:w-50"
      ref={dropDownRef}
    >

      <button
        onClick={() => setOpen(!open)}
        className="w-full text-zinc-900 border-2 rounded-full px-3 py-2 flex items-center justify-between bg-taupe-300 border-zinc-900 hover:bg-zinc-900 hover:text-white transition "
      >

        <span className="font-bold text-xs sm:text-sm">
          {selected?.label}
        </span>

        <FiChevronDown
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />

      </button>


      {open && (
        <div
          className="absolute top-full left-0 mt-2 w-full bg-zinc-900 rounded-xl overflow-hidden border-gray-300 z-30 shadow-lg"
        >

          {options.map((option) => (

            <button
              key={option.value}
              onClick={() => {
                setSortBy(option.value);
                setOpen(false);
              }}
              className=" w-full px-3 py-2 flex justify-between text-xs sm:text-sm hover:bg-zinc-700 text-white"
            >
              {option.label}

              {sortBy === option.value && (
                <FiCheck />
              )}

            </button>

          ))}

        </div>
      )}

    </div>
  );
}