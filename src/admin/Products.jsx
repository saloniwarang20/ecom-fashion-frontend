import { useEffect, useState } from "react"
import productService from "../services/productService";
import subcategoryService from "../services/subcategoryService"
import categoryService from "../services/categoryService";
import { FiChevronDown, FiPlus, FiSearch } from "react-icons/fi";
import ProductTable from "../components/admin/product/ProductTable";
import ProductModal from "../components/admin/product/ProductModal";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try{
      const res = await productService.getAllProduct();
      console.log(res.data);
      setProducts(res.data)
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false);
    }
  }

  const fetchCategories = async () => {
    try{
      const res = await categoryService.getAllCategories();
      setCategories(res.data);
    }catch(err){
      console.error(err)
    }
  }

  const fetchSubcategories = async () => {
    try{
      const res = await subcategoryService.getAllSubcategories();
      setSubcategories(res.data);
    }catch(err){
      console.error(err)
    }
  }

  const filteredProducts = products.filter((product)=>{
    const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
        selectedCategory === "" ||
        String(product.categoryId) === String(selectedCategory);

    return matchesSearch && matchesCategory;
  })

  const handleAdd = () =>{
    setEditingProduct(null)
    setShowModal(true)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this product?")
    if(!confirm) return;
    try{
      await productService.deleteProduct(id);
      fetchProducts();
    }catch(err){
      alert(err.message);
    }
  }


  useEffect(()=>{
    fetchProducts();
    fetchSubcategories();
    fetchCategories();
  },[])

  return (
    <div  className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-xl font-bold font-playwrite">Products</h1>
          <p className="text-gray-500 mt-2">Manage all products</p>
        </div>
      
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 text-white bg-zinc-900 px-6 py-3 rounded-xl hover:bg-zinc-700 transition">
            <FiPlus/>
            Add Product
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-4 text-gray-400"/>
          <input 
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full border rounded-xl pl-12 py-3 pr-4 outline-none focus:ring-2 focus:ring-zinc-900"
            />
        </div>

        <div className=" border rounded-xl px-4 py-3 relative w-64 focus:ring-2 focus:ring-zinc-900">
          <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className=" appearance-none w-56 outline-none "
          >
              <option value="">All Categories</option>

              {categories.map((category) => (
                  <option
                      key={category.id}
                      value={category.id}
                  >
                      {category.name} 
                  </option>
              ))}
          </select>
          <FiChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              size={20}
          />
        </div>
        
        <button
            onClick={() => {
                setSearch("");
                setSelectedCategory("");
            }}
            className="px-5 py-3 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700"
        >
            Reset
        </button>
        
      </div>

      <ProductTable
      products={filteredProducts}
      loading={loading}
      onEdit={handleEdit}
      onDelete = {handleDelete}
       />

      {showModal && (
        <ProductModal
        open={showModal}
        editingProduct={editingProduct}
        onClose={()=>setShowModal(false)}
        refreshProducts={fetchProducts}
        categories={categories}
        subcategories={subcategories} />
      )}

    </div>
  )
}

export default Products
