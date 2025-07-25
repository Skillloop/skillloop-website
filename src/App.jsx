import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './layouts/Landing';
import CoursePlans from './pages/CoursePlans';
import CourseDetails from './pages/CourseDetails';
import CourseOverview from './pages/CourseOverview';
import Cart from './pages/Cart';import LayoutWithSidebar from './components/Layout/LayoutWithSidebar';
import LayoutWithoutSidebar from './components/Layout/LayoutWithoutSidebar';
import ManageCourses from './pages/ManageCourses';
import CreateCourse from './pages/CreateCourse';
import Home from './pages/Home';
import ManageStudents from './pages/ManageStudent';
import AddSubCourse from './pages/AddSubCategory';
import EditSubCategory from './pages/EditSubCategory';
import EditMainCourse from './pages/EditMainCourse';
import AddSubCategory from './pages/AddSubCategory';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import CreateInternshipOffer from './pages/CreateInternshipOffer';
import EditInternshipOffer from './pages/EditInternshipOffer';
import StudentProtectedRoute from './components/UserProtectedRoute';
import UserDashboard from './components/UserDashboard';
import StudentLayout from './components/Layout/StudentLayout';
import Navbar from './components/Navbar';
import YourCourse from './components/YourCourse';
import AppliedJobs from './components/AppliedJobs';
import AppliedInternships from './components/AppliedInternships';
import Certificates from './components/Certificates';
import Transactions from './components/Transactions';
import Settings from './components/Settings';
import JobOpenings from './pages/JobOpenings';
import Terms from './pages/Terms';
import Admin from './pages/Admin';
import AdminManagement from './components/AdminManagement';
import ManageInternship from './pages/ManageInternship';
import ManagePosting from './pages/ManagePosting';
import CreateJobPosting from './pages/CreateJobPosting';
import EditJobPosting from './pages/EditJobPosting';
import Internships from './pages/Internships';
import AdminTransactions from './components/AdminTransaction';

function App() {
  return (
    <>
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route element={<Navbar />}>
        <Route path="/" element={<Landing />} />
        <Route path="/courses/:slug/:id/enroll" element={<CoursePlans />} />
        <Route path="/courses/:slug/details" element={<CourseDetails />} />
        <Route path="/courses/:slug/:id/overview" element={<CourseOverview />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/coursedetail" element={<CourseDetails />} />
        <Route path="/jobopenings" element={<JobOpenings />} />
        <Route path="/internship" element={<Internships />} />
        <Route path="/terms" element={<Terms />} />
      </Route>
      {/* <Route path="/adminsignin" element={<Navigate to="/dashboard" replace />} /> */}

      {/* Admin */}
      <Route element={
          <AdminProtectedRoute>
            <LayoutWithSidebar />
            </AdminProtectedRoute>
        }>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/courses" element={<ManageCourses />} />
        <Route path="/internships" element={<ManageInternship />} />
        <Route path="/postings" element={<ManagePosting />} />
        <Route path="/students" element={<ManageStudents />} />
        <Route path="/admin_transaction" element={<AdminTransactions />} />
        <Route path="/admin-management" element={<AdminManagement />} />
      </Route>
      {/* ✅ Protected LayoutWithoutSidebar */}
      <Route
        element={
          <AdminProtectedRoute>
            <LayoutWithoutSidebar />
           </AdminProtectedRoute>
        }
      >
        <Route path="/courses/new" element={<CreateCourse />} />
        <Route path="/courses/:courseId/subcategory/:subCategoryId/edit" element={<EditSubCategory />} />
        <Route path="/courses/:courseId/edit" element={<EditMainCourse />} />
        <Route path="/courses/:courseId/subcategory/add" element={<AddSubCategory />} />
        <Route path="/internships/new" element={ <CreateInternshipOffer /> } />
        <Route path="/internships/edit/:internshipId" element={<EditInternshipOffer />} />
        <Route path="/postings/new" element={ <CreateJobPosting /> } />
        <Route path="/postings/edit/:jobId" element={<EditJobPosting />} />
      </Route>

      {/* Student Dashboard */}
      <Route
        element={
          <StudentProtectedRoute>
            <StudentLayout />
          </StudentProtectedRoute>
        }
        >
          <Route path="/student/dashboard" element={<UserDashboard />} />
          <Route path="/student/courses" element={<YourCourse />} />
          <Route path="/student/jobs" element={<AppliedJobs />} />
          <Route path="/student/internships" element={<AppliedInternships />} />
          <Route path="/student/certificates" element={<Certificates />} />
          <Route path="/student/transactions" element={<Transactions />} />
          <Route path="/student/settings" element={<Settings />} />
      </Route>


      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />


    </Routes>
    </>
  );
}

export default App;









