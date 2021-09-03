import React, {useState, useEffect, useRef} from 'react';
import AuthService from '../Services/AuthService.js';
import Message from './Message';
import './Styles.css';


const Register = (props) => {


    const [user, setUser] = useState({username: '', password: '', role: ''});
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e => {
        setUser({...user, [e.target.name] : e.target.value});
    }

    const resetForm = () => {
        setUser({username: "", password: "", role: ""})
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const {message} = data;
            setMessage(message);
            resetForm();
            if(!message.msgError) {
                timerID = setTimeout(() => {
                    props.history.push('/login')
                },2000)
            }
        })
    }


    return (
        <div className="container" id="form-cont">
            <h1>Register Portal</h1>
            <form onSubmit={onSubmit}>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input onChange={onChange} name="username" value={user.username} placeholder="Enter Username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your Username with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input onChange={onChange} name="role" value={user.role} placeholder="Enter Role (admin/user)" type="text" className="form-control" id="exampleInputEmail1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={onChange} name="password" value={user.password} placeholder="Enter Password" type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>

                {message ? <Message message={message} /> : null}

        </div>
    )
}

export default Register
