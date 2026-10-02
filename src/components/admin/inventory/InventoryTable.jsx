const stockBadge = (stock) => {
  if (stock === 0)
    return {
      text: "Out Of Stock",
      color: "bg-red-700 text-white",
    };

  if (stock <= 10)
    return {
      text: "Low Stock",
      color: "bg-yellow-600 text-white",
    };

  return {
    text: "In Stock",
    color: "bg-green-700 text-white",
  };
};

const InventoryTable = ({
  variants = [],
  loading = false,
}) => {
  return (
    <div className="overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-b-2 border-gray-700">
            <tr>
              <th className="text-left p-4 font-playwrite">Product</th>
              <th className="text-left p-4 font-playwrite">SKU</th>
              <th className="text-left p-4 font-playwrite">Color</th>
              <th className="text-left p-4 font-playwrite">Size</th>
              <th className="text-center p-4 font-playwrite">Stock</th>
              <th className="text-center p-4 font-playwrite">Status</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-7 h-7 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
                    <span className="font-medium text-gray-600">
                      Loading Inventory...
                    </span>
                  </div>
                </td>
              </tr>

            ) : variants.length === 0 ? (

              <tr>
                <td
                  colSpan={6}
                  className="py-14 text-center text-gray-500">
                  <p className="font-semibold text-lg">No Inventory Found</p>
                  <p className="text-gray-500 mt-2">Try changing the filters.</p>
                </td>
              </tr>

            ) : (

              variants.map((variant) => {
                const badge = stockBadge(
                  variant.stock
                );
                return (

                  <tr
                    key={variant.id}
                    className="border-b border-gray-300">

                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-zinc-900">{variant.productName}</p>
                        <p className="text-xs text-gray-500">Product ID : {variant.productId}</p>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-mono font-semibold">{variant.sku}</span>
                    </td>

                    <td className="p-4 capitalize">{variant.color}</td>

                    <td className="p-4">{variant.size}</td>

                    <td className="p-4 text-center">
                      <span
                        className={`font-bold text-lg ${
                          variant.stock === 0
                            ? "text-red-600"
                            : variant.stock <= 10
                            ? "text-yellow-600"
                            : "text-green-700"
                        }`}
                      >
                        {variant.stock}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${badge.color}`}>
                        {badge.text}
                      </span>
                    </td>
                  </tr>
                );
              })

            )}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default InventoryTable;