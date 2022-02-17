import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/card_product.module.css'

const Card_page = ({res}) => {
    function convertToRupiah(angka){
        var rupiah = '';		
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }
    return(
        <div className={styles.container}>
            <img style={{width:"100%", height:"100%"}} src={res.data().img[0]}/>
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