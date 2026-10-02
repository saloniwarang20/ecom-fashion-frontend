import { useRef, useState } from "react";

const ProductGallery = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);

  const handleScroll = () => {
    if (!galleryRef.current) return;

    const scrollLeft = galleryRef.current.scrollLeft;
    const width = galleryRef.current.clientWidth;

    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const scrollToImage = (index) => {
    if (!galleryRef.current) return;

    const width = galleryRef.current.clientWidth;

    galleryRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  return (
    <div className="w-full">

      <div className="sm:hidden">

        <div
          ref={galleryRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {product.images.map((image) => (
            <div
              key={image.id}
              className="min-w-full snap-center aspect-4/5 overflow-hidden bg-gray-50 rounded-xl"
            >
              <img
                src={image.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-1.5 mt-3">
          {product.images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => scrollToImage(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-5 bg-black"
                  : "w-1.5 bg-gray-300"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

      </div>

      <div className="hidden sm:grid sm:grid-cols-2 gap-2 sm:gap-3">
        {product.images.map((image) => (
          <div
            key={image.id}
            className="aspect-4/5 overflow-hidden rounded-lg bg-gray-50"
          >
            <img
              src={image.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductGallery;