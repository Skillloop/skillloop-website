import React from 'react';
import { GoHome } from "react-icons/go";
import { BiSolidArrowFromBottom } from "react-icons/bi";
import { TbShoppingBagSearch, TbTransactionRupee } from "react-icons/tb";
import { IoMdPerson } from "react-icons/io";
import { MdLogout, MdSupervisorAccount } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import { setAuthUser } from '../../redux/authSlice';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const menuItems = [
    { path: '/dashboard', label: 'Home', icon: <GoHome /> },
    { path: '/courses', label: 'Manage Courses', icon: <BiSolidArrowFromBottom /> },
    { path: '/internships', label: 'Manage Internships', icon: <TbShoppingBagSearch /> },
    { path: '/postings', label: 'Manage Postings', icon: <TbShoppingBagSearch /> },
    { path: '/students', label: 'Manage Students', icon: <IoMdPerson /> },
    { path: '/admin_transaction', label: 'Transaction', icon: <TbTransactionRupee /> },
  ];

  // Add Admin Management only for super admin
  if (user?.role === 'superadmin') {
    menuItems.push({
      path: '/admin-management',
      label: 'Manage Admins',
      icon: <MdSupervisorAccount />
    });
  }


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

  return (
    <div className="h-screen w-64 bg-orange-200 text-black py-6 flex flex-col justify-between rounded-2xl sidebar-shadow font-semibold">
      <div>
        <div className="px-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800">
            {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'} Panel
          </h2>
        </div>

        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 rounded-r-full transition-all ${
                  location.pathname === item.path 
                    ? 'bg-orange-300 text-orange-900 font-bold border-r-4 border-orange-500' 
                    : 'hover:bg-orange-100 text-gray-700'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6">
        <Link
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <MdLogout />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
