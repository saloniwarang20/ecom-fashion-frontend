import { FiEdit2, FiTrash2 } from "react-icons/fi";

const ProductTable = ({
    products = [],
    loading,
    onEdit,
    onDelete,
}) => {

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
                    <span className="text-gray-600">
                        Loading Products...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">

                    <thead className="border-b border-gray-500">
                        <tr className="text-left">
                            <th className="p-4 text-sm font-playwrite">Id</th>
                            <th className="p-4 text-sm font-playwrite">Images</th>
                            <th className="p-4 text-sm font-playwrite">Product</th>
                            <th className="p-4 text-sm font-playwrite">Category</th>
                            <th className="p-4 text-sm font-playwrite">Variants</th>
                            <th className="p-4 text-sm font-playwrite">Price</th>
                            <th className="p-4 text-sm font-playwrite">Stock</th>
                            <th className="p-4 text-sm font-playwrite">Status</th>
                            <th className="p-4 text-sm font-playwrite">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="text-center py-12 text-gray-700">
                                    No Products Found
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-gray-400"
                                >
                                    <td className="p-4">
                                        <div className="font-semibold">
                                            {product.id}
                                        </div>
                                    </td>
                                    
                                    {/* Images */}
                                    <td className="p-4">
                                        <div className="flex gap-2 flex-wrap">
                                            {product.images?.length > 0 ? (
                                                product.images.map((img) => (
                                                    <img
                                                        key={img.id}
                                                        src={img.imageUrl}
                                                        alt={product.name}
                                                        className={`w-14 h-14 rounded-lg object-cover border`}
                                                    />
                                              ))
                                            ) : (
                                                <img
                                                    src="https://via.placeholder.com/60"
                                                    alt="No Image"
                                                    className="w-14 h-14 rounded-lg border"
                                                />
                                            )}
                                        </div>
                                    </td>

                                    {/* Product */}
                                    
                                    <td className="p-4">
                                        <div className="font-semibold">
                                            {product.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Brand: {product.brand}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Material: {product.material}
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td className="p-4">
                                        <div className="font-medium">
                                            {product.categoryName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {product.subCategoryName}
                                        </div>
                                    </td>

                                    {/* Variants */}

                                    <td className="p-4">
                                        <div className="grid grid-cols-2 gap-1 space-y-2">
                                            {product.variants?.length > 0 ? (
                                                product.variants.map((variant) => (
                                                    <div
                                                        key={variant.id}
                                                        className="bg-taupe-100 rounded-lg px-3 py-2 text-xs"
                                                    >
                                                        <div>
                                                            <strong>Size:</strong>{" "}
                                                            {variant.size}
                                                        </div>
                                                        <div>
                                                            <strong>Color:</strong>{" "}
                                                            {variant.color}
                                                        </div>
                                                        <div>
                                                            <strong>Stock:</strong>{" "}
                                                            {variant.stock}
                                                        </div>
                                                        <div className="text-gray-500">
                                                            SKU : {variant.sku}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 text-sm">
                                                    No Variants
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Price */}

                                    <td className="p-4">
                                        <div className="font-semibold">
                                            ₹{product.price}
                                        </div>
                                        {product.discountPrice && (
                                            <div className="text-lime-700 text-sm font-semibold">
                                                ₹{product.discountPrice}
                                            </div>
                                        )}
                                    </td>

                                    {/* Stock */}

                                    <td className="p-4">
                                        {product.stockQuantity}
                                    </td>

                                    {/* Status */}

                                    <td className="p-4">
                                        {product.available ? (
                                            <span className="px-3 py-1 rounded-full bg-lime-700 text-white text-sm">
                                                Available
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 rounded-full bg-red-700 text-white text-sm">
                                                Out of Stock
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}

                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onEdit(product)}
                                                className="p-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700"
                                            >
                                                <FiEdit2 />
                                            </button>
                                            <button
                                                onClick={() => onDelete(product.id)}
                                                className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                            ))

                        )}

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ProductTable;