import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts");
      const data = await response.json();
      setContacts(data.contacts);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    setCurrentContact({});
    setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <div className="app-container">
      <h1>Contact Management</h1>
      <button className="btn btn-primary" onClick={openCreateModal}>Create New Contact</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
