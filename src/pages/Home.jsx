import { useState } from "react";
import { motion } from "motion/react";
import images from "../assets/images/image";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    { title: "MEN", buttonText: "SHOP MEN", image: images.menImg, nav: "/category/men"},
    {title: "WOMEN", buttonText: "SHOP WOMEN",image: images.womenImg,nav: "/category/women"},
    {title: "ACCESSORIES",buttonText: "SHOP ACCESSORIES",image: images.accessoriesImg,nav: "/category/accessories"},
    {title: "BEST SELLERS",buttonText: "SHOP BEST SELLERS",image: images.bestImg,nav: "/category/best-sellers"},
  ];

  return (
    <div className="relative">

      {/* ================= HERO ================= */}
      <div className="hero flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col items-center gap-5 sm:gap-6 px-5 text-center">

          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-playwrite">
            New Arrivals
          </div>

          <button
            onClick={() => navigate("/category/best-sellers")}
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base border-2 border-white text-white hover:bg-white hover:text-black transition"
          >
            Shop Now
          </button>

        </div>
      </div>


      {/* ================= CATEGORY CARDS ================= */}
      <div className="flex  gap-3 mt-7 mx-3.75 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-1 scrollbar-hide">

        {cards.map(({ title, buttonText, image, nav }) => {

          const isHovered = hoveredCard === title;

          return (
            <motion.div
              key={title}

              initial={{
                borderRadius: "16px",
                scale: 1,
              }}

              animate={
                isHovered
                  ? {
                      borderRadius: "200px",
                      scale: 1.01,
                    }
                  : {
                      borderRadius: "16px",
                      scale: 1,
                    }
              }

              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}

              onHoverStart={() => setHoveredCard(title)}
              onHoverEnd={() => setHoveredCard(null)}

              onFocus={() => setHoveredCard(title)}
              onBlur={() => setHoveredCard(null)}

              className="relative flex-none snap-center
                w-55 sm:w-45 md:w-45 lg:w-90
                h-80 sm:h-80 md:h-80 lg:h-110
                rounded-xl flex flex-col items-center justify-center overflow-hidden text-white cursor-pointer
              "

              onClick={() => navigate(nav)}

              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >

              {/* Overlay */}
              <div
                className={`
                  absolute inset-0
                  transition-all duration-300
                  ${
                    isHovered
                      ? "bg-black/50"
                      : "bg-black/20"
                  }
                `}
              />


              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-2">

                <motion.h2
                  animate={
                    isHovered
                      ? { y: -20 }
                      : { y: 0 }
                  }

                  transition={{
                    duration: 0.2,
                  }}

                  className=" font-semibold text-sm sm:text-base md:text-md lg:text-lg text-center"
                >
                  {title}
                </motion.h2>


                <motion.button
                  animate={
                    isHovered
                      ? {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }
                      : {
                          opacity: 0,
                          y: 20,
                          scale: 0.8,
                        }
                  }

                  transition={{
                    duration: 0.3,
                  }}

                  onClick={() => navigate(nav)}

                  className=" px-3 sm:px-5 py-1 sm:py-1.5 text-[9px] sm:text-xs font-bold rounded-full border-2 border-gray-100 hover:bg-gray-100 hover:text-black"
                >
                  {buttonText}
                </motion.button>

              </div>

            </motion.div>
          );
        })}

      </div>


      {/* ================= FEATURE CARDS ================= */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-7 mx-3.75 gap-4"
      >

        <div className="p-5 bg-white rounded-2xl">
          <p className="font-playwrite my-4 text-gray-900">
            Effortless style everyday
          </p>

          <p className="text-sm mb-7 font-extralight leading-5 tracking-tighter">
            Discover timeless pieces designed for comfort and confidence.
            From casual outings to special moments, our collections fit
            seamlessly into your lifestyle.
          </p>
        </div>


        <div className="p-5 bg-white rounded-2xl">
          <p className="font-playwrite my-4 text-gray-900">
            Crafted with care
          </p>

          <p className="text-sm mb-7 font-extralight leading-5 tracking-tighter">
            Every garment is thoughtfully designed using quality fabrics
            and attention to detail, ensuring style that lasts beyond
            the season.
          </p>
        </div>


        <div className="p-5 bg-white rounded-2xl">
          <p className="font-playwrite my-4 text-gray-900">
            Fashion for every moment
          </p>

          <p className="text-sm mb-7 font-extralight leading-5 tracking-tighter">
            Whether you're dressing for work, weekends, or celebrations,
            find versatile essentials that make getting ready feel
            effortless.
          </p>
        </div>


        <div className="p-5 bg-white rounded-2xl">
          <p className="font-playwrite my-4 text-gray-900">
            Designed for modern living
          </p>

          <p className="text-sm mb-7 font-extralight leading-5 tracking-tighter">
            Clean silhouettes, comfortable fits, and contemporary designs
            come together to create pieces you'll reach for again and again.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Home;


