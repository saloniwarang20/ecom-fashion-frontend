import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import addressService from "../../services/addressService";

const AddressModal = ({ address, onClose, refresh }) => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    postalCode: "",
    state: "",
    city: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    default: false,
  });

  useEffect(() => {
    if (address) {
      setFormData(address);
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (address) {
        await addressService.updateAddress(address.id, formData);
      } else {
        await addressService.addAddress(formData);
      }

      refresh();
      onClose();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border-b border-gray-300 outline-none pb-3 text-sm sm:text-base focus:border-black";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3 sm:p-5">

      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-md overflow-hidden flex flex-col">

        {/* Header */}
        <div className="border-b px-4 sm:px-5 py-4 flex justify-between items-center shrink-0">

          <h2 className="text-sm font-semibold uppercase tracking-wide">
            {address ? "Edit Address" : "Add New Address"}
          </h2>

          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FiX size={22} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col min-h-0"
        >

          {/* Form */}
          <div className="p-5 sm:p-8 space-y-5 overflow-y-auto">

            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Name *"
              className={inputClass}
            />

            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Mobile *"
              className={inputClass}
            />

            {/* Pincode + State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10">

              <input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Pincode *"
                className={inputClass}
              />

              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State *"
                className={inputClass}
              />

            </div>

            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City *"
              className={inputClass}
            />

            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country *"
              className={inputClass}
            />

            <input
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              placeholder="House Number / Tower / Block *"
              className={inputClass}
            />

            <textarea
              rows={3}
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Address (Building, Street, Area) *"
              className="w-full border-b border-gray-300 outline-none resize-none text-sm sm:text-base focus:border-black"
            />

            <label className="flex items-start gap-3 text-sm">

              <input
                type="checkbox"
                name="default"
                checked={formData.default}
                onChange={handleChange}
                className="accent-zinc-900 w-4 h-4 mt-0.5 shrink-0"
              />

              <span>Set as default address</span>

            </label>

          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 border-t shrink-0">

            <button
              type="button"
              onClick={onClose}
              className="py-3.5 sm:py-4 text-sm sm:text-base font-semibold hover:bg-gray-100"
            >
              CANCEL
            </button>

            <button
              type="submit"
              disabled={loading}
              className="py-3.5 sm:py-4 text-sm sm:text-base bg-zinc-900 text-white font-semibold hover:bg-zinc-700 disabled:opacity-50"
            >
              {loading ? "SAVING..." : "SAVE"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddressModal;