import { useEffect, useState } from "react";

import productService from "../../../services/productService";
import productVariantService from "../../../services/productVariantService"
import productImageService from "../../../services/productImageService"

import BasicInfo from "./BasicInfo";
import PricingInventory from "./PricingInventory";
import CategorySection from "./CategorySection";
import VariantSection from "./VariantSection";
import ActionButtons from "./ActionButtons";
import ImageSection from "./ImageSection";

const ProductModal = ({ open, onClose, categories=[], subcategories=[], refreshProducts, editingProduct }) => {

    const isEdit = editingProduct != null;

    const [saving , setSaving] = useState(false)

    const [formData, setFormData] = useState({
        name:"",
        description:"",
        brand:"",
        price:"",
        discountPrice:"",
        material:"",
        gender:"MEN",
        stockQuantity:"",
        available:true,
        categoryId:"",
        subCategoryId:""
    })

    const [variants, setVariants] = useState([
        {
            size:"",
            color:"",
            stock:"",
            sku:"",
        },
    ])

    const [images, setImages] = useState([
        {
            imageUrl:"",
            primaryImage:true
        }
    ])

    const [deletedImages, setDeletedImages] = useState([]);

    const resetForm = () => {
        setFormData({
                name:"",
                description:"",
                brand:"",
                price:"",
                discountPrice:"",
                material:"",
                gender:"MEN",
                stockQuantity:"",
                available:true,
                categoryId:"",
                subCategoryId:""
            })
        setVariants([
            {
                size:"",
                color:"",
                stock:"",
                sku:"", 
            }
        ])
        setImages([
            {
                imageUrl:"",
                primaryImage:true
            }
        ])
        setDeletedImages([]);
        
    }


    useEffect(() => {

        if (!editingProduct) {
            resetForm();
            return;
        }

        if(subcategories.length===0) return;

        const loadProduct = async () => {

            // Find parent category from selected subcategory
            const selectedSubcategory = subcategories.find(
                (sub) => String(sub.id) === String(editingProduct.subCategoryId)
            );

            setFormData({
                name: editingProduct.name,
                description: editingProduct.description,
                brand: editingProduct.brand,
                price: editingProduct.price,
                discountPrice: editingProduct.discountPrice,
                material: editingProduct.material,
                gender: editingProduct.gender,
                stockQuantity: editingProduct.stockQuantity,
                available: editingProduct.available,
                categoryId: selectedSubcategory
                    ? String(selectedSubcategory.categoryId)
                    : "",
                subCategoryId: String(editingProduct.subCategoryId),
            });

            try {
                const variantRes = await productVariantService.getVariants(editingProduct.id);
                setVariants(variantRes.data);
                console.log(editingProduct);
                console.log(editingProduct.id);
                const imageRes = await productImageService.getAllImages(editingProduct.id);
                console.log("Image API Response:", imageRes.data);
                setImages(imageRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        loadProduct();

    }, [editingProduct, subcategories]);

    if (!open) return null;

    const handleSubmit = async () => {

        if (saving) return;
        setSaving(true);

        try {
            let productId;
            // UPDATE PRODUCT
            if (isEdit) {
                const response = await productService.updateProduct(
                    editingProduct.id,
                    {
                        ...formData,
                        price: Number(formData.price),
                        discountPrice: Number(formData.discountPrice),
                        stockQuantity: Number(formData.stockQuantity),
                    }
                );
                productId = response.data.id;

                // Update existing variants
                for (const variant of variants) {

                    if(
                        !variant.size ||
                        !variant.color ||
                        !variant.stock ||
                        !variant.sku
                    ){continue;}
                     
                    if (variant.id) {
                        await productVariantService.updateVariant(
                            variant.id,
                            {
                                size: variant.size,
                                color: variant.color,
                                stock: Number(variant.stock),
                                sku: variant.sku,
                            }
                        );
                    } else {
                         await productVariantService.addVariant(
                            productId,
                            {
                                size: variant.size,
                                color: variant.color,
                                stock: Number(variant.stock),
                                sku: variant.sku,
                            }
                        );
                    }
                }

                for(const imageId of deletedImages){
                    await productImageService.deleteImage(imageId);
                }
                
                for (const image of images || []) {
                    
                    if (!image.imageUrl.trim()) continue;

                    console.log("Uploading image:", image);
                    
                    if (image.id) {
                        await productImageService.updateImage(image.id, {
                            imageUrl: image.imageUrl,
                            primaryImage: image.primaryImage,
                        });
                    } else {
                        await productImageService.addImage(productId, {
                            imageUrl: image.imageUrl,
                            primaryImage: image.primaryImage,
                        });
                    }
                }

            }
            else {

                const response = await productService.createProduct({
                    ...formData,
                    price: Number(formData.price),
                    discountPrice: Number(formData.discountPrice),
                    stockQuantity: Number(formData.stockQuantity),
                });

                productId = response.data.id;

                // Save Variants
                for (const variant of variants) {

                    if (
                        !variant.size ||
                        !variant.color ||
                        !variant.stock ||
                        !variant.sku
                    ) {
                        continue;
                    }

                    await productVariantService.addVariant(
                        productId,
                        {
                            size: variant.size,
                            color: variant.color,
                            stock: Number(variant.stock),
                            sku: variant.sku,
                        }
                    );
                    
                }
                for (const image of images || []) {

                    if (!image.imageUrl.trim()) continue;

                    await productImageService.addImage(
                        productId,
                        {
                            imageUrl: image.imageUrl,
                            primaryImage: image.primaryImage,
                        }
                    );
                }
            }
            if(typeof refreshProducts === "function"){
                await refreshProducts();
            }

            resetForm();

            onClose();

            alert(
                isEdit
                    ? "Product updated successfully!"
                    : "Product created successfully!"
            );

        } catch (err) {
            console.error(err);
            console.error("Status:", err.response?.status);
            console.error("Data:", err.response?.data);
            console.error("Headers:", err.response?.headers);
            console.error(err);
            alert(
                isEdit
                    ? "Failed to update product."
                    : "Failed to create product."
            );
        } finally {
            setSaving(false);
        }

    };
    
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-212.5 max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-8">

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold mb-2 text-zinc-900">{editingProduct ? "Edit Product":"Add Product"}</h2>
                    <button
                        onClick={onClose}
                        className="text-3xl cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-4">

                    <BasicInfo formData={formData} setFormData={setFormData}/>

                    <PricingInventory formData={formData} setFormData={setFormData} />

                    <CategorySection categories={categories} subcategories={subcategories} formData={formData} setFormData={setFormData} />

                    <VariantSection variants={variants} setVariants={setVariants} />

                    <ImageSection images={images} setImages={setImages} deletedImages={deletedImages} setDeletedImages={setDeletedImages}/>

                    <ActionButtons saving={saving} isEdit={isEdit} onSave={handleSubmit} onCancel={onClose} />

                </div>


            </div>
        </div>
    );
};

export default ProductModal;