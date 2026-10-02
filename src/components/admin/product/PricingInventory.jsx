const PricingInventory = ({ formData, setFormData }) => {
    return (
        <div className="mt-8">

            <h3 className="text-md font-semibold border-b border-gray-400 pb-2 font-playwrite mb-6">
                Pricing & Inventory
            </h3>

            <div className="grid grid-cols-2 gap-6">

                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                price: e.target.value
                            })
                        }
                        className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
                        placeholder="0.00"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Discount Price</label>

                    <input
                        type="number"
                        value={formData.discountPrice}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                discountPrice: e.target.value
                            })
                        }
                        className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
                        placeholder="0.00"
                    />
                </div>

                {/* <div>
                    <label className="block mb-1 font-medium">Stock Quantity</label>
                    <input
                        type="number"
                        value={variants.reduce(
                            (total, v) => total + Number(v.stock || 0),
                            0
                        )}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                stockQuantity: e.target.value
                            })
                        }
                        readOnly
                        className="w-full border rounded-xl px-3 py-2 outline-none "
                        placeholder="0"
                    />
                </div> */}

                <div>
                    <label className="block mb-1 font-medium">Material</label>
                    <input
                        type="text"
                        value={formData.material}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                material: e.target.value
                            })
                        }
                        className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
                        placeholder="Leather"
                    />
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <input
                        type="checkbox"
                        checked={formData.available}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                available: e.target.checked
                            })
                        }
                        className="w-5 h-5 accent-zinc-900"
                    />
                    <label className="font-medium">Product Available</label>
                </div>

            </div>

        </div>
    );
};

export default PricingInventory;