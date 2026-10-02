import { useEffect, useState } from "react"
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi"
import subcategoryService from "../services/subcategoryService"
import categoryService from "../services/categoryService"

const SubCategory = () => {
  const [subcategories , setSubcategories] = useState([])
  const [editingSubcategory, setEditingSubcategory] = useState(null)
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([])

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name:"",
    categoryId:"",
    imageUrl:"",
  })

  const openAddModal = () =>{
    setEditingSubcategory(null)

    setFormData({
      name:"",
      categoryId:"",
      imageUrl:""
    });

    setShowModal(true)
  }

  const openEditModal = (subcategory) => {
    setEditingSubcategory(subcategory);
    setFormData({
      name: subcategory.name,
      categoryId:subcategory.categoryId,
      imageUrl: subcategory.imageUrl,
    })
    setShowModal(true);
  }

  const fetchCategories = async () => {
    try{
      const response = await categoryService.getAllCategories();
      setCategories(response.data)
    }catch(error){
      alert(error.message);
    }
  }

  const fetchSubcategories = async () => {
    setLoading(true)
    try{
      const response = await subcategoryService.getAllSubcategories();
      setSubcategories(response.data);
    }catch(err){
      console.error(err)
    }finally{
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if(!formData.name.trim()){
        alert("Category name is required");
        return;
    }
    if(!formData.categoryId){
        alert("Please select a category");
        return;
    }
    try{
      if(editingSubcategory){
        await subcategoryService.updateSubcategory(editingSubcategory.id, formData.categoryId, formData)
      }else{
        await subcategoryService.createSubcategory(formData, formData.categoryId)
      }

      fetchSubcategories();
      setShowModal(false);
      setFormData({
          name: "",
          imageUrl: "",
          categoryId:"",
      });
      setEditingSubcategory(null);
    }catch(err){
      alert(err.message)
    }
  }

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;
    try{
      await subcategoryService.deleteSubcategory(id)
      fetchSubcategories();
    }catch(err){
      alert(err.message)
    }
  }

  useEffect(()=>{
    fetchSubcategories();
    fetchCategories();
  },[]);

  return (
    <div className="p-6 min-h-screen">

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-xl font-bold font-playwrite">Sub Categories</h1>
          <p className="text-gray-500 mt-2">Manage all product sub categories</p>
        </div>

        <button 
        onClick={openAddModal}
        className="flex items-center gap-2 text-white bg-zinc-900 px-6 py-3 rounded-xl hover:bg-zinc-700 transition">
          <FiPlus/>
          Add SubCategory
        </button>
      </div>

      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-4 font-playwrite text-sm">Id</th>
              <th className="p-4 font-playwrite text-sm">Image</th>
              <th className="p-4 font-playwrite text-sm">Name</th>
              <th className="p-4 font-playwrite text-sm">Category Name</th>
              <th className="p-4 font-playwrite text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-6 h-6 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
                    <span>Loading subcategories...</span>
                  </div>
                </td>
              </tr>
            ):
            subcategories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">No SubCategories Found</td>
              </tr>
            ):(
              subcategories.map((subcategory)=>(
                <tr key={subcategory.id}>
                  <td className="p-4">{subcategory.id}</td>
                  <td className="p-4">
                      <img
                          src={subcategory.imageUrl}
                          className="w-14 h-14 rounded-lg object-cover"
                      />
                  </td>
                  <td className="p-4 font-medium">{subcategory.name}</td>
                  <td className="p-4 text-gray-600">{subcategory.categoryName}</td>
                  <td className="p-4">
                    <div className="flex align-center gap-3">
                      <button 
                      onClick={()=> openEditModal(subcategory)}
                      className="px-3 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700">
                        <FiEdit2/>
                      </button>
                      <button 
                        onClick={()=> deleteCategory(subcategory.id)}
                        className="px-3 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700">
                        <FiTrash2/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-125 p-8">
            <h2 className="text-xl font-bold mb-6 text-zinc-900">
              {editingSubcategory ? "Edit SubCategory":"Add SubCategory"}
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">SubCategory Name</label>
                <input type="text" value={formData.name}
                onChange={(e)=>setFormData({...formData,name:e.target.value})}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 outline-none"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Category</label>
                <select value={formData.categoryId}
                onChange={(e)=>setFormData({
                  ...formData,
                  categoryId: e.target.value,
                })}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 outline-none">
                  <option value="">Select Category</option>
                  {categories.map((category)=>(
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Image URL</label>
                <input type="text" value={formData.imageUrl}
                onChange={(e)=>setFormData({...formData,imageUrl:e.target.value})}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 outline-none"/>
              </div>

              {formData.imageUrl && (
                <img src={formData.imageUrl}
                alt="preview"
                className="w-28 h-28 rounded-xl object-cover border" />
              )}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={()=> setShowModal(false)} className="px-5 py-2 rounded-xl border">Cancel</button>
              <button onClick={handleSave} className="px-6 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700">
                {editingSubcategory ? "Edit":"Add"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default SubCategory
