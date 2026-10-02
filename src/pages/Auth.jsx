import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };

    try {
      await authService.register(registerData);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await authService.login({
        email,
        password,
      });

      console.log(res.data);

      await login(res.data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-xl">

        <div className="p-4 sm:p-6 md:p-8">

          {/* Heading */}
          <h1 className="font-bold text-lg sm:text-xl mb-1 font-playwrite text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 mb-5 sm:mb-6 text-xs sm:text-sm text-center px-2">
            {isLogin
              ? "Login to continue shopping"
              : "Join Aria and enjoy better shopping experience."}
          </p>

          {/* Form */}
          {isLogin ? (
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          ) : (
            <RegisterForm
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              password={password}
              setPassword={setPassword}
              handleRegister={handleRegister}
            />
          )}

          {/* Switch Login/Register */}
          <div className="mt-4 sm:mt-5 text-center text-xs sm:text-sm text-gray-600">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="font-semibold text-zinc-900 hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Join now
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-semibold text-zinc-900 hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Sign up
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;