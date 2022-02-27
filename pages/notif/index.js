import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/notif.module.css'
import { BsChatLeftDots } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PageNotif = () => {
    return(
        <div className={styles.container}>
            <header className={styles.header}>
                Notification
                <BsChatLeftDots/>
            </header>
            <main className={styles.main}>
                {[1,2,3].map(a=>{
                    return(
                        <div className={styles.card}>
                            <p className={styles.text1}>Nama Notif</p>
                            <p className={styles.text2}>Description notif</p>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}

export default PageNotif