import React, { useState } from "react";
import "./Profile.css"; // Profile styles
import "./style.css"; // Chatbot styles

const ProfileAndChatbot = () => {
  // User information for the profile
  const user = {
    name: "Aarav Singh",
    alumni: "SRMIST (CSE)",
    rating: 1023,
    work: ["Infosys (2016-2022)", "TCS (2022-Current)"],
    contact: ["7825762889", "9625684922"],
    links: {
      linkedin: "https://www.linkedin.com/in/aarav-singh",
      github: "https://github.com/aaravsingh",
      portfolio: "https://aaravsingh.com",
    },
  };

  // Chatbot state
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [chatVisible, setChatVisible] = useState(false); // To toggle chatbot visibility

  // Handle sending the chat message
  const handleSend = async () => {
    if (!userInput) {
      setResponses((prev) => [
        ...prev,
        { type: "error", text: "Please enter a question." },
      ]);
      return;
    }

    // Add user input to the responses list
    setResponses((prev) => [...prev, { type: "user", text: userInput }]);

    try {
      const response = await fetch("/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await response.json();

      // Add the AI's response to the responses list
      setResponses((prev) => [...prev, { type: "ai", text: data.response }]);
    } catch (error) {
      setResponses((prev) => [
        ...prev,
        { type: "error", text: "Error fetching response." },
      ]);
      console.error("Error fetching AI response:", error);
    }

    // Clear user input
    setUserInput("");
  };

  return (
    <div className="profile-and-chat-container">
      {/* Profile Section */}
      <div className="user-card">
        <div className="user-header">
          <div className="user-image">
            <img src="https://via.placeholder.com/150" alt="User" />
          </div>
          <div className="user-info-header">
            <h2>{user.name}</h2>
            <p>ALUMNI: {user.alumni}</p>
          </div>
        </div>
        <div className="user-info">
          <p>NUMBER OF CONNECTIONS: {user.rating}</p>
          <h3>WORK</h3>
          <ul>
            {user.work.map((job, index) => (
              <li key={index}>{job}</li>
            ))}
          </ul>

          <h3>LINKS</h3>
          <ul className="links-list">
            <li>
              <a
                href={user.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={user.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={user.links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
            </li>
          </ul>

          <h3>CONTACT</h3>
          <ul>
            {user.contact.map((contact, index) => (
              <li key={index}>{contact}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating Chat Icon */}
      <div className="chat-icon" onClick={() => setChatVisible(!chatVisible)}>
        <img src="https://via.placeholder.com/50" alt="Chat Icon" />
      </div>

      {/* Chatbot Popup, visible only when `chatVisible` is true */}
      {chatVisible && (
        <div className="chat-popup">
          <div className="chat-box">
            <h1>AI Chatbot</h1>
            <div id="response-container" className="response-container">
              {responses.map((res, index) => (
                <p key={index} className={res.type === "error" ? "error" : ""}>
                  <strong>
                    {res.type === "user"
                      ? "You"
                      : res.type === "ai"
                      ? "AI Response"
                      : "Error"}
                    :
                  </strong>{" "}
                  {res.text}
                </p>
              ))}
            </div>
            <div id="chat-box">
              <textarea
                id="user-input"
                placeholder="Ask a question..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              ></textarea>
              <button id="send-btn" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAndChatbot;
