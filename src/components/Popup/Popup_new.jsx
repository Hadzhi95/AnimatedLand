import React, { useState, useEffect, useRef } from 'react'
import styles from './Popup.scss'
import 'react-phone-number-input/style.css';

import InputMask from 'react-input-mask'
import { useNavigate } from 'react-router-dom';

function Popup({ active, setIsPopup, y }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef(null);

    const [phoneNumber, setPhoneNumber] = useState('+91');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [checkbox, setCheckbox] = useState(false)


    function hundleCheckBox() {
        setCheckbox(true)
    }

    const handleFormSubmit = (e) => {
        if (phoneNumber.length > 10 && name.length > 2 && email.includes('@') && checkbox) {
            e.preventDefault();
            setShowModal(true);
        }
        else {
            e.preventDefault();
        }

    }

    const closeModal = () => {
        setIsPopup(prev => !prev);
    }

    useEffect(() => {
        const checkIfClickOutside = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setIsPopup(false);
            }
        }
        console.log("y", y);
        document.addEventListener('click', checkIfClickOutside)
        return () => {
            document.removeEventListener('click', checkIfClickOutside)
        }
    }, [])

    return (
        <>
            {
            // active &&
                showModal ?
                (
                    <div className={styles.overlay} style={y === 0 ? { top: `${y}mm !important`, transform: `translate(0%, 0%)` } : { top: `${y}mm !important`, transform: `translate(0%, 0%)` }}>
                        <div className={styles.success_modal} >
                            <h1 className={styles.success_title}>That's one small step for a man,</h1>
                            <h1 className={styles.success_title}>one giant step for your career!</h1>
                            <h1 className={styles.success_message}>Our career coaching team</h1>
                            <h1 className={styles.success_message}>will call you back shortly</h1>

                        </div> 
                    </div>
                ) :
                (<div className={styles.overlay} style={y === 0 ? { top: `${y}mm !important`, transform: `translate(0%, 0%)` } : { top: `${y}mm !important`, transform: `translate(0%, 0%)` }}>
                    <div className={styles.registration_form} ref={inputRef}>
                        <h1 className={styles.title}>Register for a career consultation</h1>
                        <form className={styles.inputs} onSubmit={handleFormSubmit}>
                            <div className={styles.first_inputs}>
                                <label>
                                    <InputMask mask="+\9\1 99 9999 9999" maskChar="" className={styles.tel} countries={['IN']} placeholder="+XX (XXX) XXX-XX-XX" type="tel" value={phoneNumber}
                                        onChange={e => setPhoneNumber(e.target.value)} />
                                    <span className={styles.icon_search}></span>
                                </label>
                                <input type="text" className={styles.name} placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className={styles.second_inputs}>
                                <input type="email" className={styles.email} placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                                <input type='submit' className={styles.btn} value="Submit" />
                            </div>
                            <div className={styles.check}>
                                <input className={styles.checkbox} onClick={hundleCheckBox} type="checkbox" />
                                <span className={styles.checkbox__text}>By clicking the checkbox you agree to our <a className={styles.link} onClick={() => navigate('/privacy')} >privacy policy</a> and <a className={styles.link} onClick={() => navigate('/agreement')}>training agreement</a>.</span>
                            </div>
                        </form>
                    </div>
                </div>)

            }

        </>

    )
}

export default Popup