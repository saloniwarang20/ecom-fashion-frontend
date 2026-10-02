import { useEffect, useState } from "react"
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi"
import categoryService from "../services/categoryService"

const Categories = () => {
  const [categories , setCategories] = useState([])
  const [editingCategory, setEditingCategory] = useState(null)
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name:"",
    description:"",
    imageUrl:"",
  })

  const openAddModal = () =>{
    setEditingCategory(null)

    setFormData({
      name:"",
      description:"",
      imageUrl:""
    });

    setShowModal(true)
  }

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
    })
    setShowModal(true);
  }

  const fetchCategories = async () => {
    setLoading(true)
    try{
      const response = await categoryService.getAllCategories();
      setCategories(response.data);
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
    if(!formData.description.trim()){
        alert("Description is required");
        return;
    }
    try{
      if(editingCategory){
        await categoryService.updateCategory(editingCategory.id, formData)
      }else{
        await categoryService.createCategory(formData)
      }

      fetchCategories();
      setShowModal(false);
      setFormData({
          name: "",
          description: "",
          imageUrl: "",
      });
      setEditingCategory(null);
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
      await categoryService.deleteCategory(id)
      fetchCategories();
    }catch(err){
      alert(err.message)
    }
  }

  useEffect(()=>{
    fetchCategories();
  },[]);

  return (
    <div className="p-6 min-h-screen">

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-xl font-bold font-playwrite">Categories</h1>
          <p className="text-gray-500 mt-2">Manage all product categories</p>
        </div>

        <button 
        onClick={openAddModal}
        className="flex items-center gap-2 text-white bg-zinc-900 px-6 py-3 rounded-xl hover:bg-zinc-700 transition">
          <FiPlus/>
          Add Category
        </button>
      </div>

      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-400">
              <th className="p-4 font-playwrite text-sm">Id</th>
              <th className="p-4 font-playwrite text-sm">Image</th>
              <th className="p-4 font-playwrite text-sm">Name</th>
              <th className="p-4 font-playwrite text-sm">Description</th>
              <th className="p-4 font-playwrite text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-6 h-6 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
                    <span>Loading categories...</span>
                  </div>
                </td>
              </tr>
            ):
            categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">No Categories Found</td>
              </tr>
            ):(
              categories.map((category)=>(
                <tr key={category.id}>
                  <td className="p-4">{category.id}</td>
                  <td className="p-4">
                      <img
                          src={category.imageUrl}
                          className="w-14 h-14 rounded-lg object-cover"
                      />
                  </td>
                  <td className="p-4 font-medium">{category.name}</td>
                  <td className="p-4 text-gray-600">{category.description}</td>
                  <td className="p-4">
                    <div className="flex align-center gap-3">
                      <button 
                      onClick={()=> openEditModal(category)}
                      className="px-3 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700">
                        <FiEdit2/>
                      </button>
                      <button 
                        onClick={()=> deleteCategory(category.id)}
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
              {editingCategory ? "Edit Category":"Add Category"}
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">Category Name</label>
                <input type="text" value={formData.name}
                onChange={(e)=>setFormData({...formData,name:e.target.value})}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 outline-none"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Description</label>
                <input type="text" value={formData.description}
                onChange={(e)=>setFormData({...formData,description:e.target.value})}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-zinc-900 outline-none"/>
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
                {editingCategory ? "Edit":"Add"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Categories
