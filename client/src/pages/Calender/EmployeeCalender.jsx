import React, { useContext, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { IoAddCircleOutline } from "react-icons/io5";
import "../../styles/employee.css";
import "../../styles/calender.css";
import Nav from "../../components/Nav";
import Loading from "../../components/Loading";
import ESideNav from "../../components/ESideNav";
import { MyContext } from "../../context/MyContext";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup localizer using moment
const localizer = momentLocalizer(moment);

const EmployeeCalender = () => {
  const { isOpen, isLoading } = useContext(MyContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // Fetch events from the API on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/calendar/events");
      const data = await response.json();
      const fetchedEvents = data.map((event) => ({
        ...event,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Handle selecting an event (edit)
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormValues({
      title: event.title,
      startDate: event.start.toISOString().slice(0, 16), // YYYY-MM-DDTHH:mm
      endDate: event.end.toISOString().slice(0, 16),
      description: event.description,
    });
    setShowModal(true);
  };

  // Handle selecting a slot (add new event)
  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent(null); // Clear any selected event
    setFormValues({
      title: "",
      startDate: start.toISOString().slice(0, 16), // Default to selected start time
      endDate: end.toISOString().slice(0, 16),
      description: "",
    });
    setShowModal(true);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructure form values
    const { title, startDate, endDate, description } = formValues;

    // Ensure startDate and endDate are valid and startDate is before endDate
    const start = new Date(startDate);
    const end = new Date(endDate);

    // if (start >= end) {
    //   alert("End date must be after start date.");
    //   return;
    // }

    const newEvent = {
      title,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      description,
    };

    try {
      // If the event is selected (edit), perform PUT request to update
      if (selectedEvent) {
        const response = await fetch(
          `http://localhost:5000/api/calendar/events/${selectedEvent._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update event");
        }
      } else {
        // Otherwise, create a new event with POST request
        const response = await fetch("http://localhost:5000/api/calendar/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        });
        if (!response.ok) {
          throw new Error("Failed to create event");
        }
      }

      fetchEvents(); // Refresh event list
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error saving event:", error);
      alert("There was an error saving the event. Please try again.");
    }
  };

  // Handle deleting an event
  const handleDelete = async () => {
    if (!selectedEvent) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/calendar/events/${selectedEvent._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      fetchEvents(); // Refresh event list
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className={isOpen?"Grid-box active":"Grid-box"}>
        {isLoading && <Loading />}
            <ESideNav />
            <Nav title="Employee Leave" />
      <main id="Employee">
        <div className={isOpen ? "main-header active" : "main-header"}>
          <h3 className="fw-bold">Calendar</h3>
          <div className="right-box">
            <button onClick={() => setShowModal(true)}><IoAddCircleOutline className="add-icon" /> Add New Event</button>
          </div>
        </div>
        <div className="full-calender">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, width: "100%" }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
          />
        </div>
      </main>

      {/* Modal for adding/updating events */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedEvent ? "Edit Event" : "Add New Event"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Date & Time</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formValues.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date & Time</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formValues.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit">Save Event</button>
                {selectedEvent && (
                  <button type="button" onClick={handleDelete}>
                    Delete Event
                  </button>
                )}
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeCalender;
