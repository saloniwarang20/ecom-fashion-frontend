import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

import productVariantService from "../services/productVariantService";
import InventoryTable from "../components/admin/inventory/InventoryTable";

const Inventory = () => {
  const [variants, setVariants] = useState([]);
  const [filteredVariants, setFilteredVariants] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("ALL");

  const fetchInventory = async () => {
    setLoading(true);

    try {
      const response = await productVariantService.getAllVariants();
      setVariants(response.data);
      setFilteredVariants(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    let data = [...variants];

    if (search) {
      data = data.filter(
        (variant) =>
          variant.productName?.toLowerCase().includes(search.toLowerCase()) ||
          variant.sku?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (stockFilter !== "ALL") {
      data = data.filter((variant) => {
        if (stockFilter === "IN_STOCK")
          return variant.stock > 10;

        if (stockFilter === "LOW_STOCK")
          return (
            variant.stock > 0 &&
            variant.stock <= 10
          );

        if (stockFilter === "OUT_OF_STOCK")
          return variant.stock === 0;

        return true;
      });
    }

    setFilteredVariants(data);
  }, [search, stockFilter, variants]);

  const totalVariants = variants.length;

  const inStock = useMemo(() =>
      variants.filter((v) => v.stock > 10).length,
    [variants]
  );

  const lowStock = useMemo(() =>
      variants.filter(
        (v) => v.stock > 0 && v.stock <= 10
      ).length,
    [variants]
  );

  const outOfStock = useMemo(() =>
      variants.filter((v) => v.stock === 0).length,
    [variants]
  );

  return (
    <div className="p-6 min-h-screen">


      <div className="mb-10">
        <h1 className="text-xl font-bold font-playwrite">Inventory</h1>
        <p className="text-gray-500 mt-2">
          Monitor product stock and inventory
        </p>
      </div>


      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="border rounded-2xl p-6 bg-zinc-900">
          <p className="text-gray-400 text-sm font-playwrite">Total Variants</p>
          <h2 className="text-3xl font-bold mt-2 text-white">{totalVariants}</h2>
        </div>

        <div className="border rounded-2xl p-6 bg-zinc-900">
          <p className="text-gray-400 text-sm font-playwrite">In Stock</p>
          <h2 className="text-3xl font-bold text-green-700 mt-2">{inStock}</h2>
        </div>

        <div className="border rounded-2xl p-6 bg-zinc-900">
          <p className="text-gray-400 text-sm font-playwrite">Low Stock</p>
          <h2 className="text-3xl font-bold text-yellow-700 mt-2">{lowStock}</h2>
        </div>

        <div className="border rounded-2xl p-6 bg-zinc-900">
          <p className="text-gray-400 text-sm font-playwrite">Out Of Stock</p>
          <h2 className="text-3xl font-bold text-red-700 mt-2">{outOfStock}</h2>
        </div>
      </div>


      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <FiSearch
            className="absolute left-4 top-4 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search Product or SKU..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>

        <div className="relative border rounded-xl px-4 py-3 w-64">
          <select
            value={stockFilter}
            onChange={(e) =>
              setStockFilter(e.target.value)
            }
            className="appearance-none w-full outline-none"
          >
            <option value="ALL">All Stock</option>
            <option value="IN_STOCK">In Stock</option>
            <option value="LOW_STOCK">Low Stock</option>
            <option value="OUT_OF_STOCK">Out Of Stock</option>
          </select>

          <FiChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>

        <button
          onClick={() => {
            setSearch("");
            setStockFilter("ALL");
          }}
          className="px-6 py-3 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700">
          Reset
        </button>

      </div>

      <InventoryTable
        variants={filteredVariants}
        loading={loading}
      />

    </div>
  );
};

export default Inventory;