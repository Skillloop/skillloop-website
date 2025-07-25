import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AuthModal from "./AuthModal";
import { createPortal } from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { setAuthUser } from "../redux/authSlice";
import { auth } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState("signin");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openSignInModal = () => {
    setAuthInitialView("signin");
    setIsAuthModalOpen(true);
  };

  const openCreateAccountModal = () => {
    setAuthInitialView("createaccount");
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setAuthUser(null));
      navigate('/')
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const handleDashboard = () => {
    if (user?.role === 'student') {
      navigate('/student/dashboard');
    } else if (user?.role === 'admin') {
      navigate('/dashboard');
    }
    setIsProfileDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="py-4 px-8">
        <div className="container mx-auto flex justify-between items-center">
          <img
            src="/skillLoopLogo.svg"
            alt="SkillLoop Logo"
            className="h-16 w-16"
          />

          {/* Hamburger menu - Mobile */}
          <button
            className="flex gap-3 lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {user ? (
              <img
                src={
                  user?.photoURL ||
                  "https://imgs.search.brave.com/bWNFz9pFC1Ul5pZ7ql6Z9qc1cTlkBrZbXMdCTkoMqeY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvbWFuLWF2YXRh/ci1wcm9maWxlLXBp/Y3R1cmUtdmVjdG9y/LWlsbHVzdHJhdGlv/bl8yNjg4MzQtNTM4/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA"
                }
                alt="Profile"
                className="w-8 h-8 rounded-2xl object-cover"
              />
            ) : (
              " "
            )}

            <svg
              className={`w-8 h-8 ${isOpen ? "fixed z-50 right-4" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex space-x-8 items-center">
            {/* <li><a href="/" className="text-sm">Home</a></li> */}
            <li><NavLink to="/" className="text-sm">Home</NavLink></li>
            {/* <li><a href="/coursedetail" className="text-sm">Courses</a></li> */}
            <li><NavLink to="/coursedetail" className="text-sm">Courses</NavLink></li>
            {/* <li><a href="/internship" className="text-sm">Internship</a></li> */}
            <li><NavLink to="/internship" className="text-sm">Internship</NavLink></li>
            {/* <li><a href="/jobopenings" className="text-sm">Job Openings</a></li> */}
            <li><NavLink to="/jobopenings" className="text-sm">Job Openings</NavLink></li>
            {/* <li><a href="/contact" className="text-sm">Contact</a></li> */}
            <li><NavLink to="/contact" className="text-sm">Contact</NavLink></li>
          </ul>

          {user ? (
            <div className="hidden lg:flex items-center space-x-4">
              <img
                src="/shopping.svg"
                onClick={() => navigate("/cart")}
                className="w-6 h-6 text-gray-700 cursor-pointer"
              />

              <div ref={dropdownRef} className="relative">
                <div
                  onClick={toggleProfileDropdown}
                  className="text-xs flex items-center border-2 border-gray-200 rounded-lg p-2 gap-4 cursor-pointer"
                >
                  <img
                    src={user?.photoURL || "https://picsum.photos/200"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-700" />
                </div>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <button
                      onClick={handleDashboard}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-red-50"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={openSignInModal}
                className="text-sm bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#FDF1DF] rounded-full py-2 px-8 cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={openCreateAccountModal}
                className="text-sm bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white rounded-full py-2 px-8 cursor-pointer"
              >
                Create an Account
              </button>
            </div>
          )}

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="lg:hidden fixed top-0 left-0 right-0 bg-white min-h-screen p-5 pt-28 z-[49]"
              >
                <ul className="flex flex-col space-y-4">
                  <li><a href="/" onClick={closeMenu} className="text-sm block py-2">Home</a></li>
                  <li><a href="/coursedetail" onClick={closeMenu} className="text-sm block py-2">Courses</a></li>
                  <li><a href="/internship" onClick={closeMenu} className="text-sm block py-2">Internship</a></li>
                  <li><a href="/jobopenings" onClick={closeMenu} className="text-sm block py-2">Job Openings</a></li>
                  <li><a href="/contact" onClick={closeMenu} className="text-sm block py-2">Contact</a></li>

                  {user ? (
                    <li className="pt-4">
                      <button
                        onClick={handleLogout}
                        className="w-full text-sm block bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#FDF1DF] rounded-full py-2 px-8 text-center"
                      >
                        Logout
                      </button>
                    </li>
                  ) : (
                    <>
                      <li className="pt-4">
                        <button
                          onClick={openSignInModal}
                          className="w-full text-sm block bg-gradient-to-b from-[#F4B860] to-[#D35244] bg-clip-text text-transparent border-2 border-[#FDF1DF] rounded-full py-2 px-8 text-center"
                        >
                          Login
                        </button>
                      </li>
                      <li className="pt-2">
                        <button
                          onClick={openCreateAccountModal}
                          className="w-full text-sm block bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white rounded-full py-2 px-8 text-center"
                        >
                          Create an Account
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Auth Modal */}
          {isAuthModalOpen &&
            createPortal(
              <div className="fixed inset-0 overflow-y-auto bg-white/50 z-50">
                <AuthModal
                  onClose={closeAuthModal}
                  initialView={authInitialView}
                />
              </div>,
              document.body
            )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
