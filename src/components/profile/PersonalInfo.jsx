import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import userService from "../../services/userService";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";

const PersonalInfo = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await userService.updateProfile(formData);

      updateUser(res.data);

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold">
          Personal Information
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Update your profile details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 w-full">

        {/* First + Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">

          <div>
            <label className="block mb-2 text-sm font-medium">
              First Name
            </label>

            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-md bg-white border border-gray-300 outline-none py-3 pl-12 pr-4 text-sm sm:text-base transition focus:border-zinc-900 focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Last Name
            </label>

            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-md bg-white border border-gray-300 outline-none py-3 pl-12 pr-4 text-sm sm:text-base transition focus:border-zinc-900 focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>

        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Email
          </label>

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md bg-white border border-gray-300 outline-none py-3 pl-12 pr-4 text-sm sm:text-base transition focus:border-zinc-900 focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Phone Number
          </label>

          <div className="relative">
            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-md bg-white border border-gray-300 outline-none py-3 pl-12 pr-4 text-sm sm:text-base transition focus:border-zinc-900 focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 sm:mt-10 w-full rounded-full bg-zinc-900 text-white py-3 text-sm sm:text-base font-medium transition-all duration-300 hover:bg-zinc-700 hover:shadow-lg active:scale-95 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </form>
    </div>
  );
};

export default PersonalInfo;