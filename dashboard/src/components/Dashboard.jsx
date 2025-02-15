import { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import axios from "axios";
import { Navigate } from "react-router-dom";
import CNGimage from "../All_Images/cng10.jpg";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillClockCircle } from "react-icons/ai";
import { toast } from "react-toastify";

function Dashboard() {
  const { isAuthenticated, user } = useContext(Context);
  const [bookingDate, setBookingDate] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/booking/getall",
          { withCredentials: true }
        );
        setBookingDate(data.bookings);
      } catch (error) {
        setBookingDate([]);
        console.log("SOME ERROR OCCURED WHILE FETCHING BOOKING", error);
      }
    };
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/booking/update/${bookingId}`,
        { status },
        { withCredentials: true }
      );
      setBookingDate((prevAppointments) =>
        prevAppointments.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status }
            : booking
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src={CNGimage} alt="CNGimage" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {user && `${user.firstName} ${user.lastName}`}
                  {""}
                </h5>
              </div>
              <p>
                A CNG Management System is designed to streamline the operations
                of CNG (Compressed Natural Gas) stations by managing fueling
                transactions, user roles, and station data efficiently.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Bookings</p>
            <h3>1500</h3>
          </div>
          <div className="thirdBox">
            <p>Registered CNG Pump</p>
            <h3>1</h3>
          </div>
        </div>
        <div className="banner">
          <h5>BOOLING</h5>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Date</th>
                <th>Time(HHMM)</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {bookingDate && bookingDate.length > 0 ? (
                bookingDate.map((booking) => {
                  return (
                    <tr key={booking._id}>
                      <td>{`${booking.firstName} ${booking.lastName}`}</td>
                      <td>{booking.booking_date.substring(0, 16)}</td>
                      <td>{booking.time}</td>
                      <td>
                        <select
                          className={
                            booking.status === "Pending"
                              ? "value-pending"
                              : booking.status === "Rejected"
                              ? "value-rejected"
                              : "value-accepted"
                          }
                          value={booking.status}
                          onChange={(e) =>
                            handleUpdateStatus(booking._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>
                        {booking.hasVisited === true ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillClockCircle className="red" />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h1>NO BOOKING!</h1>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
