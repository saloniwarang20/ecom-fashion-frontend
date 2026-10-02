const ActionButtons = ({
    saving,
    isEdit,
    onSave,
    onCancel
}) => {
    return (
        <div className="flex justify-end gap-4 mt-10 border-t pt-6">

            <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
                Cancel
            </button>

            <button
                type="button"
                disabled={saving}
                onClick={onSave}
                className={`px-6 py-3 rounded-xl text-white transition
                    ${
                        saving
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-zinc-900 hover:bg-zinc-700"
                    }`}
            >
                {saving
                    ? (isEdit ? "Updating..." : "Saving...")
                    : (isEdit ? "Update Product" : "Save Product")}
            </button>

        </div>
    );
};

export default ActionButtons;