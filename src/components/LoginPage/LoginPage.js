import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from '../../firebase';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm(); // useForm({ mode: "onChange" });
    const [errorFromSubmit, setErrorFromSubmit] = useState('');
    const [loding, setloding] = useState(false);

    console.log('LoginPage.js');

    const onSubmit = async (data) => {
        console.log('login user - LoginPage.js', data.email);
        try {
            setloding(true); // 버튼 state 활성화

            const auth = getAuth();
            signInWithEmailAndPassword(auth, data.email, data.password);

            setloding(false); // 버튼 state 비활성화
        } catch (error) {
            setErrorFromSubmit(error.message);
            setloding(false);
            setTimeout(() => {
                setErrorFromSubmit('');
            }, 5000);
        }
    }

    return (
        <div className='auth-wrapper'>
            <div style={{textAlign: 'center'}}>
                <h3>Login</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input 
                    name='email'
                    type='email'
                    {...register('email',{ 
                        required: true, 
                        pattern: /^\S+@\S+$/i
                     })}
                />
                {errors.email && <p>This email field is required</p>}
                
                <label>Password</label>
                <input 
                    name='password'
                    type='password'
                    {...register('password',{ 
                        required: true, 
                        minLength: 6
                     })}
                />
                {errors.password && errors.password.type ==="required" && <p>This password field is required</p>}
                {errors.password && errors.password.type ==="minLength" && <p>Password must have at least 6 characters</p>}

                {errorFromSubmit && 
                    <p>{errorFromSubmit}</p>
                }
                <input type="submit" disabled={loding} />
                <Link style={{color:'gray', textDecoration: 'none' }} to="/register">아직 아이디가 없다면...</Link>
            </form>
        </div>
    )
}

export default LoginPage