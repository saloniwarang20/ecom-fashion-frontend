import { COLORS } from "../../constants/filterOptions";

const ColorFilter = ({
  draftFilters,
  setDraftFilters,
}) => {

  const toggleColor = (color) => {
    setDraftFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };


  const resetColor = () => {
    setDraftFilters((prev) => ({
      ...prev,
      colors: [],
    }));
  };


  return (
    <div>

      <div className="flex justify-between items-center mb-4">

        <h3 className="font-bold">
          COLOR

          {draftFilters.colors.length > 0 &&
            ` (${draftFilters.colors.length})`}
        </h3>


        {draftFilters.colors.length > 0 && (
          <button
            onClick={resetColor}
            className="text-sm underline text-gray-500 hover:text-black"
          >
            Reset
          </button>
        )}

      </div>


      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
      >

        {COLORS.map((color) => {

          const selected =
            draftFilters.colors.includes(color.name);

          return (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className="flex items-center gap-2 w-full text-left"
            >

              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 shrink-0
                  ${
                    selected
                      ? "border-black"
                      : "border-gray-300"
                  }
                `}
                style={{
                  background: color.hex,
                }}
              />

              <span
                className="text-xs sm:text-sm font-black truncate"
              >
                {color.name.replaceAll("_", " ")}
              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
};

export default ColorFilter;