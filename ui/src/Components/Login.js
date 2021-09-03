import React, {useState, useContext} from 'react';
import AuthService from '../Services/AuthService.js';
import Message from './Message';
import {AuthContext} from '../Context/AuthContext';
import './Styles.css';

const Login = (props) => {

    const [user, setUser] = useState({username: '', password: ''});
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        e.preventDefault();
        setUser({...user, [e.target.name] : e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            console.log(data);
            const { isAuthenticated, user, message} = data;
            if(isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/todos');
            } else {
                setMessage(message);
            }
        })
    }


    return (
        <div className="container" id="form-cont">
            <h1>Log In Portal</h1>
            <form onSubmit={onSubmit}>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input onChange={onChange} name="username" placeholder="Enter Username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your Username with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={onChange} name="password" placeholder="Enter Password" type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>

            {message ? <Message message={message} /> : null}

        </div>
    )
}

export default Login