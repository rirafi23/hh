import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/keranjang.module.css'
import {BsArrowLeft} from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const KeranjangPage = () => {
    const [sum, setSum] = useState(100000)
    const [ongkir, setongkir] = useState(5000)
    const Total = parseInt(sum) + parseInt(ongkir)
    const router = useRouter()

    function convertToRupiah(angka){
        var rupiah = '';		
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp.'+rupiah.split('',rupiah.length-1).reverse().join('')+",-";
    }

    return(
        <div className={styles.container}>
            <div className={styles.left}>
                <header className={styles.left_header}>
                    <div className={styles.left_row}>
                        <BsArrowLeft onClick={()=>router.back()} className={styles.icon1}/>
                        <p className={styles.text2}>Keranjang Saya</p>
                    </div>
                    <p className={styles.text1}>Dashboard / Keranjang Saya</p>
                </header>
                <div className={styles.boxInput}>
                    <label className={styles.label}>Alamat Saya</label>
                    <input className={styles.input1} type="button"/>
                </div>
                <div className={styles.boxInput}>
                    <label className={styles.label}>Voucher</label>
                    <input className={styles.input1} type="button"/>
                </div>
                <div className={styles.boxInput}>
                    <label className={styles.label}>Metode Pembayaran</label>
                    <div className={styles.left_row2}>
                    {[1,2,3].map((a,b)=>{
                        return <div key={b} className={styles.card_left}></div>
                    })}
                    </div>
                </div>
                <div className={styles.boxInput}>
                    <label className={styles.label}>Metode Pengiriman</label>
                    <div className={styles.left_row2}>
                    {[1,2,3].map((a,b)=>{
                        return <div key={b} className={styles.card_left}></div>
                    })}
                    </div>
                </div>
            </div>

            <div className={styles.box_right}>
            <div className={styles.right}>
                <header className={styles.right_header}>
                    <p className={styles.text3_no}>NO</p>
                    <p className={styles.text3}>Nama Product</p>
                    <p className={styles.text3_varian}>varian</p>
                    <p className={styles.text3}>Jumlah</p>
                </header>
                <div>
                {[1,2,3].map((a,b)=>{
                    return(
                        <div key={b} style={b%2 === 0 ? {backgroundColor:"rgba(0,0,0,0.3)"}:null} className={styles.right_row}>
                            <p style={{margin:"0px auto"}} className={styles.text3_no}>{b+1}</p>
                            <div className={styles.card_product}>
                                <div className={styles.right_img}></div>
                                <div className={styles.boxProduct}>
                                    <p className={styles.text4}>Nama Product</p>
                                    <p className={styles.text4} style={{fontSize:"0.9em"}}>Rp.5000,-</p>
                                    <p className={styles.text10_varian}>Balado</p>
                                </div>
                            </div>
                            <p className={styles.text5_varian}>Balado</p>
                            <div className={styles.row2_left}>
                                <button className={styles.btn} onClick={()=>sum(1)}>-</button>
                                <p className={styles.text7}>1</p>
                                <button className={styles.btn} onClick={()=>sum(2)}>+</button>
                            </div>
                        </div>

                    )
                })}
                </div>
                <div className={styles.footer}>
                    <div className={styles.footer_left}>
                        <div className={styles.footer_row}>
                            <p className={styles.text8}>jumlah</p>
                            <p className={styles.text8}>{convertToRupiah(sum)}</p>
                        </div>
                        <div className={styles.footer_row}>
                            <p className={styles.text8}>Ongkir</p>
                            <p className={styles.text8}>{convertToRupiah(ongkir)}</p>
                        </div>
                        <div className={styles.footer_row}>
                            <p className={styles.text9}>Total</p>
                            <p className={styles.text9}>{convertToRupiah(Total)}</p>
                        </div>
                    </div>
                    <div className={styles.footer_right}>
                        <button className={styles.btn2}>BUAT PESANAN</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default KeranjangPage