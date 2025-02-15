import React from "react";

const Biography = () => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src="/CNGimages/cng1.jpg" alt="whoweare" />
        </div>
        <div className="banner">
          <h3>Vighnaharta CNG Gas</h3>
          <h4>Specialty: Your Trusted CNG Gas Provider</h4>
          <h5>Years: 5+ years</h5>
          <p>
            A CNG Management System enhances CNG station operations by
            automating fuel transactions, inventory tracking, user roles, and
            reporting. It provides secure authentication, allowing admins,
            operators, and managers to access role-specific features. The system
            ensures real-time tracking of fuel sales, stock levels, and refills,
            reducing errors and boosting efficiency. It also generates reports
            and analytics for insights into fuel consumption, revenue, and
            performance. With security features like two-factor authentication
            and audit trails, it maintains data integrity and regulatory
            compliance. Overall, it streamlines operations, improves service,
            and optimizes resources.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
