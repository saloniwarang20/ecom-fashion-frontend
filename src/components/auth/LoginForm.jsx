import { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <form
        className="space-y-3 w-full max-w-md mx-auto"
        onSubmit={handleLogin}
      >

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
          Sign In
        </button>

      </form>
    </div>
  );
};

export default LoginForm;