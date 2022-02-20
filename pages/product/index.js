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
        <div key={key} onClick={()=>{
            onPress()
        }} className={styles.container}>
            <img className={styles.img} alt="Aa" src={res.data().img[0]}/>
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