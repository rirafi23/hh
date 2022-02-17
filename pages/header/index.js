import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/header.module.css'
import { BsArrowDown, BsArrowUp, BsFillBellFill,BsFillCartFill, BsMenuDown, BsSearch, BsSortDown } from "react-icons/bs";
import { useState } from 'react';
import { useRouter } from 'next/router';

const HeaderPage = () => {
    const [value_DD, setvalue_DD] = useState(false)
    const router = useRouter()
    const Login = (a) => {
        //1 = pembeli
        //2 = merchan
        router.push({
            pathname:"/log_in",
            query:{key:a}
        })
    }
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
                <BsSearch className={styles.icon2}/>
                <BsFillBellFill className={styles.icon1}/>
                <BsFillCartFill className={styles.icon1}/>
                <div className={styles.dropdown}>
                <button onClick={()=>setvalue_DD(!value_DD)} className={styles.button}>Login {value_DD !== true ? <BsArrowDown/> : <BsArrowUp/>}</button>
                {value_DD === true ? <button onClick={()=>Login(1)} className={styles.button}>Pembeli</button> : null}
                {value_DD === true ? <button onClick={()=>Login(2)} className={styles.button}>Merchan</button> : null}
                </div>
            </div>
        </div>
    )
}

export default HeaderPage