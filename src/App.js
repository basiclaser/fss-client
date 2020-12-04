import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const formRef = useRef();

  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:4000")
        .then((res) => res.json())
        .then((res) => setMessages(res));
    }, 10000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      from: formRef.current["from"].value,
      message: formRef.current["message"].value,
    };
    fetch("http://localhost:4000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMessages((prev) => [...prev, res]);
      });
  };
  return (
    <div className="App">
      <form ref={formRef} onSubmit={handleSubmit}>
        <input name="from" type="text" placeholder="from"></input>
        <input name="message" type="text" placeholder="message"></input>
        <input type="submit" />
      </form>
      <ul>
        {messages.map((m) => (
          <li>
            ({m.from}) - {m.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
