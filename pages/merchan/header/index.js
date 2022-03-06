import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/header2.module.css'
import { BsBellFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const HeaderPage = () => {
    return(
        <div className={styles.container}>
            <div className={styles.left}>
                <Image src="/vercel.svg" alt='nana' width={100} height={30}/>
            </div>
            <div className={styles.right}>
                <div className={styles.box_notif}>
                    <BsBellFill/>
                    {/* <div className={styles.absolute}>
                        <p className={styles.text1}>1</p>
                    </div> */}
                </div>
                <BsBellFill/>
            </div>
        </div>
    )
}

export default HeaderPage