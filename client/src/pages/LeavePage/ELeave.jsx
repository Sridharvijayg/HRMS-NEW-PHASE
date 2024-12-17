import React, { useContext, useEffect, useState } from 'react'
import ESideNav from '../../components/ESideNav'
import Nav from '../../components/Nav'
import Loading from '../../components/Loading'
import { LuTrash2 } from "react-icons/lu";
import { MyContext } from '../../context/MyContext'
import { useNavigate } from 'react-router-dom'


const ELeave = () => {

    const [refreshKey, setRefreshKey] = useState(0);
    const [leaves, setLeaves] = useState(null);
    const navigate = useNavigate();
    const {isLoading,setIsLoading,employee,isOpen} = useContext(MyContext);

    const refresh = () => {
      setRefreshKey(refreshKey + 1);
    }

    const handleDelete = async (leaveId) => {
        try {
          const response = await fetch(`http://localhost:5000/api/leaves/${leaveId}`, { 
            method: 'DELETE',
          });
    
          if (response.ok) {
            alert('Leave Request deleted successfully');
            refresh();
          } else {
            alert('Error deleting request');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error deleting request');
        }
      };

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setIsLoading(true);
              const response = await fetch(`http://localhost:5000/api/leaves/${employee.employeeId}?page=1&limit=10`)
            const data = await response.json();
            setLeaves(data.leaves);
            
            }catch(err){
              console.log(err);
              
            }finally{
                setIsLoading(false);
            }
        }
        fetchData();
    },[refreshKey])
  
    
  return (
    <div className={isOpen ? "Grid-box active" : "Grid-box"}>
    {isLoading && <Loading />}
    <ESideNav />
    <Nav title="Attendance" />
    <main id="Employee">
      <div className={isOpen ? "main-header active" : "main-header"}>
        <h3 className="fw-bold">Leave</h3>
        <div className="right-box">
          <button onClick={()=>{navigate('/raise-Leave')}}>
            Raise Leave
          </button>
        </div>
      </div>
      <div className="table-outer">
        <div className="table table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>No. of Days</th>
                            <th>Remaining Days</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                      { leaves && leaves.length > 0?
                        leaves.map((leave) => (
                            <tr key={leave._id}>
                            <td>{leave.employeeId}</td>
                            <td>{leave.name}</td>
                            <td>{leave.fromDate.split('T')[0]}</td>
                            <td>{leave.toDate.split('T')[0]}</td>
                            <td>{leave.noOfDays}</td>
                            <td>{leave.remainingDays}</td>
                            <td><span id="dotiv" className={leave.status == "Approved" ?"approved":leave.status == "Pending"?"pending":"rejected"}>.</span><p className={leave.status == "Approved" ?"approved":leave.status == "Pending"?"pending":"rejected"}>{leave.status}</p></td>
                            <td className="action">
                              <LuTrash2
                                title="Delete"
                                className="action-icon text-danger"
                                onClick={()=>{handleDelete(leave.leaveId)}}
                              /></td>
                            </tr>
                        ))
                        :
                        (
                          <tr>
                            <td colSpan="8" className="text-center no-record">
                              <h3 className="text-center">No Records Found</h3>
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                </table>
            </div>
            </div>
      </main>
    </div>
  )
}

export default ELeave
