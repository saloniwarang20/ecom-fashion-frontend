import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/productService";
import subcategoryService from "../services/subcategoryService";
import categoryService from "../services/categoryService";
import ProductHeader from "../components/product/ProductHeader";
import ProductGrid from "../components/product/ProductGrid";

const Product = () => {
  const { categoryName } = useParams();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [sortBy, setSortBy] = useState("newest");

  const [draftFilters, setDraftFilters] = useState({
    subCategoryId: "",
    brand: "",
    minPrice: null,
    maxPrice: null,
    colors: [],
    sizes: [],
  });

  const [filters, setFilters] = useState({
    subCategoryId: "",
    brand: "",
    minPrice: null,
    maxPrice: null,
    colors: [],
    sizes: [],
  });


  const applyFilters = async () => {
    const res = await productService.filterProduct(filters);
    setProducts(res.data);
  };


  const loadSubCategories = async (categoryId) => {
    try {
      const res = await subcategoryService.getSubcategoryByCategory(categoryId);

      setSubCategories(res.data);

      if (res.data.length > 0) {
        const initialFilters = {
          subCategoryId: res.data[0].id,
          brand: "",
          minPrice: null,
          maxPrice: null,
          colors: [],
          sizes: [],
        };

        setSelectedSubCategory(res.data[0]);
        setFilters(initialFilters);
        setDraftFilters(initialFilters);
      }
    } catch (err) {
      console.error(err);
    }
  };


  const loadCategory = async () => {
    setLoadingCategory(true);
    setLoadingProducts(true);

    try {
      if (categoryName === "best-sellers") {
        const res = await productService.getBestSellers();

        setProducts(res.data);
        setCategory(null);
        setSubCategories([]);
        setSelectedSubCategory(null);

        const emptyFilters = {
          subCategoryId: "",
          brand: "",
          minPrice: null,
          maxPrice: null,
          colors: [],
          sizes: [],
        };

        setFilters(emptyFilters);
        setDraftFilters(emptyFilters);

        return;
      }

      const res =
        await categoryService.getCategoryByName(categoryName);

      setCategory(res.data);

      await loadSubCategories(res.data.id);

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCategory(false);
      setLoadingProducts(false);
    }
  };


  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;

      case "price-high":
        return b.price - a.price;

      case "name":
        return a.name.localeCompare(b.name);

      default:
        return 0;
    }
  });


  const isBestSeller = categoryName === "best-sellers";


  useEffect(() => {

    if (
      categoryName !== "best-sellers" &&
      filters.subCategoryId
    ) {
      applyFilters();
    }
  }, [filters, categoryName]);


  useEffect(() => {
    if (categoryName) {
      loadCategory();
    }
  }, [categoryName]);


  const pageTitle =
    categoryName === "best-sellers"
      ? "BEST SELLERS"
      : categoryName;


  return (
    <div className="w-full px-3 sm:px-4 md:px-8 lg:px-12 xl:px-20 py-4 sm:py-5" >

      <ProductHeader
        title={pageTitle}
        totalProducts={products.length}

        sortBy={sortBy}
        setSortBy={setSortBy}

        subCategories={
          isBestSeller ? [] : subCategories
        }

        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}

        showFilters={showFilters}
        setShowFilters={setShowFilters}

        filters={filters}
        setFilters={setFilters}

        draftFilters={draftFilters}
        setDraftFilters={setDraftFilters}
      />


      <ProductGrid
        products={sortedProducts}
        loading={loadingProducts}
      />

    </div>
  );
};

export default Product;