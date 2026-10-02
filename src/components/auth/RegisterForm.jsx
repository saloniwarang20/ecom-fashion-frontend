import { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";

const RegisterForm = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  setFirstName,
  setLastName,
  setEmail,
  setPhoneNumber,
  setPassword,
  handleRegister,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <form
        className="space-y-3 w-full max-w-md mx-auto"
        onSubmit={handleRegister}
      >

        {/* First Name */}
        <div className="relative">
          <FiUser className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base sm:text-lg" />

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full rounded-xl bg-white border border-gray-300 outline-none py-3 pl-11 sm:pl-12 pr-4 text-sm sm:text-base transition focus:border-zinc-900 focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Last Name */}
        <div className="relative">
          <FiUser className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base sm:text-lg" />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full rounded-xl bg-white border border-gray-300 outline-none py-3 pl-11 sm:pl-12 pr-4 text-sm sm:text-base transition focus:border-zinc-900 focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <FiMail className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base sm:text-lg" />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl bg-white border border-gray-300 outline-none py-3 pl-11 sm:pl-12 pr-4 text-sm sm:text-base transition focus:border-zinc-900 focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <FiPhone className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base sm:text-lg" />

          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="w-full rounded-xl bg-white border border-gray-300 outline-none py-3 pl-11 sm:pl-12 pr-4 text-sm sm:text-base transition focus:border-zinc-900 focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FiLock className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base sm:text-lg" />

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl bg-white border border-gray-300 outline-none py-3 pl-11 sm:pl-12 pr-11 sm:pr-12 text-sm sm:text-base transition focus:border-zinc-900 focus:ring-2 focus:ring-black/10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-full bg-zinc-900 text-white py-3 mt-3 text-sm sm:text-base font-medium transition-all duration-300 hover:bg-zinc-700 hover:shadow-lg active:scale-95"
        >
          Join Now
        </button>

      </form>
    </div>
  );
};

export default RegisterForm;