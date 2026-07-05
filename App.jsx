import { useEffect, useState } from "react";
import axios from "axios";
import PasswordForm from "./components/PasswordForm";
import PasswordList from "./components/PasswordList";
import "./App.css";

function App() {
  const [passwords, setPasswords] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch Passwords
  const getPasswords = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/passwords");
      setPasswords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // Filter passwords
  const filteredPasswords = passwords.filter((item) =>
    item.website.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>🔐 MERN Password Manager</h1>

      <PasswordForm getPasswords={getPasswords} />

      <input
        type="text"
        placeholder="Search Website..."
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <PasswordList
        passwords={filteredPasswords}
        getPasswords={getPasswords}
      />
    </div>
  );
}

export default App;