import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../../styles/card_product.module.css'

const Card_page = ({res, onPress, key}) => {
    const router = useRouter()
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
                //  src={res.data().img[0]}
                src={"https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2159024400&v=beta&t=CrP5Le1mWICRcaxIGNBuajHcHGFPuyNA5C8DI339lSk"} 
                 width="100%" height="100%" layout="fixed" />
            </div>
            <div className={styles.card}>
                <div>
                <p className={styles.text1}>{res.data().product_name.slice(0,13)}...</p>
                <p className={styles.text2}>{convertToRupiah(res.data().harga)}</p>
                </div>
                <p className={styles.text3}>{res.data().terjual}terjual</p>
            </div>
        </div>
    )
}

export default Card_page