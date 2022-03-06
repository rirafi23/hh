import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/keranjang.module.css'
import {BsArrowLeft} from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// database
import firestore from "../../firebase/clientApp";
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs, updateDoc, doc, setDoc, deleteDoc} from "@firebase/firestore";

const PenggunaCollection = collection(firestore,"pengguna");
const PembayaranCollection = collection(firestore,"metode_pembayaran");
const PengirimanCollection = collection(firestore,"metode_pengiriman");

const KeranjangPage = () => {
    const [user_id, setuser_id] = useState("")
    const [sum, setSum] = useState(0)
    const [ongkir, setongkir] = useState(5000)
    const Total = parseInt(sum) + parseInt(ongkir)
    const [keranjangBase, setkeranjangBase] = useState([])
    const router = useRouter()
    const [alamat, setalamat] = useState()
    const [user, setuser] = useState({})
    const [mp_base, setmp_base] = useState([])
    const [idMp, setidMp] = useState()
    const [mp_base1, setmp_base1] = useState([])
    const [idMp1, setidMp1] = useState()
    const [afliasi_key, setafliasi_key] = useState("")
    const [komisi_afliasi, setkomisi_afliasi] = useState(0)
    const [komisi_id, setkomisi_id] = useState(0)
    const [komisi_penjual, setkomisi_penjual] = useState([])

    useEffect(()=>{
        const a = localStorage.getItem("keranjang_base")
        const b = localStorage.getItem("user_pembeli")
        if(a !== null){
            setkeranjangBase(JSON.parse(a))
        }
        if(b !== null){
            setuser_id(b)
            getData(b)
        }
        getMP()
        getCart()
    },[])

    const getCart = () => {
        const a = localStorage.getItem("keranjang_base")
        const idr = []
        const k_afliasi = []
        const k_id = []
        const k_penjual = []
        if(a !== null){
            JSON.parse(a).map(e=>{
                const jum = e.jumlah
                const rp = e.product.harga
                const rp_awal = e.product.harga_awal
                const komisi1 = (rp - rp_awal) * (75/100)
                k_afliasi.push(parseInt(komisi1 * jum))
                k_penjual.push({
                    key_penjual:e.product.product_key,
                    komisi:parseInt(rp_awal * jum)
                })
                k_id.push(parseInt(((rp - rp_awal) - komisi1) * jum))
                idr.push(parseInt(rp * jum))
                // alert(JSON.stringify(e.product.product_key))
            })
            const jml = idr.reduce((a, b) => a + b, 0)
            setSum(parseInt(jml))
            setkomisi_afliasi(parseInt(k_afliasi.reduce((a, b) => a + b, 0)))
            setkomisi_id(parseInt(k_id.reduce((a, b) => a + b, 0)))
            setkomisi_penjual(k_penjual)
        }
    }

    const getData = async (res) => {
        const Query = query(PenggunaCollection);
        const querySnapshot = await getDocs(Query); 
        const a = []
        querySnapshot.forEach((snapshot) => {
            a.push(snapshot) 
        });
        const b = a.filter(e=>e.id === res)
        if(b.length !== 0){
            setafliasi_key(b[0].data().afliasi_key)
            setuser(b[0])
            const c = b[0].data().alamat
            setalamat(c[0] + ", " + c[1] + ", " + c[2] + ","+ ", " + c[3] + ", " + c[4])
        }
    };
    //get metode pembayaran dan pengiriman
    const getMP = async () => {
        const Query = query(PembayaranCollection);
        const Query1 = query(PengirimanCollection);
        const querySnapshot = await getDocs(Query);
        const querySnapshot1 = await getDocs(Query1); 
        const a = []
        const b = []
        querySnapshot1.forEach((snapshot)=>{
            b.push(snapshot)
        })
        querySnapshot.forEach((snapshot) => {
            a.push(snapshot) 
        });
        setmp_base(a)
        setidMp(a[0].id)
        setmp_base1(b)
        setidMp1(b[0].id)
    };

    function convertToRupiah(angka){
        var rupiah = '';		
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp.'+rupiah.split('',rupiah.length-1).reverse().join('')+",-";
    }

    const jml_edit = (res,value) => {
        const a = keranjangBase.filter(a=>a.id_product === res.id_product)
        if(value === 1 && a[0].jumlah <100){
            a[0].jumlah = parseInt(a[0].jumlah) + 1
        }else if(value === 2 && a[0].jumlah >1){
            a[0].jumlah = parseInt(a[0].jumlah) - 1
        }
        setkeranjangBase(a)
        localStorage.setItem("keranjang_base", JSON.stringify(keranjangBase))
        getCart()
    }

    const Buy = async() => {
        const timestamp = Date.now().toString();
        const key = {
            id_pembeli:user_id,
            product:"keranjangBase",
            created_ad:timestamp,
            updated_ad:timestamp,
            pembayaran:{
                meode:idMp,
                time:timestamp,
                total:sum,
                action:false,
                code_unik:"123"
            },
            jasa_kurir:{
                jasa:idMp1,
                ongkir:ongkir,
                action:false
            },
            merchan:komisi_penjual,
            total:Total,
            afliasi:{
                key_afliasi:afliasi_key,
                komisi:komisi_afliasi,
                action:false
            },
            id_komisi:komisi_id
        }
        // create a pointer to our Document
        const _todo = doc(firestore, `pesanan_tbl/${timestamp}`);
        // structure the todo data
        try {
          //add the Document
          await setDoc(_todo, key);
          //show a success message
          alert("Todo added successfully");
        } catch (error) {
          //show an error message
          alert(error);
        }
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
                    <button className={styles.input1}>{alamat}</button>
                </div>
                <div className={styles.boxInput}>
                    <label className={styles.label}>Voucher</label>
                    <input className={styles.input1} type="button"/>
                </div>
                <div className={styles.boxInput}>
                    <label className={styles.label}>Metode Pembayaran</label>
                    <div className={styles.left_row2}>
                    {mp_base.map((a,b)=>{
                        return <button onClick={()=>setidMp(a.id)} style={a.id === idMp ? {border:"solid 2px orange"}:null} key={a.id} className={styles.card_left}>
                            <img src={a.data().img} style={{width:"100%", height:"100%"}}/>
                        </button>
                    })}
                    </div>
                </div>
                <div className={styles.boxInput}>
                    <label className={styles.label}>Metode Pengiriman</label>
                    <div className={styles.left_row2}>
                    {mp_base1.map((a,b)=>{
                        return <button onClick={()=>setidMp1(a.id)} style={a.id === idMp1 ? {border:"solid 2px orange"}:null} key={a.id} className={styles.card_left}>
                            <img src={a.data().img} style={{width:"100%", height:"100%"}}/>
                        </button>
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
                {keranjangBase.map((a,b)=>{
                    return(
                        <div key={b} style={b%2 === 0 ? {backgroundColor:"rgba(0,0,0,0.3)"}:null} className={styles.right_row}>
                            <p style={{margin:"0px auto"}} className={styles.text3_no}>{b+1}</p>
                            <div className={styles.card_product}>
                                <div className={styles.right_img}>
                                    <img src={a.product.img[0]} style={{width:"100%", height:"100%"}}/>
                                </div>
                                <div className={styles.boxProduct}>
                                    <p className={styles.text4}>{a.product.product_name}</p>
                                    <p className={styles.text4} style={{fontSize:"0.9em"}}>{convertToRupiah(a.product.harga)}</p>
                                    <p className={styles.text10_varian}>{a.varian}</p>
                                </div>
                            </div>
                            <p className={styles.text5_varian}>Balado</p>
                            <div className={styles.row2_left}>
                                <button className={styles.btn} onClick={()=>jml_edit(a,2)}>-</button>
                                <p className={styles.text7}>{a.jumlah}</p>
                                <button className={styles.btn} onClick={()=>jml_edit(a,1)}>+</button>
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
                        <button onClick={()=>Buy()} className={styles.btn2}>BUAT PESANAN</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default KeranjangPage