import { useEffect, useState } from "react";
import addressService from "../../services/addressService";
import { Pencil, Plus } from "lucide-react";
import AddressModal from "../profile/AddressModal";

const AddressSection = ({
  selectedAddress,
  setSelectedAddress
}) => {

  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {

    const res = await addressService.getMyAddresses();

    setAddresses(res.data);

    const defaultAddress = res.data.find(
      (a) => a.default
    );

    if (!selectedAddress && defaultAddress) {
      setSelectedAddress(defaultAddress.id);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowModal(true);
  };

  return (
    <div className="py-5 sm:py-6 px-4 sm:px-6 lg:px-8">

      <h2 className="text-base sm:text-lg font-extrabold mb-2">
        Delivery
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Saved Addresses
      </p>


      {/* Addresses */}
      <div className="space-y-3">

        {addresses.map((address) => (

          <div
            key={address.id}
            onClick={() => setSelectedAddress(address.id)}
            className={`relative flex items-start justify-between gap-3 p-4 sm:p-5 cursor-pointer border rounded-lg transition-all
              ${
                selectedAddress === address.id
                  ? "border-black bg-gray-50"
                  : "border-gray-300 hover:border-gray-500"
              }
            `}
          >

            {/* Address information */}
            <div className="flex-1 min-w-0">

              <div className="flex flex-wrap items-center gap-2 pr-6 ">

                <input
                  type="radio"
                  checked={selectedAddress === address.id}
                  readOnly
                  className=" accent-zinc-900 w-3 h-3 shrink-0"
                />

                <h3 className=" font-semibold text-sm sm:text-base wrap-break-word ">
                  {address.fullName}
                </h3>

                {address.default && (
                  <span className="px-2 py-1 text-[10px] sm:text-xs rounded-full bg-black text-white font-extrabold shrink-0">
                    Default
                  </span>
                )}

              </div>


              {/* Address */}
              <div className="mt-2 text-xs sm:text-sm text-gray-600 leading-5 sm:leading-6 wrap-break-word">

                <p>
                  {address.addressLine1}
                </p>

                {address.addressLine2 && (
                  <p>
                    {address.addressLine2}
                  </p>
                )}

                <p>
                  {address.city}, {address.state}
                </p>

                <p>
                  {address.country} - {address.postalCode}
                </p>

                <p className="mt-2">
                  {address.phoneNumber}
                </p>

              </div>

            </div>


            {/* Edit */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(address);
              }}
              className="text-gray-500 hover:text-black cursor-pointer p-1 shrink-0"
              aria-label="Edit address"
            >
              <Pencil size={17} />
            </button>

          </div>

        ))}

      </div>


      {/* Add Address */}
      <button
        onClick={() => {
          setEditingAddress(null);
          setShowModal(true);
        }}
        className=" mt-4 w-full cursor-pointer flex justify-center items-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-2.5 px-3 text-sm sm:text-base font-semibold hover:border-black hover:bg-gray-50 transition"
      >
        <Plus size={18} />
        Add new Address
      </button>


      {/* Modal */}
      {showModal && (
        <AddressModal
          address={editingAddress}
          onClose={() => {
            setShowModal(false);
            setEditingAddress(null);
          }}
          refresh={fetchAddress}
        />
      )}

    </div>
  );
};

export default AddressSection;