import { useState } from "react";
import axios from "axios";

function PasswordList({ passwords, getPasswords }) {
  const [showPassword, setShowPassword] = useState({});

  const deletePassword = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/passwords/${id}`);
      getPasswords();
      alert("Password Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied Successfully");
  };

  const togglePassword = (id) => {
    setShowPassword({
      ...showPassword,
      [id]: !showPassword[id],
    });
  };

  return (
    <div>
      <h2>Saved Passwords</h2>

      {passwords.length === 0 ? (
        <p>No Passwords Saved</p>
      ) : (
        passwords.map((item) => (
          <div className="card" key={item._id}>
            <h3>{item.website}</h3>

            <p>
              <strong>Website:</strong>{" "}
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                {item.url}
              </a>
            </p>

            <p>
              <strong>Username:</strong> {item.username}
            </p>

            <p>
              <strong>Password:</strong>{" "}
              {showPassword[item._id]
                ? item.password
                : "••••••••"}
            </p>

            <div className="buttons">
              <button
                onClick={() => togglePassword(item._id)}
              >
                {showPassword[item._id]
                  ? "Hide"
                  : "Show"}
              </button>

              <button
                onClick={() =>
                  copyText(item.username)
                }
              >
                Copy Username
              </button>

              <button
                onClick={() =>
                  copyText(item.password)
                }
              >
                Copy Password
              </button>

              <button
                onClick={() =>
                  deletePassword(item._id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PasswordList;