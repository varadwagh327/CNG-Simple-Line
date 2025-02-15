import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../index";
import { Navigate } from "react-router-dom";

const Pumps = () => {
  const [pumps, setPumps] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchPumps = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/Pump",
          { withCredentials: true }
        );
        setPumps(data.pumps);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchPumps();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page pumps">
      <h1>Pumps</h1>
      <div className="banner">
        {pumps && pumps.length > 0 ? (
          pumps.map((element) => {
            return (<>
              <div className="card">
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="CNG avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
              </>
            );
          })
        ) : (
          <h1>No Registered Pumps Found!</h1>
        )}
      </div>
    </section>

  );
};

export default Pumps;
