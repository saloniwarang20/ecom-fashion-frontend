import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import productImageService from "../../../services/productImageService";
import { useState } from "react";

const ProductImageSection = ({ images, setImages, deletedImages, setDeletedImages }) => {

    const handleImageChange = (index, field, value) => {
        const updated = [...images];
        updated[index][field] = value;
        setImages(updated);
    };

    const addImage = () => {
        setImages([
            ...images,
            {
                imageUrl: "",
                primaryImage: false,
            },
        ]);
    };

    const removeImage = async (index) => {
        const image = images[index];

        if(image.id){
            setDeletedImages(prev => [...prev, image.id])
        }

        setImages(images.filter((_, i) => i !== index));
    };

    const setPrimaryImage = (index) => {

        const updated = images.map((img, i) => ({
            ...img,
            primaryImage: i === index,
        }));

        setImages(updated);
    };

    return (
        <div className="mt-8">

            <h3 className="text-md font-semibold border-b border-gray-300 pb-2 mb-6 font-playwrite">
                Product Images
            </h3>

            <div className="space-y-4">

                {images.map((image, index) => (

                    <div
                        key={index}
                        className="rounded-2xl p-2"
                    >

                        <div className="flex gap-4 items-start">

                            <div className="flex-1">

                                <label className="block text-sm font-medium mb-2">Image URL</label>

                                <input
                                    type="text"
                                    value={image.imageUrl}
                                    placeholder="https://example.com/image.jpg"
                                    onChange={(e) =>
                                        handleImageChange(
                                            index,
                                            "imageUrl",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-xl px-3 py-2"
                                />

                            </div>

                            {image.imageUrl && (

                                <img
                                    src={image.imageUrl}
                                    alt="preview"
                                    className="w-28 h-28 rounded-xl border object-cover"
                                />

                            )}

                        </div>

                        <div className="flex justify-between items-center mt-4">

                            <label className="flex items-center gap-2">

                                <input
                                    type="checkbox"
                                    checked={image.primaryImage}
                                    onChange={() => setPrimaryImage(index)}
                                    className="accent-zinc-900 w-4 h-4"
                                />

                                Primary Image

                            </label>

                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <RxCross2 size={22} />
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            <button
                type="button"
                onClick={addImage}
                className="mt-5 flex items-center gap-2 px-5 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700"
            >
                <FiPlus />
                Add Image
            </button>

        </div>
    );
};

export default ProductImageSection;