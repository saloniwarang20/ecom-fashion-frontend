import ProductCard from "./ProductCard";

const ProductGrid = ({ products, loading }) => {

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

  if (products.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <h2 className="text-xl text-gray-500 text-center">
          No Products Found
        </h2>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;