import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5001/api/chat", { query: input });
      const botMessage = { sender: "bot", text: response.data.answer };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Error getting response." }]);
    }

    setInput("");
  };

  return (
    <div style={styles.chatContainer}>
      <h2>Hospital Chatbot</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === "user" ? styles.userMsg : styles.botMsg}>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input 
          type="text" 
          placeholder="Ask a question..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          style={styles.input} 
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

// Simple inline styles
const styles = {
  chatContainer: { maxWidth: "400px", margin: "auto", textAlign: "center", padding: "20px", borderRadius: "10px", backgroundColor: "#f9f9f9" },
  chatBox: { height: "300px", overflowY: "auto", padding: "10px", border: "1px solid #ccc", backgroundColor: "white", borderRadius: "8px", marginBottom: "10px" },
  inputContainer: { display: "flex", gap: "10px" },
  input: { flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "white", cursor: "pointer" },
  userMsg: { textAlign: "right", backgroundColor: "#007bff", color: "white", padding: "8px", borderRadius: "10px", marginBottom: "5px" },
  botMsg: { textAlign: "left", backgroundColor: "#ddd", padding: "8px", borderRadius: "10px", marginBottom: "5px" }
};

export default Chatbot;
