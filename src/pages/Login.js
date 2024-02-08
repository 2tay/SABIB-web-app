import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const Login = () => {
    const { auth, login, successLogin } = useAuth();

    const [isPending, setIsPending] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser("");
        setPassword("");
        login(user, password);
    }

    return (
        !isPending && (
            <div className="container mt-5">
                <div className="mb-3">
                    <h2>LOGIN PAGE</h2>
                </div>

                {!auth?.validInfos ? (
                    <div className="alert alert-danger">You entered wrong information</div>
                ) : null}

                {successLogin && (
                    <div className="alert alert-success" role="alert">
                        You Logged Successfully!.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username / Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="user"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                    <Link to="/register" className="ms-2">Click here to Register...</Link>
                </form>
            </div>
        )
    )
}

export default Login;
