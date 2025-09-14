import React, { useState } from "react";
import "./LoginSignup.css";

import bgImage from "../Assets/login-banner.jpeg"; // optional
const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);    //IF TRUE SHOW LOGIN IF FALSE SHOW SIGN UP
  const [formData, setFormData] = useState({   // STORE WHAT USER TYPES
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    

  const url = isLogin ? "http://127.0.0.1:5000/api/login" : "http://127.0.0.1:5000/api/signup";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(data => setMessage(isLogin ? "✅ Login successful!" : "🎉 Signup successful!"))
    .catch(() => setMessage("❌ Something went wrong"))
    .finally(() => setLoading(false));


  if(isLogin){
    fetch("http://127.0.0.1:5000/api/Login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(formData),

    })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(data => setMessage("✅ Login successful!"))
    .catch(() => setMessage("❌ Login failed"));
  }
  else{
    fetch("http://127.0.0.1:5000/api/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(formData),

    })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(data => setMessage("✅ Sign up successful !"))
    .catch(()=> setMessage("❌ Signup failed"));
  }
    
  };

  return (
    <div
      className="login-signup-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-signup-card">
        <h2>{isLogin ? "Login" : "Signup"}</h2>  
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit" disabled={loading}>
  {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
</button>

        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Signup" : " Login"}
          </span>
        </p>
        {message && <p className="status-message">{message}</p>}

      </div>
    </div>
  );
};

export default LoginSignup;