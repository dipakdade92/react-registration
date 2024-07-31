import { useState, useContext } from 'react';
import './Login.css';
import Welcome from '../components/Welcome.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import EmailIcon from '../assets/emailIcon.svg'
import LockIcon from '../assets/lockIcon.svg'
import ViewIcon from '../assets/viewIcon.svg'
import FacebookIcon from '../assets/facebookIcon.svg'
import GoogleIcon from '../assets/googleIcon.svg'
import LogoBlue from '../assets/logoBlue.png'
import { handleLogin } from '../services/authService.js';
import MyContext from '../context/context.js';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [inputType, setInputType] = useState('password');
    const { setIsLogin } = useContext(MyContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const toggleInputType = () => {
        if (inputType === 'password') {
            setInputType('text');
        } else {
            setInputType('password');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = { email: '', password: '' };
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.trim().length < 6) {
            errors.password = 'Password must be at least 6 characters long!';
        }
        if (errors.email !== '' || errors.password !== '') {
            setErrors(errors);
            return;
        }
        const result = await handleLogin({ username: formData.email, password: formData.password });

        if (result.status === 'success') {
            toast.success('Login successful!');
            setFormData({ email: '', password: '' });
            setErrors({ email: '', password: '' });
            localStorage.setItem('token', result.token);
            setIsLogin(true);
            return;
        }
    }
    return (
        <div className='main-container'>
            <div className="login-container">
                <Welcome />
                <div className="login-form">
                    <div className='comm-wrapper'>
                        <div className='resp-welcome-header'>
                            <img src={LogoBlue} alt='Logo' />
                        </div>
                        <h2>Log In</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <img src={EmailIcon} alt='Email' />
                                <input className='input' type='text' placeholder="Email" name="email" onChange={handleChange} value={formData.email} required />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>
                            <div className="input-group">
                                <img src={LockIcon} alt='Lock' />
                                <input className='input' type={inputType} placeholder="Password" name='password' onChange={handleChange} value={formData.password} required />
                                {errors.password && <p className="error">{errors.password}</p>}
                                <img src={ViewIcon} alt='View' className='view-icon' onClick={toggleInputType} />
                            </div>
                            <div className="forgot-password">
                                <a href="#">Forgot password?</a>
                            </div>
                            <button type="submit" className="login-button">Log In</button>
                        </form>
                        <div className="or-text">
                            <p>Or</p>
                        </div>
                        <div className="social-login">
                            <button className="google-login">
                                <img src={GoogleIcon} alt='Google' />
                                Google
                            </button>
                            <button className="facebook-login">
                                <img src={FacebookIcon} alt='Facebook' />
                                Facebook
                            </button>
                        </div>
                        <div className="register">
                            <p>Have no account yet?</p>
                            <div>
                                <Link to='/signup'>Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
