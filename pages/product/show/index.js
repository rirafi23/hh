import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/show.module.css'
import { BsArrowDown, BsArrowLeft, BsArrowUp, BsFillBellFill,BsFillCartFill, BsMenuDown, BsSearch, BsSkipStart, BsSortDown } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HeaderPage from '../../header';

// database
import firestore from "../../../firebase/clientApp";
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs, updateDoc, doc, deleteDoc} from "@firebase/firestore";

const ProductCollection = collection(firestore,"product_table");


export default function ShowProduct () {
    const [show_img, setshow_img] = useState(0)
    const [base_img, setbase_img] = useState([]) 
    const [true_varian, settrue_varian] = useState(0)
    const [value_sum, setvalue_sum] = useState(1)
    const [base, setbase] = useState({})
    const [base_varian, setbase_varian] = useState([])
    const [base_keranjang, setbase_keranjang] = useState([])
    const router = useRouter()
    const [ref_id, setref_id] = useState("") 
    
    
    // useEffect(()=>{
    //     const cart = localStorage.getItem("keranjang_base")
    //     if(cart !== null){
    //         setbase_keranjang(JSON.parse(cart))
    //     }
    //     const getData = async () => {
    //         const user_id = router.query.ref_id
    //         const Query = query(ProductCollection);
    //         const querySnapshot = await getDocs(Query); 
    //         const a = []
    //         querySnapshot.forEach((snapshot) => {
    //             a.push(snapshot) 
    //        });
    //        const b = a.filter((a)=>a.id ===user_id )
    //     //    alert(b)
    //        if(b.length !== 0){ 
    //         setbase(b[0].data())
    //         setbase_varian(b[0].data().varian)
    //         settrue_varian(b[0].data().varian[0])
    //         setbase_img(b[0].data().img)
    //     }
    //     };
    //     getData()
    //     //eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])

    function convertToRupiah(angka){
        var rupiah = '';		
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }
    const sum = (a)=> {
        if(a === 2 && parseInt(value_sum) !== 10){
            setvalue_sum(parseInt(value_sum) + 1)
        }else if(a === 1 && value_sum !== 1){
            setvalue_sum(parseInt(value_sum) - 1)
        }
    }
    const Add_Cart = () => {
        const key = {
            id_product:ref_id,
            varian:true_varian,
            jumlah:value_sum,
            product:base,
            created_ad:"",
            updated_ad:""
        }
        base_keranjang.push(key)
        // localStorage.removeItem("keranjang_base")
        localStorage.setItem("keranjang_base", JSON.stringify(base_keranjang))
    }
    return(
        <div className={styles.container}>
            <HeaderPage req={"show"}/>
            <div className={styles.main}>
                <div className={styles.main_left}>
                    <header className={styles.left_header}>
                        <BsArrowLeft onClick={()=>router.back()} className={styles.icon1}/>
                        <p className={styles.text1}>Dashboard / <a style={{color:"black"}}>{base.product_name}</a></p>
                    </header>
                    <div className={styles.main_main_left}>
                        <div className={styles.image1}>
                        <Image src={"/img-cth1.jpg"} width={60} height={60} layout="responsive" alt='yy'/>
                        </div>
                        <div className={styles.img_row}>
                        {base_img.map((a,b)=>{
                            return (
                                <div key={b} onClick={()=>setshow_img(b)} style={show_img === b ? {border:"solid 2.5px royalblue"}:null} className={styles.img_box}>
                                    <Image src={"/img-cth1.jpg"} width={60} height={60} alt='yy'/></div>
                            )
                        })}
                        </div>
                    </div>
                </div>
                <div className={styles.main_right}>
                    <p className={styles.text2}>{base.product_name}</p>
                    <div className={styles.right_row}>
                        <p className={styles.text3}>{convertToRupiah(parseInt(base.harga))}</p>
                        <div>
                            <p className={styles.text4}>4.0/5.0 <a style={{color:"gray", fontWeight:"400"}}>(300)</a></p>
                        </div>
                    </div>
                    <p className={styles.text5}>{base.description}</p>
                    <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"start"}}>
                        {base_varian.map((a,b)=>{
                            return <p key={b} onClick={()=>settrue_varian(b)} style={a === true_varian ? {border:"solid red 2px "}:null} className={styles.text6}>{a}</p>
                        })}
                    </div>
                    <div className={styles.right_row2}>
                        <div className={styles.row2_left}>
                            <button className={styles.btn} onClick={()=>sum(1)}>-</button>
                            <p className={styles.text7}>{value_sum}</p>
                            <button className={styles.btn} onClick={()=>sum(2)}>+</button>
                        </div>
                        <button className={styles.btn2} onClick={()=>Add_Cart()}>ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
