import { FiEdit2, FiMapPin, FiTrash2 } from "react-icons/fi";
import addressService from "../../services/addressService";

const AddressCard = ({ address, onEdit, refresh }) => {

  const handleDelete = async () => {
    if (!window.confirm("Delete this address?")) return;

    try {
      await addressService.deleteAddress(address.id);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border rounded-md hover:shadow-md transition overflow-hidden">

      {/* Address Information */}
      <div className="p-4 sm:p-5">

        <div className="flex items-start gap-2">

          <FiMapPin className="text-zinc-700 mt-1 shrink-0" />

          <div className="flex flex-wrap items-center gap-2 min-w-0">

            <h3 className="font-semibold text-base sm:text-lg wrap-break-word">
              {address.fullName}
            </h3>

            {address.default && (
              <span className="text-[10px] sm:text-xs bg-black text-white px-2 py-1 rounded-full shrink-0">
                Default
              </span>
            )}

          </div>

        </div>

        <div className="mt-4 space-y-1 text-gray-600 text-sm wrap-break-word">

          <p>{address.addressLine1}</p>

          {address.addressLine2 && (
            <p>{address.addressLine2}</p>
          )}

          <p>
            {address.city}, {address.state}
          </p>

          <p>
            {address.country} - {address.postalCode}
          </p>

          <p className="pt-2">
            Phone: {address.phoneNumber}
          </p>

        </div>

      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 border-t">

        <button
          onClick={onEdit}
          className="py-3.5 sm:py-4 text-sm sm:text-base font-semibold rounded-bl-md hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          <FiEdit2 />
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="py-3.5 sm:py-4 text-sm sm:text-base bg-zinc-900 text-white font-semibold rounded-br-md hover:bg-zinc-700 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          <FiTrash2 />
          Delete
        </button>

      </div>

    </div>
  );
};

export default AddressCard;