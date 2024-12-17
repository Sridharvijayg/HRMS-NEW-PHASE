import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../../context/MyContext';
import SideNav from '../../components/SideNav';
import Nav from '../../components/Nav';
import Loading from '../../components/Loading';
import Title from '../../components/Employee/AddEmployee/Title';

const LeaveStatus = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');
  const { leaveId } = useParams();
  const { isLoading, setIsLoading ,isOpen} = useContext(MyContext);
  const [data, setData] = useState({
    name: '',
    employeeId: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/leaves/leave/${leaveId}`);
        const leaveData = await response.json();
        setData(leaveData);
        setStatus(leaveData.status);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [leaveId, setIsLoading]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/change-leave-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leaveId, status, comment }),
      });
      if (response.ok) {
        alert('Leave status updated successfully');
        navigate('/leave')
      } else {
        alert('Failed to update leave status');
      }
    } catch (error) {
      console.log('Error updating leave status:', error);
    }
  };

  return (
    <div className={isOpen?"Grid-box active":"Grid-box"}>
      {isLoading && <Loading />}
      <SideNav />
      <Nav title="Update Status" />
      <main id='AddEmployee'>
        <form onSubmit={handleUpdate}>
          <Title label={"Update Status"} />
          <br />
          <label htmlFor="">EmployeeID :</label>
          <input type="text" value={data.employeeId} readOnly className="dep-text" />
          <label htmlFor="">Name :</label>
          <input type="text" value={data.name} readOnly className="dep-text" />
          <label htmlFor="status">Status :</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="dep-text"
            required
          >
            <option value="">Select Status</option>
            <option value="Approved">Approved</option>
            <option value="Disapproved">Disapproved</option>
            <option value="Pending">Pending</option>
          </select>
          <label htmlFor="">Comment :</label>
          <input
            type="text"
            placeholder="Comment here..."
            className="dep-text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="button-group">
              <button type="submit" className="submit">
                Update
              </button>
            </div>
        </form>
      </main>
    </div>
  );
};

export default LeaveStatus;
