import React from "react";
import "./ContactList.css"; // Import list styles

const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, { method: "DELETE" });
        if (response.ok) {
          updateCallback();
        } else {
          console.error("Failed to delete contact.");
        }
      } catch (error) {
        alert("Failed to delete contact.");
      }
    }
  };

  return (
    <div className="contact-list">
      <h2>Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => updateContact(contact)}>Update</button>
                <button className="btn btn-danger" onClick={() => onDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
