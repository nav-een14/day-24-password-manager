import { useState } from "react";
import axios from "axios";

function PasswordForm({ getPasswords }) {
  const [website, setWebsite] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addPassword = async (e) => {
    e.preventDefault();

    if (!website || !url || !username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/passwords", {
        website,
        url,
        username,
        password,
      });

      setWebsite("");
      setUrl("");
      setUsername("");
      setPassword("");

      getPasswords();

      alert("Password Saved Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to save password");
    }
  };

  return (
    <form className="form" onSubmit={addPassword}>
      <h2>Add Password</h2>

      <input
        type="text"
        placeholder="Website Name"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />

      <input
        type="url"
        placeholder="Website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        type="text"
        placeholder="Username / Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">
        Save Password
      </button>
    </form>
  );
}

export default PasswordForm;