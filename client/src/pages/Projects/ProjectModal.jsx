import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProjectModal = ({ isOpen, onClose, onChange, onSubmit, data }) => {
  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data?.projectId ? 'Edit Project' : 'Add New Project'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="projectName"
              value={data?.projectName || ''}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Client</Form.Label>
            <Form.Control
              type="text"
              name="client"
              value={data?.client || ''}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={data?.startDate || ''}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={data?.endDate || ''}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={data?.status || ''}
              onChange={onChange}
            >
              <option value="">Select Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProjectModal;
