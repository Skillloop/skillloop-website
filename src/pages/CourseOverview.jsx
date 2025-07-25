
import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { CgNotes } from "react-icons/cg";
import { RiBookReadFill } from "react-icons/ri";
import { MdLiveTv } from "react-icons/md";
import { IoVolumeMedium } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setCart } from "../redux/authSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loader";
import CertificateGenerator from "../components/CertificateGenerator";
import { sendEmail } from "../utils/sendEmail";



const CourseOverview = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const selectedLevel = location.state?.plan || "Basic";

  const [course, setCourse] = useState(null);
  const [subCourse, setSubCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [isBought, setIsBought] = useState(false);

  const [showCertGen, setShowCertGen] = useState(false);

  const rpay = "4386 2894 0766 0153"

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ NEW states for watch tracking
  const [canGenerateCertificate, setCanGenerateCertificate] = useState(false);

    const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRef = doc(fireDB, "courses", id);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
          const courseData = courseSnap.data();
          // setCourse(courseData);
          setCourse({ ...courseData, id:courseSnap.id});
          const subCol = collection(courseRef, "subCategories");
          const subSnap = await getDocs(subCol);

          let foundSub = null;
          subSnap.forEach((doc) => {
            const data = doc.data();
            if (data.level?.toLowerCase() === selectedLevel.toLowerCase()) {
              foundSub = { id: doc.id, ...data };
            }
          });

          setSubCourse(foundSub);

          if (user && foundSub) {
            let bought = false;

            if (
              user.yourCourses?.some(
                (c) => c.courseId === id && c.subCourseId === foundSub.id
              )
            ) {
              bought = true;
            } else {
              const userRef = doc(fireDB, "users", user.uid);
              const userSnap = await getDoc(userRef);
              const userData = userSnap.data();
              if (
                userData?.yourCourses?.some(
                  (c) => c.courseId === id && c.subCourseId === foundSub.id
                )
              ) {
                bought = true;
              }
            }

            const subRef = doc(courseRef, "subCategories", foundSub.id);
            const subSnap = await getDoc(subRef);
            const subData = subSnap.data();
            if (subData?.enrolledStudents?.some((s) => s.uid === user?.uid)) {
              bought = true;
            }

            setReviews(subData?.reviews || []);

            setIsBought(bought);

            // ✅ Fetch watch progress if any
            const progressRef = doc(
              fireDB,
              "userProgress",
              `${user.uid}_${id}_${foundSub.id}`
            );
            const progressSnap = await getDoc(progressRef);
            if (progressSnap.exists()) {
              const progressData = progressSnap.data();
              if (progressData?.watchedSeconds) {
                setWatchedSeconds(progressData.watchedSeconds);
              }
              if (progressData?.completed) {
                setCanGenerateCertificate(true);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, selectedLevel, user]);




  useEffect(() => {
  const video = videoRef.current;
  if (!video) {
    console.log("No video element found yet.");
    return;
  }
  if (!user) {
    console.log("No user logged in yet.");
    return;
  }
  if (!subCourse) {
    console.log("No subCourse loaded yet.");
    return;
  }

  const handleEnded = async () => {
    console.log("🎉 Video ended event fired!");
    setCanGenerateCertificate(true);
    console.log("✅ canGenerateCertificate set to TRUE");

    const progressRef = doc(
      fireDB,
      "userProgress",
      `${user.uid}_${id}_${subCourse.id}`
    );
    await setDoc(
      progressRef,
      {
        uid: user.uid,
        courseId: id,
        subCourseId: subCourse.id,
        completed: true,
      },
      { merge: true }
    );
    console.log("✅ Progress written to Firestore");
  };

  video.addEventListener("ended", handleEnded);
  console.log("🎥 Video 'ended' listener attached ✅");

  return () => {
    video.removeEventListener("ended", handleEnded);
    console.log("❌ Video 'ended' listener removed");
  };
}, [videoRef.current, user, id, subCourse]);




  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/");
      return;
    }

    try {
      const uniqueId = `${id}_${subCourse.id}_${subCourse.level}`;

      const isAlreadyInLocalCart = user.cart?.some(
        (item) => item.id === uniqueId
      );

      const userRef = doc(fireDB, "users", user.uid);
      const userSnap = await getDoc(userRef);

      let isAlreadyInFirestoreCart = false;
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const firestoreCart = userData.cart || [];
        isAlreadyInFirestoreCart = firestoreCart.some(
          (item) => item.id === uniqueId
        );
      }

      if (isAlreadyInLocalCart || isAlreadyInFirestoreCart) {
        toast.info("Item already in your cart.");
        navigate("/cart");
        return;
      }

      const cartItem = {
        id: uniqueId,
        courseId: id,
        subCourseId: subCourse.id,
        title: `${course.title} - ${subCourse.level}`,
        price: subCourse.price,
        level: subCourse.level,
        image: subCourse.subThumbnail,
        duration: `${subCourse.videoDuration} mins`,
        startDate: "Next Monday",
        addedAt: new Date().toISOString(),
      };

      await updateDoc(userRef, {
        cart: arrayUnion(cartItem),
      });

      const updatedCart = user.cart ? [...user.cart, cartItem] : [cartItem];
      dispatch(setCart(updatedCart));

      toast.success("Added to cart!");
      navigate("/cart");
    } catch (error) {
      console.error(error);
      toast.error("Error adding to cart");
    }
  };



const handleBuyNow = async () => {
  if (!user) {
    toast.error("Please login first");
    navigate("/");
    return;
  }

  if (user.role === "admin") {
    toast.error("Admins cannot purchase courses");
    return;
  }

  try {
    const courseTitle = `${course.title} - ${subCourse.level}`;
    const coursePrice = subCourse.price;

    const orderOptions = {
      key: "rzp_test_bEgUYtg6yXPfNV", // Replace with LIVE key in production!
      amount: parseInt(coursePrice * 100),
      currency: "INR",
      name: "SkillLoop",
      description: `Purchase: ${courseTitle}`,
      order_receipt: `order_rcptid_${user.name}`,
      handler: async function (response) {
        const paymentId = response.razorpay_payment_id;
        const orderId = response.razorpay_order_id || null;
        const signature = response.razorpay_signature || null;
        const timestamp = new Date().toISOString();

        const userRef = doc(fireDB, "users", user.uid);
        const courseRef = doc(fireDB, "courses", id);
        const subCourseRef = doc(courseRef, "subCategories", subCourse.id);

        const purchasedCourse = {
          courseId: id,
          subCourseId: subCourse.id,
          title: courseTitle,
          level: subCourse.level,
          price: coursePrice,
          image: subCourse.subThumbnail,
          paymentId,
          purchasedAt: timestamp,
        };

        await updateDoc(userRef, {
          yourCourses: arrayUnion(purchasedCourse),
        });

        await updateDoc(subCourseRef, {
          enrolledStudents: arrayUnion({
            uid: user.uid,
            email: user.email,
            name: user.name,
            contact: user.contact,
            photoURL: user.photoURL,
            paymentId,
            purchasedAt: timestamp,
          }),
        });

        const transaction = {
          uid: user.uid,
          userName: user.name,
          userEmail: user.email,
          userContact: user.contact,
          courseId: id,
          subCourseId: subCourse.id,
          courseTitle: courseTitle,
          pricePaid: coursePrice,
          paymentId: paymentId,
          paymentStatus: "SUCCESS",
          paidAt: timestamp,
          gateway: "Razorpay",
          razorpay_order_id: orderId,
          razorpay_signature: signature,
          bank: null,
          method: null,
        };

        const transactionRef = doc(collection(fireDB, "transactions"));
        await setDoc(transactionRef, transaction);

        // ✅ Send email
        await sendEmail(transaction);

        dispatch(
          setAuthUser({
            ...user,
            yourCourses: user.yourCourses
              ? [...user.yourCourses, purchasedCourse]
              : [purchasedCourse],
          })
        );

        toast.success("Payment successful! Course unlocked.");
        // navigate("/yourcourses");
      },
      theme: {
        color: "#D35244",
      },
    };

    const razorpay = new window.Razorpay(orderOptions);
    razorpay.open();
  } catch (error) {
    console.error(error);
    toast.error("Payment initiation failed");
  }
};





  console.log("🔑 Rendering cert button: canGenerateCertificate =", canGenerateCertificate);


  const handleAddReview = async () => {
    if (!newReview.trim()) {
      toast.error("Please write something!");
      return;
    }

    if (!subCourse || !user) return;

    try {
      const courseRef = doc(fireDB, "courses", id);
      const subRef = doc(courseRef, "subCategories", subCourse.id);

      const reviewObj = {
        name: user.name,
        pfp: user.photoURL,
        comment: newReview.trim(),
        createdAt: new Date().toISOString(),
      };

      await updateDoc(subRef, {
        reviews: arrayUnion(reviewObj),
      });

      toast.success("Review submitted!");
      setNewReview("");
    } catch (err) {
      console.error(err);
      toast.error("Error submitting review");
    }
  };

  if (loading) {
    return (
      <p className="text-center py-20">
        <Loading />
      </p>
    );
  }

  if (!course || !subCourse) {
    return (
      <p className="text-center py-20">Course or Subcategory not found.</p>
    );
  }

  console.log("subcourse -",subCourse.videoUrl)

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-2 text-gray-800">
        <p className="text-sm text-gray-500">{course.seo?.title || ""}</p>
        <h1 className="text-3xl font-bold mb-1">
          {course.title} - {subCourse.level}
        </h1>

        <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-1">
          <span className="text-red-400 mr-2">
            By {course.seo?.title || "Instructor"}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start mt-6">
          <div className="md:col-span-2">

              <div className="relative w-full max-h-[400px]">
  {isBought ? (
    <>
      <video
        ref={videoRef}
        src={subCourse.videoUrl}
        className="w-full h-full object-cover rounded-lg"
        controls={isPlaying}
        controlsList="nodownload"
      />
      {!isPlaying && (
        <div
          onClick={handlePlayVideo}
          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg cursor-pointer"
        >
          <img
            src={subCourse.subThumbnail}
            alt="Course Thumbnail"
            className="w-[750px] h-[400px] object-cover rounded-lg"
          />
          <button className="absolute text-white text-xl bg-gradient-to-r from-orange-400 via-orange-600 to-orange-600 px-4 py-2 rounded-full cursor-pointer">
            ▶️ Play
          </button>
        </div>
      )}
    </>
  ) : (
    <div className="relative">
      <img
        src={subCourse.subThumbnail}
        alt="Locked Course"
        className="w-[750px] h-[400px] object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-lg">
        <CiLock className="text-4xl text-white mb-2" />
        <p className="text-white font-semibold">Buy this course to unlock the video</p>
      </div>
    </div>
  )}
</div>


            <div className="flex flex-wrap mt-6 font-semibold gap-4">
              {["description", "course", "review"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="cursor-pointer hover:underline hover:decoration-orange-500 capitalize"
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "description" && (
              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-bold">
                  About this {subCourse.level} Plan
                </h2>
                <p className="text-gray-700">{subCourse.courseDescription}</p>
              </div>
            )}

            {(activeTab === "description" || activeTab === "course") && (
              <div className="mt-12">
                <h2 className="text-xl font-bold mb-2">Highlights</h2>
                <ul className="list-disc ml-6 text-gray-700">
                  {subCourse.highlightedHeadings.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {(activeTab === "description" || activeTab === "course") && (
              <div className="mt-12">
                <h2 className="text-xl font-bold mb-2">Sections</h2>
                <ul className="list-disc ml-6 text-gray-700">
                  {subCourse.sections.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "review" && (
              <div className="mt-12 space-y-4">
                <h2 className="text-xl font-bold mb-2">Reviews</h2>
                {reviews && reviews.length > 0 ? (
                   reviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start gap-4 bg-white p-4"
                    >
                      <img
                        src={review.pfp}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-yellow-500">
                          {review.name}
                        </p>
                        <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleString()}</p>
                        <p className="text-sm text-gray-700 mt-1">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">
                    No reviews yet. Be the first to add one!
                  </p>
                )}

                 {isBought && (
                  <div className="mb-4">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Write your review..."
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      rows={3}
                    />
                    <button
                      onClick={handleAddReview}
                      className="mt-2 px-6 py-2 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-600 text-white rounded-lg hover:opacity-90 transition"
                    >
                      Submit Review
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>

          <div className="md:col-span-1 md:top-20">
            <div className="bg-white border rounded-xl p-6 shadow-md flex flex-col justify-between h-full">
              <div className="mt-4">
                <div className="mb-4 flex gap-2">
                  <p className="text-xs font-bold text-gray-400 mt-2">Price</p>
                  <p className="text-xl font-semibold">₹{subCourse.price}</p>
                </div>
              </div>
              <div>
                {!isBought ? (
                  <>
                    <button
                      onClick={handleBuyNow}
                      className="w-full bg-gradient-to-r from-orange-400 via-orange-600 to-orange-600 text-white py-2 rounded-xl mt-4 cursor-pointer"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="w-full border border-orange-500 text-orange-600 py-2 rounded-xl mt-3 cursor-pointer"
                    >
                      Add to cart
                    </button>
                  </>
                ) : (
                  <button className="w-full bg-gradient-to-r from-orange-400 via-orange-600 to-orange-600 text-white py-2 rounded-xl mt-4 cursor-default">
                    ✅You Can Watch Now
                  </button>
                )}
                <ul className="text-sm text-gray-600 space-y-2 mt-4">
                  <li className="flex items-center gap-2">
                    <CgNotes className="text-lg" />
                    {subCourse.sections.length} Sections
                  </li>
                  <li className="flex items-center gap-2">
                    <RiBookReadFill className="text-lg" />
                    {subCourse.videoDuration} min duration
                  </li>
                  <li className="flex items-center gap-2">
                    <MdLiveTv className="text-lg" />
                    {subCourse.level}
                  </li>
                  <li className="flex items-center gap-2">
                    <IoVolumeMedium className="text-lg" />
                    {subCourse.language}
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              {canGenerateCertificate ? (
                <button
                onClick={() => setShowCertGen(true)}
                className="w-full py-2 border cursor-pointer rounded-full bg-gradient-to-r from-orange-400 via-orange-600 to-orange-600 text-white text-sm font-semibold">
                  Generate Certificate
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-2 border rounded-full bg-gray-300 text-white text-sm font-semibold"
                >
                  Complete to Unlock
                </button>
              )}
              <p className="text-xs text-center mt-1 text-black">
                <span className="text-red-500">*</span> It will be unlocked when
                video ends.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[linear-gradient(to_right,white,#f0fdf4,#fefce8,white)]">
        {/* {showCertGen && (
  <CertificateGenerator
    user={user}
    course={{ ...course, id }}
    subCourse={subCourse}
    onComplete={() => setShowCertGen(false)}
  />
)} */}

{showCertGen && (
  <CertificateGenerator
    user={user}
    course={course}
    courseId ={id}
    subCourse={subCourse}
    onClose={() => setShowCertGen(false)}
  />
)}

        <Footer />
      </div>
    </>
  );
};

export default CourseOverview;
