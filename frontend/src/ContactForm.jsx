import { useState, useEffect } from "react";
import "./ContactForm.css"; // Import form styles

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFirstName(existingContact.firstName || "");
    setLastName(existingContact.lastName || "");
    setEmail(existingContact.email || "");
  }, [existingContact]);

  const updating = Boolean(existingContact.id);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!firstName || !lastName || !email) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const data = { firstName, lastName, email };
    const url = `http://127.0.0.1:5000/${updating ? `update_contact/${existingContact.id}` : "create_contact"}`;
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save contact.");
      } else {
        updateCallback();
      }
    } catch (error) {
      setError("Failed to save contact.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <h2>{updating ? "Update Contact" : "Create Contact"}</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Saving..." : updating ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default ContactForm;
