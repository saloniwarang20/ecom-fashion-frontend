import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import addressService from "../../services/addressService";
import AddressCard from "./AddressCard";
import AddressModal from "./AddressModal";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const res = await addressService.getMyAddresses();
      setAddresses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold">
            Address
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Manage your saved delivery addresses.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingAddress(null);
            setShowModal(true);
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-zinc-900 text-white px-5 py-3 text-sm font-medium hover:bg-zinc-700 transition-all duration-300 hover:shadow-lg active:scale-95"
        >
          <FiPlus />
          Add Address
        </button>

      </div>

      {/* Empty */}
      {addresses.length === 0 ? (
        <div className="text-center py-14 sm:py-20 px-4 border rounded-2xl">

          <h3 className="text-lg sm:text-xl font-semibold">
            No Saved Addresses
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Add an address to make checkout faster
          </p>

        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">

          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => {
                setEditingAddress(address);
                setShowModal(true);
              }}
              refresh={fetchAddress}
            />
          ))}

        </div>
      )}

      {showModal && (
        <AddressModal
          address={editingAddress}
          onClose={() => setShowModal(false)}
          refresh={fetchAddress}
        />
      )}

    </div>
  );
};

export default Address;