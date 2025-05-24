import React, { useState } from "react";
import UserLayout from "../layout/UserLayout";
import ReferralProgram from "./ReferralProgram";
import ReferralEarnings from "./ReferralEarnings";

const UserReferal = () => {
  const [activeTab, setActiveTab] = useState("refer");

  // Mock data for referral products
  const referralProducts = [
    {
      id: 1,
      title: "Advanced Web Development",
      type: "Course Bundle",
      description: "Complete web development course with modern technologies",
      commission: 25,
      price: 199.99,
      icon: "bi-code-square",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      type: "Video Course",
      description: "Master the art of modern UI/UX design",
      commission: 20,
      price: 149.99,
      icon: "bi-palette",
    },
    {
      id: 3,
      title: "Business Email Pro",
      type: "Service",
      description: "Professional email service for businesses",
      commission: 15,
      price: 99.99,
      icon: "bi-envelope",
    },
    {
      id: 4,
      title: "Cloud Hosting Plus",
      type: "Service",
      description: "Premium cloud hosting solution",
      commission: 30,
      price: 299.99,
      icon: "bi-cloud",
    },
  ];

  // Mock data for earnings
  const earnings = [
    {
      id: 1,
      product: "Advanced Web Development",
      customer: "John Doe",
      date: "2024-03-15",
      commission: 49.99,
      status: "Paid",
    },
    {
      id: 2,
      product: "UI/UX Design Masterclass",
      customer: "Jane Smith",
      date: "2024-03-14",
      commission: 29.99,
      status: "Pending",
    },
    {
      id: 3,
      product: "Cloud Hosting Plus",
      customer: "Mike Johnson",
      date: "2024-03-12",
      commission: 89.99,
      status: "Paid",
    },
  ];

  const totalEarnings = earnings.reduce(
    (sum, earning) => sum + earning.commission,
    0
  );
  const pendingEarnings = earnings
    .filter((e) => e.status === "Pending")
    .reduce((sum, earning) => sum + earning.commission, 0);

  return (
    <UserLayout title="Referral Program">
      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "refer" ? "active" : ""}`}
            onClick={() => setActiveTab("refer")}
          >
            Refer & earn
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "earnings" ? "active" : ""}`}
            onClick={() => setActiveTab("earnings")}
          >
            My earnings
          </button>
        </li>
      </ul>

      {activeTab === "refer" ? <ReferralProgram /> : <ReferralEarnings />}
    </UserLayout>
  );
};

export default UserReferal;
