import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import md5 from 'md5';
//import { firebase } from 'D:/react_typescript/react-firebase-chat-app/src/firebase.js';
import firebase from '../../firebase';

function RegisterPage() {
    const { register, watch, handleSubmit, formState: { errors } } = useForm(); // useForm({ mode: "onChange" });
    const [errorFromSubmit, setErrorFromSubmit] = useState('');
    const [loding, setloding] = useState(false);

    const password = useRef(); // 특정 DOM 선택
    password.current = watch('password'); // 입력 할 때마다 넣어준다

    //console.log(watch("email"));
    //console.log('password.current', password.current);

    const onSubmit = async (data) => {
        try {
            setloding(true); // 버튼 state 활성화

            const auth = getAuth();
            let createdUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
            //console.log('createdUser', createdUser);
            
            await updateProfile(auth.currentUser, {
                displayName: data.name,
                photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
            })
            // db에 넣기 (테이블 없을시 생성)
            set(ref(getDatabase(), `users/${createdUser.user.uid}`), {
                name: createdUser.user.displayName,
                image: createdUser.user.photoURL
            })

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
                <h3>Register</h3>
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
                
                <label>Name</label>
                <input 
                    name='name' 
                    type='name'
                    {...register('name',{ 
                        required: true, 
                        maxLength: 10
                     })}
                />
                {errors.name && errors.name.type ==="required" && <p>This name field is required</p>}
                {errors.name && errors.name.type ==="maxLength" && <p>Your input exceed maximum length</p>}

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

                <label>Password Confirm</label>
                <input 
                    name='password_confirm'
                    type='password'
                    {...register('password_confirm',{ 
                        required: true, 
                        validate: (value) => // password_confirm에 입력한 값
                            value === password.current // const password 값
                     })}
                />
                {errors.password_confirm && errors.password_confirm.type ==="required" && <p>This password confirm field is required</p>}
                {errors.password_confirm && errors.password_confirm.type ==="validate" && <p>The passwords do not match</p>}

                {errorFromSubmit && 
                    <p>{errorFromSubmit}</p>
                }
                <input type="submit" disabled={loding} />
                <Link style={{color:'gray', textDecoration: 'none' }} to="/login">이미 아이디가 있다면...</Link>
            </form>
        </div>
    )
}

export default RegisterPage