
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
import axios from "axios";
import { fireDB } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";

const CertificateGenerator = ({ user, course, subCourse, courseId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    generateCertificate();
  }, []);

  const generateCertificate = async () => {
    try {
      const certElement = document.getElementById("certificate-preview");

      // 1️⃣ Generate PNG image from HTML
      const canvas = await html2canvas(certElement, { scale: 2 });
      const imgBlob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      // 2️⃣ Upload PNG to Cloudinary as an IMAGE
      const formData = new FormData();
      formData.append("file", imgBlob);
      formData.append("upload_preset", "my_unsigned_upload");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dfhrlgaxw/image/upload",
        formData
      );

      const uploadedUrl = uploadRes.data.secure_url;
      if (!uploadedUrl) throw new Error("Upload failed");

      if (!user?.uid || !courseId || !subCourse?.id) {
        throw new Error("Missing user or course information");
      }

      const userRef = doc(fireDB, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      if (!userData || !userData.yourCourses) {
        toast.error("No purchased courses found.");
        setLoading(false);
        return;
      }

      const updatedYourCourses = [...userData.yourCourses];
      const index = updatedYourCourses.findIndex(
        (c) => c.courseId === courseId && c.subCourseId === subCourse.id
      );

      if (index === -1) {
        toast.error("Course not found in yourCourses");
        setLoading(false);
        return;
      }

      if (updatedYourCourses[index].certificate) {
        toast.info("✅ Certificate already generated!");
        setLoading(false);
        return;
      }

      const subCourseRef = doc(
        fireDB,
        "courses",
        courseId,
        "subCategories",
        subCourse.id
      );
      const subSnap = await getDoc(subCourseRef);
      const subData = subSnap.data();
      const certs = subData?.generatedCertificates || [];

      if (certs.some((c) => c.uid === user.uid)) {
        toast.info("✅ Certificate already generated for this subcategory!");
        setLoading(false);
        return;
      }

      updatedYourCourses[index].certificate = uploadedUrl;
      updatedYourCourses[index].certificateGenerated = true;

      await updateDoc(userRef, {
        yourCourses: updatedYourCourses,
      });

      await updateDoc(subCourseRef, {
        generatedCertificates: arrayUnion({
          uid: user.uid,
          name: user.name || "",
          certificate: uploadedUrl,
          generatedAt: new Date().toISOString(),
        }),
      });

      setLoading(false);
      toast.success("🎉 Certificate generated & saved!");
    } catch (err) {
      console.error("Certificate error:", err);
      toast.error("Error generating certificate");
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const certElement = document.getElementById("certificate-preview");
    html2canvas(certElement, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("landscape", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${user.name}_Certificate.pdf`);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-4 rounded-xl w-[95%] md:w-[85%] max-w-5xl relative overflow-y-auto max-h-[95vh] flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 z-10 cursor-pointer right-4 text-2xl text-gray-600 hover:text-black"
        >
          ❌
        </button>

        <div
          id="certificate-preview"
          className="relative w-full max-w-[1200px] mx-auto"
        >
          <img
            src="/New_Certificate.png"
            alt="Certificate Template"
            className="w-full h-auto object-contain"
          />

          <div className="absolute top-[47%] left-1/2 transform -translate-x-1/2 text-center font-serif text-[2.5vw] md:text-2xl font-bold">
            {user.name}
          </div>
          <div className="absolute top-[53.7%] left-[54.4%] transform -translate-x-1/2 text-center font-serif text-[1.5vw] md:text-[16px]">
            {course.title?.split(" ").slice(0, 3).join(" ")}
          </div>
          <div className="absolute top-[57.5%] left-[65%] transform -translate-x-1/2 text-center font-serif text-[1.5vw] md:text-[16px]">
            {new Date().toLocaleDateString()}
          </div>
          <div className="absolute top-[64.2%] left-[25%] transform -translate-x-1/2 text-center font-serif text-[2.5vw] md:text-2xl font-bold">
            {user.name.split(" ")[0]}
          </div>
        </div>

        {!loading && (
          <button
            onClick={handleDownload}
            className="mt-6 px-6 py-2 cursor-pointer bg-gradient-to-r from-orange-400 via-orange-600 to-orange-600 text-white rounded-lg"
          >
            Download Certificate
          </button>
        )}
      </div>
    </div>
  );
};

export default CertificateGenerator;
