import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/header.module.css'
import { BsArrowDown, BsArrowUp, BsFillBellFill,BsFillCartFill, BsMenuDown, BsSearch, BsSortDown } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const HeaderPage = ({req}) => {
    const [value_DD, setvalue_DD] = useState(false)
    const [local_user, setlocal_user] = useState([])
    const [cart, setcart] = useState(0)
    const [notif, setNotif] = useState()
    const router = useRouter()
    
    useEffect(()=>{
        const value = localStorage.getItem("user_pembeli")
        if(value !== null){
            setlocal_user(value)
        }
        getData()
    },[])

    const getData = () => {
        const base = localStorage.getItem("keranjang_base")
        if(base !== null){
            // alert(base)
            setcart(JSON.parse(base).length)
        }
        // setTimeout(() => {
        //     getData()
        // },1000);
    }
    
    const Login = (a) => {
        //1 = pembeli
        //2 = merchan
        router.push({
            pathname:"/log_in",
            query:{key:a}
        })
    }
    const render_input = () => {
        if(req === "show"){
            return null
        }else{
            return(
                <div  className={styles.boxSearch}>
                    <input className={styles.search}/>
                    <BsSearch className={styles.icon}/>
                </div>
            )
        }
    }

    const CartPage = (icon_name) =>{
        return(
            <div className={styles.boxIcon}>
                <div style={cart === 0 ? {display:"none"}:null} className={styles.IconAbsolut}>
                    <p className={styles.textIcon}>{cart}</p>
                </div>
                {icon_name === "cart" ? <BsFillCartFill className={styles.icon1}/> : <BsFillBellFill className={styles.icon1}/>}
            </div>
        )
    }
    const NotifPage = (icon_name) =>{
        return(
            <div className={styles.boxIcon}>
                <div style={0 === 0 ? {display:"none"}:null} className={styles.IconAbsolut}>
                    <p className={styles.textIcon}>{0}</p>
                </div>
                <BsFillBellFill className={styles.icon1}/>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Image src="/vercel.svg" alt='nana' width={100} height={30}/>
            </div>
            {local_user.length !== 0 ? (
                <div className={styles.right2}>
                    {render_input()}
                    <BsSearch className={styles.icon2}/>
                    {NotifPage("notif")}
                    {CartPage("cart")}
                    <div className={styles.card_pp}>
                    <Image src="/user.png" alt='nana' width={15} height={30} />
                    <p className={styles.text}>Username</p>
                    <BsArrowDown/>
                    </div>  
                    <div  className={styles.img_hiden}>
                    <Image alt='yyyy' src={'/user.png'} layout="responsive" width={15} height={15}/>
                    </div>
                </div>
            ):(
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
            )}
        </div>
    )}

export default HeaderPage