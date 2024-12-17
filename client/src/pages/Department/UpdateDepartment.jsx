import React, { useEffect, useState, useContext } from "react";
import "../../styles/employee.css";
import { useNavigate, useParams } from "react-router-dom";
import SideNav from "../../components/SideNav";
import Nav from "../../components/Nav";
import Loading from "../../components/Loading";
import { MyContext } from "../../context/MyContext";
import Title from "../../components/Employee/AddEmployee/Title";

const UpdateDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [department, setDepartment] = useState("");
  const [uid, setUid] = useState("");
  const { isLoading, setIsLoading, isOpen } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/Department/${id}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setDepartment(data.department);
        setUid(data._id);
        setIsLoading(false);
      } catch (err) {
        alert(`Error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdateDepartment = async (e, uid) => {
    e.preventDefault();
    try {
      const PostOption = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department: department,
        }),
      };
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/Department/${uid}`,
        PostOption
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to update: ${response.status} ${response.statusText}`
        );
      }
      setIsLoading(false);
      alert(data.message);
      navigate("/Department");
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  function handleCancel() {
    setDepartment("");
  }
  return (
    <div className={isOpen?"Grid-box active":"Grid-box"}>
      {isLoading && <Loading />}
      <SideNav />
      <Nav title="Edit Department" />
      <main id="AddEmployee">
        <form onSubmit={(e) => handleUpdateDepartment(e, uid)}>
          <Title label={"Edit Department"} />
          <br />
          <div className="row w-100 container-fluid">
            <div className="col col-12 col-md-12 col-lg-12">
              <label htmlFor="department">
                Department<span>*</span>
              </label>
              <input
                type="text"
                autoFocus
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                id="department"
                placeholder="Enter New Department"
              />
            </div>
            <div className="button-group">
              <button type="button" className="cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="submit">
                Confirm
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UpdateDepartment;
