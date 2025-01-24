

import React, { useContext, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { IoAddCircleOutline } from "react-icons/io5";
import "../../styles/employee.css";
import "../../styles/calender.css";
import Nav from "../../components/Nav";
import Loading from "../../components/Loading";
import SideNav from "../../components/SideNav";
import Department from "../Department/Department"; 
import { MyContext } from "../../context/MyContext";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link } from "react-router-dom";
import Holiday from "../Holiday/Holiday";

// Setup localizer using moment
const localizer = momentLocalizer(moment);

const CalenderAndHolidayPage = () => {
  const { isOpen, isLoading } = useContext(MyContext);
  const [activeView, setActiveView] = useState("calendar"); 

  // Event state and other Calendar logic (as before)
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
  });

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
      startDate: event.start.toISOString().slice(0, 16),
      endDate: event.end.toISOString().slice(0, 16),
      description: event.description,
    });
    setShowModal(true);
  };

  // Handle selecting a slot (add new event)
  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent(null);
    setFormValues({
      title: "",
      startDate: start.toISOString().slice(0, 16),
      endDate: end.toISOString().slice(0, 16),
      description: "",
    });
    setShowModal(true);
  };

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, startDate, endDate, description } = formValues;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const newEvent = {
      title,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      description,
    };

    try {
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
        if (!response.ok) throw new Error("Failed to update event");
      } else {
        const response = await fetch("http://localhost:5000/api/calendar/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        });
        if (!response.ok) throw new Error("Failed to create event");
      }
      fetchEvents();
      setShowModal(false);
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
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete event");
      fetchEvents();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className={isOpen ? "Grid-box active" : "Grid-box"}>
      {isLoading && <Loading />}
      <Nav />
      <SideNav />
      <main id="Employee">
        <div className={isOpen ? "main-header active" : "main-header"}>
          {/* <h3 className="fw-bold">Calendar and Holiday</h3> */}
          <div className="right-box">
            <button onClick={() => setActiveView("calendar")}>Calendar</button>
            <button onClick={() => setActiveView("holiday")}>Holiday</button>
          </div>
        </div>

        <div className="content">
          {activeView === "calendar" && (
            <div className="full-calender">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "500px", width: "100%" ,border:"5px solid black",padding:"20px"}}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
              />
            </div>
          )}
          {activeView === "holiday" && <Holiday />}{" "}
          {/* Render Holiday (Department) component */}
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
                  onChange={(e) =>
                    setFormValues({ ...formValues, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Date & Time</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formValues.startDate}
                  onChange={(e) =>
                    setFormValues({ ...formValues, startDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date & Time</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formValues.endDate}
                  onChange={(e) =>
                    setFormValues({ ...formValues, endDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formValues.description}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      description: e.target.value,
                    })
                  }
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

export default CalenderAndHolidayPage;
