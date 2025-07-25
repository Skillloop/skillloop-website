
import { useState } from "react";
import { FiEdit3, FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Loader } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { setAuthUser } from "../redux/authSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    contact: user?.contact || "",
    college: user?.college || "",
    photoURL: user?.photoURL || "",
  });

  const [editMode, setEditMode] = useState(false);
  const [tempForm, setTempForm] = useState(form);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false); // ✅ for submit loader

  const handleChange = (e) => {
    setTempForm({ ...tempForm, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "my_unsigned_upload");
    data.append("cloud_name", "dfhrlgaxw");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dfhrlgaxw/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const resData = await res.json();
      if (resData.secure_url) {
        setTempForm({ ...tempForm, photoURL: resData.secure_url });
        toast.success("Profile picture uploaded!");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSaving(true); // ✅ Start loader
      const userRef = doc(fireDB, "users", user.uid);
      await updateDoc(userRef, {
        name: tempForm.name,
        contact: tempForm.contact,
        college: tempForm.college,
        photoURL: tempForm.photoURL,
      });

      setForm(tempForm);

      dispatch(setAuthUser({ ...user, ...tempForm }));

      setEditMode(false);
      toast.success("Profile updated!");
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    } finally {
      setSaving(false); // ✅ Stop loader
    }
  };

  const handleDiscard = () => {
    setTempForm(form);
    setEditMode(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg space-y-6">
      <h2 className="text-lg font-semibold">My Profile</h2>

      {/* Avatar & Name */}
      <div className="border rounded-lg p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 border">
            <img
              src={tempForm.photoURL || "https://picsum.photos/200"}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
            {editMode && (
              <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full border cursor-pointer">
                <FiUpload size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={tempForm.name}
                onChange={handleChange}
                className="border rounded px-2 py-1"
              />
            ) : (
              <p className="font-semibold">{form.name}</p>
            )}
            <p className="text-sm text-gray-500">{form.email}</p>
          </div>
        </div>

        <div className="flex space-x-2">
          {editMode && (
            <button
              onClick={handleDiscard}
              className="text-sm border px-4 py-1 rounded hover:bg-gray-100"
            >
              Discard
            </button>
          )}
          <button
            onClick={editMode ? handleSubmit : () => setEditMode(true)}
            disabled={uploading || saving}
            className="text-sm bg-gradient-to-r from-[#F4B860] to-[#D35244] text-white px-4 py-1 rounded flex items-center gap-2"
          >
            {editMode ? (
              <>
                {saving ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </>
            ) : (
              <>
                <FiEdit3 /> Edit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="border rounded-lg p-4 flex justify-between items-start">
        <div className="space-y-2 text-sm w-full">
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{form.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Contact</p>
            {editMode ? (
              <input
                type="text"
                name="contact"
                value={tempForm.contact}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="font-medium">{form.contact || "—"}</p>
            )}
          </div>

          <div>
            <p className="text-gray-500">College</p>
            {editMode ? (
              <input
                type="text"
                name="college"
                value={tempForm.college}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="font-medium">{form.college || "—"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
