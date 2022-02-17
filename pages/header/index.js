import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/header.module.css'
import { BsFillBellFill,BsFillCartFill, BsSearch } from "react-icons/bs";

const HeaderPage = () => {
    return(
        <div className={styles.container}>
            <div className={styles.left}>
                <img src="/vercel.svg" className={styles.img}/>
            </div>
            <div className={styles.right}>
                <div className={styles.boxSearch}>
                    <input className={styles.search}/>
                    <BsSearch className={styles.icon}/>
                </div>
                <BsFillBellFill className={styles.icon1}/>
                <BsFillCartFill className={styles.icon1}/>
                <button className={styles.button}>Sign In</button>
            </div>
        </div>
    )
}

export default HeaderPage