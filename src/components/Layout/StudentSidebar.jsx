import { TbShoppingBagSearch } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { TbCertificate } from "react-icons/tb";
import { TbChecklist } from "react-icons/tb";
import { LuBookMarked } from "react-icons/lu";
import { TbTransactionRupee } from "react-icons/tb";
import { PiSquaresFourBold } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { setAuthUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../firebase/FirebaseConfig";

const StudentSidebar = ({closeSidebar}) => {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const menuItems = [
    { path: '/student/dashboard', label: 'Dashboard', icon: <PiSquaresFourBold size={18} /> },
    { path: '/student/courses', label: 'Your Courses', icon: <LuBookMarked size={18} /> },
    { path: '/student/jobs', label: 'Applied Jobs', icon: <TbShoppingBagSearch size={18} /> },
    { path: '/student/internships', label: 'Applied Internships', icon: <TbChecklist size={18} /> },
    { path: '/student/certificates', label: 'Certificates', icon: <TbCertificate size={18} /> },
    { path: '/student/transactions', label: 'Transaction', icon: <TbTransactionRupee size={18} /> },
  ];

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
    <div className="h-screen fixed top-0 w-64 bg-white px-4 py-6 flex flex-col justify-start border-r border-[#00000033] font-medium text-sm">
        <div className="px-6 mb-8">
            <img src="/skillLoopLogo.svg" alt="Logo" className="h-24" />
        </div>
        <ul className="space-y-1">
            {menuItems.map((item, index) => (
            <li key={index}>
                <Link
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-6 py-2 rounded-full transition-all ${
                    location.pathname === item.path ? 'bg-[#F8EEDD] text-[#D35244] font-semibold' : 'hover:bg-gray-100 text-[#535456]'
                }`}
                >
                {item.icon}
                {item.label}
                </Link>
            </li>
            ))}
        </ul>
        <div className="border-t mt-4 pt-4 px-6">
            <Link
                to='/student/settings'
                className={`flex items-center gap-3 px-6 py-2 rounded-full transition-all ${
                    location.pathname === '/student/settings' ? 'bg-[#F8EEDD] text-[#D35244] font-semibold' : 'hover:bg-gray-100 text-[#535456]'
                }`}
                >
                <CiSettings size={18} />
                Settings
            </Link>
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-6 py-2 rounded-full text-red-600 cursor-pointer hover:bg-red-50 transition-all"
            >
                Logout
            </button>
            
        </div>
    </div>
  );
};

export default StudentSidebar;
