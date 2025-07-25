
import { useState } from 'react';
import { Eye, EyeOff, X,Loader } from 'lucide-react';
import { auth, fireDB, googleProvider } from '../firebase/FirebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onClose, onSwitchToCreateAccount }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const togglePassword = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


const handleSubmit = async () => {
  const { email, password } = formData;

  if (!email || !password) {
    setError('Please enter both email and password.');
    return;
  }

  setLoading(true);
  setError('');

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    // 🔥 Fetch user data from Firestore
    const userRef = doc(fireDB, 'users', res.user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error('User data not found in Firestore.');
    }

    const userData = userSnap.data();
    dispatch(setAuthUser({
      ...userData,
      uid: res.user.uid,
      role: 'student'
    }));
    toast.success('Student signed in successfully');

    onClose?.();

  } catch (err) {
    setError(err.message || 'Sign in failed');
    toast.error(err.message || 'Sign in failed');
  } finally {
    setLoading(false);
  }
};

const handleGoogleSignIn = async () => {
  setLoading(true);
  setError('');

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { user } = result;

    // 🔥 Fetch user data from Firestore
    const userRef = doc(fireDB, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error('User data not found in Firestore.');
    }

    const userData = userSnap.data();

    dispatch(setAuthUser({
      ...userData,
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      role: 'student' // or pull from Firestore if stored
    }));

    toast.success('Signed in with Google successfully');
    onClose?.();
  } catch (err) {
    setError(err.message || 'Google sign-in failed');
    toast.error(err.message || 'Google sign-in failed');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 scrollbar-hide">
      <div className="w-full max-w-sm sm:max-w-md relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 z-20 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
            aria-label="Close sign in"
          >
            <X size={20} className="text-gray-600 hover:text-gray-800" />
          </button>
        )}

        <div className='p-[1px] rounded-2xl sm:rounded-3xl bg-[radial-gradient(circle_at_bottom,#211B86,#FFB47B)]'>
          <div className="bg-white/98 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 relative z-10">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Welcome back</h1>
              <p className="text-sm sm:text-base text-gray-600">Please enter your details to sign in</p>
            </div>

            {/* Form */}
            <div className="space-y-4 sm:space-y-6 relative z-10">
              {/* Email */}
              <div className='bg-radial from-[#99999910] to-[#00000010] p-4 rounded-lg sm:rounded-xl'>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="w-full focus:outline-none text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div className='bg-radial from-[#99999910] to-[#00000010] p-4 rounded-lg sm:rounded-xl'>
                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleInputChange}
                    className="w-full focus:outline-none text-sm sm:text-base"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm sm:text-base"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    Signing in...
                  </div>
                ) : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center gap-4 my-6">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="text-gray-600 text-sm font-medium">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-gray-100 text-gray-700 py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-medium flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm sm:text-base"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    Please wait...
                  </div>
                ) : (
                  <>
                    <img src="/google.svg" alt="Google Icon" className="w-4 h-4 sm:w-5 sm:h-5" />
                    Continue with Google
                  </>
                )}
              </button>
            </div>

            {/* Switch to Create Account */}
            <div className="text-center mt-6 sm:mt-8 relative z-10">
              <p className="text-gray-600 text-xs sm:text-sm">
                Don&apos;t have an account?
                <button
                  onClick={onSwitchToCreateAccount}
                  className="text-red-500 font-semibold hover:text-red-600 transition-colors duration-200 ml-1 cursor-pointer underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
