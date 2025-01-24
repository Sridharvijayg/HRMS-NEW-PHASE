import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoAddCircleOutline } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../../components/Nav'; // Update path if necessary
import SideNav from '../../components/SideNav'; // Update path if necessary
import ProjectModal from './ProjectModal'; // You must create this component for the modal

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    projectId: '',
    projectName: '',
    client: '',
    startDate: '',
    endDate: '',
    status: '',
  }); // Initialize with default empty values to avoid null access

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`/api/projects/${projectId}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const openModal = (project = null) => {
    // If a project is passed, use it; otherwise, fallback to default
    setEditData(project || {
      projectId: '',
      projectName: '',
      client: '',
      startDate: '',
      endDate: '',
      status: '',
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditData({
      projectId: '',
      projectName: '',
      client: '',
      startDate: '',
      endDate: '',
      status: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData && editData.projectId) {
        await axios.put(`/api/projects/${editData.projectId}`, editData);
      } else {
        await axios.post('/api/projects', editData);
      }
      fetchProjects();
      closeModal();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="Grid-box">
      <Nav />
      <SideNav />
      <main id="Projects">
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Project List</h3>
            <div className="d-flex align-items-center">
              <div className="input-group me-3">
                <span className="input-group-text">
                  <FiSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              <button className="btn btn-primary" onClick={() => openModal()}>
                <IoAddCircleOutline className="me-2" />
                Add New Project
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Project ID</th>
                  <th>Project Name</th>
                  <th>Client</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects
                  .filter((p) => p.projectName?.toLowerCase().includes(search.toLowerCase()))
                  .map((project, index) => (
                    <tr key={project.projectId}>
                      <td>{index + 1}</td>
                      <td>{project.projectId || 'N/A'}</td>
                      <td>{project.projectName || 'Unnamed Project'}</td>
                      <td>{project.client || 'Unknown Client'}</td>
                      <td>{project.startDate || 'Not Set'}</td>
                      <td>{project.endDate || 'Not Set'}</td>
                      <td>{project.status || 'Unknown'}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => openModal(project)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(project.projectId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <ProjectModal
          isOpen={modalOpen}
          onClose={closeModal}
          onChange={handleChange}
          onSubmit={handleSubmit}
          data={editData}
        />
      </main>
    </div>
  );
};

export default Projects;
