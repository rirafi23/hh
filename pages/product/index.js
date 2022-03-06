import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../../styles/card_product.module.css'

const Card_page = ({data, onPress})=>{
    const [img1, setimg] = useState("")
    const [base, setbase] = useState({
        product_name:"",
        harga:0,
        terjual:""
    })
    useEffect(()=>{
        setbase(data.data())
        setimg(data.data().img[0])
    },[])
    function convertToRupiah(angka){
        var rupiah = '';		
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp.'+rupiah.split('',rupiah.length-1).reverse().join('');
    }
    
    return(
        <div key={"1"} onClick={()=>{
            onPress()
        }} className={styles.container}>
            <div className={styles.img}>
                <img style={{width:"100%", height:"100%"}} src={img1} />
                {/* <Image alt="Aa"
                src={} 
                 width={25} height={30} layout="responsive" /> */}
            </div>
            <div className={styles.card}>
                <div>
                <p className={styles.text1}>{base.product_name.slice(0,30)}...</p>
                <p className={styles.text2}>{convertToRupiah(base.harga)}</p>
                </div>
                <p className={styles.text3}>{base.terjual}terjual</p>
            </div>
        </div>

    )
}
export default Card_page
