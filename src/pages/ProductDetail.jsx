import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/productService";
import ProductGallery from "../components/productDetails/ProductGallery";
import ProductInfo from "../components/productDetails/ProductInfo";
import Breadcrumb from "../components/productDetails/Breadcrumb";
import ReviewSection from "../components/productDetails/ReviewSection";
import reviewService from "../services/reviewService";

const ProductDetail = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
    loadReviews();
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await productService.getProduct(id);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await reviewService.getProductReview(id);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 px-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>

          <span className="text-gray-600 text-sm">
            Loading Product...
          </span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center py-20 px-4">
        <span className="text-gray-600">
          No Product Found
        </span>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 xl:px-20 py-5">

      <Breadcrumb product={product} />

      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 lg:gap-10 xl:gap-12 items-start">

        <div className="w-full">
          <ProductGallery product={product} />
        </div>

        <div className="w-full">
          <div className="lg:sticky lg:top-28 h-fit">
            <ProductInfo product={product} />
          </div>
        </div>

      </div>

      <ReviewSection reviews={reviews} />

    </div>
  );
};

export default ProductDetail;