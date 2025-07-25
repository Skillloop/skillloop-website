// src/utils/sendEmail.js
import emailjs from "@emailjs/browser";

export const sendEmail = async (transaction) => {
  try {
    const result = await emailjs.send(
      "service_hlywcpw",
      "template_ji4wnlg",
      {
        transaction_id: transaction.paymentId,
        course_title: transaction.courseTitle,
        price_paid: transaction.pricePaid,
        user_name: transaction.userName,
        user_email: transaction.userEmail,
        paid_at: new Date(transaction.paidAt).toLocaleString(),
        payment_status: transaction.paymentStatus,
      },
      "qE4e5hYew-5DMhwxe"
    );

    console.log("✅ Email sent:", result.text);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};
