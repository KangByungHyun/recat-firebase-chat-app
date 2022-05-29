import React, { useRef } from 'react'
import { IoIosChatboxes } from 'react-icons/io'
import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'react-bootstrap/Image'
import { useSelector } from 'react-redux'
import firebase from '../../../firebase';
import { getAuth, signOut } from "firebase/auth";

function UserPanel() {
    const user = useSelector(state => state.user.currentUser);
    const inputOpenImageRef = useRef();

    const handleLogout = () =>{
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log('로그아웃 성공');
        }).catch((error) => {
            console.log('로그아웃 실패');
        });
    }
    const handelOpenImageRef = () =>{
        console.log('handelOpenImageRef() - UserPanel.js');
        inputOpenImageRef.current.click();
    }

    return (
        <div>
            <h3 style={{ color: 'white' }}>
                <IoIosChatboxes />{" "} Chat App
            </h3>
            <div style={{ display:'flex', marginBottom: '1rem'}}>
                <Image src={user && user.photoURL}
                        style={{ width: '30p', height: '30px', marginTop: '3px' }}
                        roundedCircle />
                
                <Dropdown>
                    <Dropdown.Toggle 
                        style={{ background: 'transparent', boder: '0px' }}
                        id="dropdown-basic">
                        {user && user.displayName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handelOpenImageRef}>
                            프로필 사진 변경
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                            로그아웃
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <input 
                accept='image/jpeg, image/png'
                style={{ display: 'none'}}
                ref={ inputOpenImageRef }
                type='file' />
        </div>
    )
}

export default UserPanel