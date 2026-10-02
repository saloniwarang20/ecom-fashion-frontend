const CategorySection = ({
    categories,
    subcategories,
    formData,
    setFormData,
}) => {

    const filteredSubcategories = subcategories.filter(
        (sub) => String(sub.categoryId) === String(formData.categoryId)
    );

    return (
        <div className="mt-8">

            <h3 className="text-md font-semibold border-b border-gray-400 pb-2 font-playwrite mb-6">
                Category
            </h3>

            <div className="grid grid-cols-2 gap-6">

                <div>
                    <label className="block mb-1 font-medium">
                        Category
                    </label>

                    <select
                        value={formData.categoryId}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                categoryId: e.target.value,
                                subCategoryId: ""
                            })
                        }
                        className="w-full border rounded-xl px-3 py-2"
                    >

                        <option value="">
                            Select Category
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}

                    </select>

                </div>

                <div>

                    <label className="block mb-1 font-medium">
                        Sub Category
                    </label>

                    <select
                        value={formData.subCategoryId}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                subCategoryId: e.target.value
                            })
                        }
                        className="w-full border rounded-xl px-3 py-2"
                    >

                        <option value="">
                            Select Subcategory
                        </option>

                        {filteredSubcategories.map((subcategory) => (

                            <option
                                key={subcategory.id}
                                value={subcategory.id}
                            >
                                {subcategory.name}
                            </option>

                        ))}

                    </select>

                </div>

            </div>

        </div>
    );
};

export default CategorySection;