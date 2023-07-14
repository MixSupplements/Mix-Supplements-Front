import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../../APIs/config';
import logo from './../../../assets/images/logo.png';
import "./AdminLogin.css"
import { AdminAuthContext } from '../../../context/AdminAuth';

export default function AdminLogin() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [stayLoggedIn, setStayLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();
    const { updateToken, adminToken } = useContext(AdminAuthContext);
    console.log(adminToken);

    const handleLogin = () => {

        if (username === '' || password === '')
        {
            setLoginError(true);
            setErrorMessage('Username and password are required');
            return;
        }

        const loginData = {
            username: username,
            password: password,
            stayLoggedIn: stayLoggedIn
        };

        axiosInstance
            .post('/admin/login', loginData)
            .then((response) => {
                // Handle successful login
                localStorage.setItem("adminToken", response.data.token);
                updateToken(response.data.token);
                navigate('/admin/dashboard');
            })
            .catch((responseObj) => {
                // Handle login error
                setLoginError(true);
                setErrorMessage('Invalid username or password');
            });
    }

    return (
        <div className="admin-login container py-5 ">
            <div className='col-sm-10 col-md-6 col-lg-4 mx-auto'>
                <img src={logo} alt="" style={{ width: '100%' }} />
            </div>
            <Form className='col-sm-10 col-md-6 col-lg-4  mx-auto'>
                <Form.Group controlId="formUsername" className='mt-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        className={'border-3 ' + (loginError ? 'border-danger text-danger ' : '')}
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => { setLoginError(false); setUsername(e.target.value); }}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className='mt-3'>
                    <Form.Label>Password</Form.Label>
                    <div>
                        <Form.Control
                            className={'border-3 ' + (loginError ? 'border-danger text-danger ' : '')}
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => { setLoginError(false); setPassword(e.target.value) }}
                        />

                    </div>
                </Form.Group>

                <Form.Group controlId="formStayLoggedIn" className='mt-3'>
                    <Form.Check
                        type="checkbox"
                        label="Stay logged in"
                        checked={stayLoggedIn}
                        onChange={(e) => setStayLoggedIn(e.target.checked)}
                    />
                </Form.Group>

                <div className="text-center mt-4">
                    <Button variant="warning" onClick={handleLogin}>
                        Login
                    </Button>
                    {loginError && <div className="alert alert-danger mt-3 p-1" role="alert">
                        {errorMessage}
                    </div>}

                </div>
            </Form>
        </div>
    );
};
