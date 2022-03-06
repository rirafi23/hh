import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/profil.module.css'
import { BsArrowDown, BsArrowDownCircleFill, BsArrowDownRight, BsArrowUp, BsChatLeft, BsDoorClosed, BsFillBellFill,BsFillCartFill, BsMenuDown, BsSearch, BsSortDown } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
    const logout = () => {
        localStorage.removeItem("user_pembeli")
        
    }
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.img}></div>
                <p className={styles.text1}>Nama Pengguna</p>
                <p className={styles.text2}>email@gmail.com</p>
            </div>
                <div className={styles.absolute}>
                    <BsChatLeft/>
                </div>
            <div className={styles.main1}>
                {[1,2,3].map((a)=>{
                    return(
                        <div key={a} className={styles.card_main1}></div>
                    )
                })}
            </div>
            <div className={styles.box_main2}>
                <div onClick={()=>alert("ada")} className={styles.main2_row}>
                    Voucher Saya
                    <BsArrowDownCircleFill/>
                </div>
                <div className={styles.main2_row}>
                    Voucher Saya
                    <BsArrowDownCircleFill/>
                </div>
                <div className={styles.main2_row}>
                    Voucher Saya
                    <BsArrowDownCircleFill/>
                </div>
            </div>
            <div className={styles.box_main2}>
                <div className={styles.main2_row}>
                    Model Gelap
                    <BsArrowDownCircleFill/>
                </div>
                <div className={styles.main2_row}>
                    Edit Profil
                    <BsArrowDownCircleFill/>
                </div>
                <div className={styles.main2_row}>
                    About
                    <BsArrowDownCircleFill/>
                </div>
                <div onClick={()=>logout()} className={styles.main2_row}>
                    log out
                    <BsDoorClosed/>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default ProfilePage