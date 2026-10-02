import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const sizes = [
    "FREE_SIZE", 
    "XXS","XS","S","M","L","XL","XXL","XXXL",
    "SIZE_26","SIZE_28","SIZE_30","SIZE_32","SIZE_34","SIZE_36","SIZE_38","SIZE_40","SIZE_42","SIZE_44","SIZE_46",
    "UK_3","UK_4","UK_5","UK_6","UK_7","UK_8","UK_9","UK_10","UK_11",
    "AGE_0_6M","AGE_6_12M","AGE_1_2Y","AGE_2_3Y","AGE_3_4Y","AGE_4_5Y","AGE_5_6Y","AGE_7_8Y","AGE_9_10Y","AGE_11_12Y"
];

const colors = [
    "BLACK","WHITE","GREY","SILVER","CHARCOAL",
    "RED","MAROON","BURGUNDY","PINK","HOT_PINK",
    "ORANGE","PEACH","CORAL",
    "YELLOW","MUSTARD",
    "GREEN","OLIVE","MINT","EMERALD",
    "BLUE","NAVY","SKY_BLUE","TEAL","TURQUOISE",
    "PURPLE","LAVENDER","VIOLET",
    "BROWN","BEIGE","KHAKI","TAN","CREAM",
    "GOLD","ROSE_GOLD",
    "MULTICOLOR"
];

const VariantSection = ({
    variants,
    setVariants,
}) => {

    const handleVariantChange = (index, field, value) => {
        const updated = [...variants];
        updated[index][field] = value;
        setVariants(updated);
    };

    const addVariant = () => {
        setVariants([
            ...variants,
            {
                size: "",
                color: "",
                stock: "",
                sku: "",
                images:[
                    {
                        imageUrl:"",
                        primaryImage:true
                    }
                ]
            },
        ]);
    };

    const removeVariant = (index) => {
        setVariants(
            variants.filter((_, i) => i !== index)
        );
    };

    return (
        <div className="mt-8">

            <h3 className="text-md font-semibold border-b border-gray-400 pb-2 font-playwrite mb-6">
                Variants
            </h3>

            <div className="space-y-4">

                {variants.map((variant, index) => (

                    <div
                        key={index}
                        className="border rounded-2xl p-5 space-y-5 border-gray-300">
                        
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => removeVariant(index)}
                                className="text-red-700">
                                <RxCross2 />
                            </button>
                        </div>


                        <div className="grid grid-cols-4 gap-4">

                            <div>
                                <label className="block mb-1 font-medium">Size</label>
                                <select
                                    value={variant.size}
                                    onChange={(e) =>
                                        handleVariantChange(
                                            index,
                                            "size",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-xl px-3 py-2">
                                    <option value="">Select Size</option>
                                    {sizes.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Color</label>
                                <select
                                    value={variant.color}
                                    onChange={(e) =>
                                        handleVariantChange(
                                            index,
                                            "color",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-xl px-3 py-2">
                                    <option value="">Select Color</option>
                                    {colors.map((color) => (
                                        <option
                                            key={color} value={color}>
                                            {color}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Stock</label>
                                <input
                                    type="number"
                                    value={variant.stock}
                                    onChange={(e) =>
                                        handleVariantChange(
                                            index,
                                            "stock",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-xl px-3 py-2"
                                    placeholder="0"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">SKU</label>
                                <input
                                    type="text"
                                    value={variant.sku}
                                    onChange={(e) =>
                                        handleVariantChange(
                                            index,
                                            "sku",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-xl px-3 py-2"
                                    placeholder="NK001"
                                />
                            </div>
                        </div>

                    </div>

                ))}

            </div>

            <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 mt-4 px-5 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700"
            >
                <FiPlus />
                Add Variant
            </button>

        </div>
    );
};

export default VariantSection; 