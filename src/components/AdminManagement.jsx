import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { fireDB, auth } from '../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import {
  Edit,
  Trash,
  PlusCircle,
  Eye,
  EyeOff,
  Lock,
  Unlock
} from 'lucide-react';
import { useSelector } from 'react-redux';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    permissions: {
      canManageCourses: true,
      canManageStudents: true,
      canManagePostings: true,
      canViewAnalytics: true
    },
    status: 'active'
  });

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const adminsRef = collection(fireDB, 'admins');
      const snapshot = await getDocs(adminsRef);

      const adminList = [];
      snapshot.forEach((doc) => {
        adminList.push({ id: doc.id, ...doc.data() });
      });

      setAdmins(adminList);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.error('Failed to fetch admins');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || (!editingAdmin && !formData.password)) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      if (editingAdmin) {
        const adminRef = doc(fireDB, 'admins', editingAdmin.id);
        const updateData = {
          name: formData.name,
          email: formData.email,
          permissions: formData.permissions,
          status: formData.status,
          updatedAt: new Date(),
          updatedBy: currentUser.uid
        };

        await updateDoc(adminRef, updateData);
        toast.success('Admin updated successfully');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const adminId = userCredential.user.uid;

        await setDoc(doc(fireDB, 'admins', adminId), {
          name: formData.name,
          email: formData.email,
          permissions: formData.permissions,
          status: formData.status,
          createdAt: new Date(),
          createdBy: currentUser.uid,
          role: 'admin'
        });

        toast.success('Admin created successfully');
      }

      setShowModal(false);
      setEditingAdmin(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        permissions: {
          canManageCourses: true,
          canManageStudents: true,
          canManagePostings: true,
          canViewAnalytics: true
        },
        status: 'active'
      });
      fetchAdmins();
    } catch (error) {
      console.error('Error saving admin:', error);
      toast.error(error.message || 'Failed to save admin');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: '',
      permissions: admin.permissions,
      status: admin.status
    });
    setShowModal(true);
  };

  const handleDelete = async (adminId) => {
    if (!confirm('Are you sure you want to delete this admin?')) return;

    try {
      await deleteDoc(doc(fireDB, 'admins', adminId));
      toast.success('Admin deleted successfully');
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast.error('Failed to delete admin');
    }
  };

  const toggleStatus = async (admin) => {
    try {
      const newStatus = admin.status === 'active' ? 'inactive' : 'active';
      const adminRef = doc(fireDB, 'admins', admin.id);

      await updateDoc(adminRef, {
        status: newStatus,
        updatedAt: new Date(),
        updatedBy: currentUser.uid
      });

      toast.success(`Admin ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
      fetchAdmins();
    } catch (error) {
      console.error('Error toggling admin status:', error);
      toast.error('Failed to update admin status');
    }
  };

  if (currentUser?.role !== 'superadmin') {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Access Denied: Only Super Admin can manage admins.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <PlusCircle size={18} /> Add Admin
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {admin.permissions?.canManageCourses && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Courses</span>
                      )}
                      {admin.permissions?.canManageStudents && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Students</span>
                      )}
                      {admin.permissions?.canManagePostings && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Postings</span>
                      )}
                      {admin.permissions?.canViewAnalytics && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Analytics</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(admin)} className="text-blue-600 hover:text-blue-900">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => toggleStatus(admin)}
                        className={`${admin.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                      >
                        {admin.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
                      </button>
                      <button onClick={() => handleDelete(admin.id)} className="text-red-600 hover:text-red-900">
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingAdmin ? 'Edit Admin' : 'Add New Admin'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={editingAdmin}
                />
              </div>
              {!editingAdmin && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="space-y-2">
                  {Object.entries(formData.permissions).map(([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            permissions: { ...formData.permissions, [key]: e.target.checked }
                          })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingAdmin(null);
                    setFormData({
                      name: '',
                      email: '',
                      password: '',
                      permissions: {
                        canManageCourses: true,
                        canManageStudents: true,
                        canManagePostings: true,
                        canViewAnalytics: true
                      },
                      status: 'active'
                    });
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingAdmin ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
