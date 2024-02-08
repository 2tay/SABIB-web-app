import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TodoList from './Home';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPass: ''
  })
  const [logged, setLogged] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [incorrected, setIncorrected] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);

  useEffect(() => {
    const inputElements = document.querySelectorAll('input');
    inputElements.forEach((input) => {
      input.setAttribute('autoComplete', 'off');
    });

    const connected = JSON.parse(localStorage.getItem('user'));
    if (connected) {
      setLogged(true);
    }
    setIsPending(false);
  }, []);

  if (logged) {
    return <TodoList />;
  }

  const handleRegister = async(e) => {
    e.preventDefault();

    if (formData.password === formData.confirmPass) {
      try {
        const response = await axios.post("http://localhost:8000/users", formData);
        console.log("Response data: ", response.data);
      } catch(err) {
        console.error("Error: ", err);
      }

      setSuccessRegister(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } 
    else {
      setIncorrected(true);
      setTimeout(() => {
        setIncorrected(false);
      }, 3000);
      
    }
  };

  return (
    !isPending && (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>Register Page</h2>

            {incorrected && (
              <div className="alert alert-danger" role="alert">
                The passwords do not match!.
              </div>
            )}

            {successRegister && (
              <div className="alert alert-success" role="alert">
                You registered Successfully!.
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="userName"
                  value={formData.userName}
                  onChange={(e) => setFormData({...formData, userName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  required
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  required
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  required
                  type="password"
                  className="form-control"
                  name="confirmPass"
                  value={formData.confirmPass}
                  onChange={(e) => setFormData({...formData, confirmPass: e.target.value})}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <Link to="/" className="ml-2">
                Click here to Login...
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Register;
