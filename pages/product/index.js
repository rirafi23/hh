import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../../styles/card_product.module.css'

const Card_page = ({data, onPress})=>{
    const [base, setbase] = useState([])
    useEffect(()=>{
        if(data !== null || data != undefined || data != ""){
            base.push(data)
        }
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
                <Image alt="Aa"
                src="/img-cth1.jpg" 
                 width="100%" height="100%" layout="responsive" />
            </div>
            <div className={styles.card}>
                <div>
                <p className={styles.text1}>{base.length !== 0 ? base[0].data().product_name.slice(0,13):null}...</p>
                <p className={styles.text2}>{base.length !== 0 ? convertToRupiah(base[0].data().harga):null}</p>
                </div>
                <p className={styles.text3}>{base.length !== 0 ? base[0].data().terjual.harga:null}terjual</p>
            </div>
        </div>

    )
}
export default Card_page
