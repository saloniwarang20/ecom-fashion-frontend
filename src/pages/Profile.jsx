import { useState } from "react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import useAuth from "../hooks/useAuth";
import PersonalInfo from "../components/profile/PersonalInfo";
import Orders from "../components/profile/Orders";
import Address from "../components/profile/Address";
import { SlEarphonesAlt } from "react-icons/sl";

const Profile = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 xl:px-20 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-bold text-lg sm:text-xl mb-2.5 font-playwrite">
            My Account
          </h1>

          <p className="text-gray-500 text-sm sm:text-base">
            Manage your personal information
          </p>
        </div>

        {/* Account Container */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">

            {/* Sidebar */}
            <ProfileSidebar
              user={user}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Content */}
            <div className="p-5 sm:p-7 lg:p-8 xl:p-12 min-w-0">

              {activeTab === "profile" && <PersonalInfo />}

              {activeTab === "orders" && <Orders />}

              {activeTab === "address" && <Address />}

            </div>

          </div>

        </div>

        {/* Help */}
        <div className="mt-8 sm:mt-10 text-xs sm:text-sm text-gray-900 flex items-center justify-center gap-2 text-center">
          <SlEarphonesAlt className="shrink-0" />

          <p>
            Need help?{" "}
            <a
              href="#"
              className="underline hover:text-zinc-600 transition-colors"
            >
              Contact our support
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Profile;