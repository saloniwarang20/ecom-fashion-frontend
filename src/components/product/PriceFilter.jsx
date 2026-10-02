import { Check } from "lucide-react";
import { PRICE_RANGES } from "../../constants/filterOptions";

const PriceFilter = ({
  draftFilters,
  setDraftFilters,
}) => {

  const selectPrice = (range) => {
    setDraftFilters((prev) => ({
      ...prev,
      minPrice: range.min,
      maxPrice: range.max,
    }));
  };


  const resetPrice = () => {
    setDraftFilters((prev) => ({
      ...prev,
      minPrice: null,
      maxPrice: null,
    }));
  };


  return (
    <div>

      <div className="flex justify-between items-center mb-4">

        <h3 className="font-bold">
          PRICE
        </h3>


        {(draftFilters.minPrice !== null ||
          draftFilters.maxPrice !== null) && (

          <button
            onClick={resetPrice}
            className="
              text-sm
              underline
              text-gray-500
              hover:text-black
            "
          >
            Reset
          </button>
        )}

      </div>


      <div className="space-y-4">

        {PRICE_RANGES.map((range) => {

          const selected =
            draftFilters.minPrice === range.min &&
            draftFilters.maxPrice === range.max;

          return (
            <button
              key={range.label}
              onClick={() => selectPrice(range)}
              className="
                flex
                items-center
                gap-3
                w-full
                text-left
              "
            >

              <div
                className={`
                  w-5
                  h-5
                  rounded-md
                  border-2
                  flex
                  items-center
                  justify-center
                  shrink-0
                  ${
                    selected
                      ? "border-black"
                      : "border-gray-400"
                  }
                `}
              >

                {selected && (
                  <Check size={14} />
                )}

              </div>

              <span className="font-medium text-sm">
                {range.label}
              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
};

export default PriceFilter;