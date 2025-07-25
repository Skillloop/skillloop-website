
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { PiExport } from "react-icons/pi";

const statusColor = {
  Done: "bg-green-100 text-green-600",
  Failed: "bg-red-100 text-red-600",
};

const statusDot = {
  Done: "bg-green-500",
  Failed: "bg-red-500",
};

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const snapshot = await getDocs(collection(fireDB, "transactions"));
        const txns = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(txns);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold">All Transactions</h2>
        <button className="flex items-center gap-2 text-sm px-4 py-1 border rounded hover:bg-gray-50 transition">
          <PiExport className="w-4 h-4" />
          Export
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-gray-300">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                {[
                  "Transaction ID",
                  "Course Title",
                  "Course Price",
                  "Student Name",
                  "Email",
                  "Contact Number",
                  "Purchased Time",
                  "Payment Status",
                ].map((heading, index, array) => (
                  <th
                    key={heading}
                    className={`px-4 py-3 border border-gray-300 font-medium`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 border border-gray-300">
                    {txn.paymentId || txn.id}
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    {txn.courseTitle || "N/A"}
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    ₹{txn.pricePaid?.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    {txn.userName || "N/A"}
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    {txn.userEmail || "N/A"}
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    {txn.userContact || "N/A"}
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    {txn.paidAt
                      ? new Date(txn.paidAt).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full ${
                        statusColor[txn.paymentStatus] || "bg-green-100 text-green-700"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          statusDot[txn.paymentStatus] || "bg-green-700"
                        }`}
                      />
                      {txn.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;
