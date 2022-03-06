import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/profile2.module.css'
import { BsAlarm } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.img}>
                    <Image alt='at' src={"/user.png"} layout="responsive" width={3} height={2.5} />
                </div>
                <div className={styles.right}>
                    <p className={styles.text1}>Nama Pengguna</p>
                    <p className={styles.text2}>Email@gmail.com</p>
                </div>
            </header>
                <div style={{width:"100%"}}>
                    <div className={styles.box_li}>
                        <p className={styles.li}>mode malam</p>
                        <BsAlarm/>
                    </div>
                    <div className={styles.box_li}>
                        <p className={styles.li}>Edit Profil</p>
                        <BsAlarm/>
                    </div>
                    <div className={styles.box_li}>
                        <p className={styles.li}>Ubah Password</p>
                        <BsAlarm/>
                    </div>
                    <div className={styles.box_li}>
                        <p className={styles.li}>Log out</p>
                        <BsAlarm/>
                    </div>
                </div>
        </div>
    )
}

export default ProfilePage