const BasicInfo = ({ formData, setFormData }) => {
    return (
        <div className="space-y-4">

            <h3 className="text-md font-semibold border-b border-gray-400 pb-2 font-playwrite">
                Basic Information
            </h3>

            <div>
                <label className="block mb-1 font-medium">Product Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value
                        })
                    }
                    className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
                    placeholder="Nike Air Max 90"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                    rows={5}
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value
                        })
                    }
                    className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
                    placeholder="Enter description..."
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Brand</label>
                <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            brand: e.target.value
                        })
                    }
                    className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
                    placeholder="Nike"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Gender</label>
                <select
                    value={formData.gender}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            gender: e.target.value
                        })
                    }
                    className="w-full border rounded-xl px-3 py-2"
                >
                    <option value="MEN">MEN</option>
                    <option value="WOMEN">WOMEN</option>
                    <option value="UNISEX">UNISEX</option>
                    <option value="KIDS">KIDS</option>
                </select>
            </div>

        </div>
    );
};

export default BasicInfo;