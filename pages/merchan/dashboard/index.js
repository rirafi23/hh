import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/dashboard2.module.css'
import {} from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfilePage from '../profile';
import Card_page from '../../product';

// database
import firestore from "../../../firebase/clientApp";
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs, updateDoc, doc, deleteDoc} from "@firebase/firestore";

const ProductCollection = collection(firestore,"product_table");

const DashboardPage = ({product_key, value, setvalue, setidProduct}) => {
    const [base_product, setbase_product] = useState([])
    const router = useRouter()
    useEffect(()=>{
            getData()
    },[])
    const getData = async() => {
         var baseProduct = []
         const Query = query(ProductCollection);
         const querySnapshot = await getDocs(Query);
         querySnapshot.forEach(a=>{
             baseProduct.push(a)
         })
         setbase_product(baseProduct)
      };
    return(
        <div className={styles.container}>
            <div className={styles.mainLeft}>
                <header className={styles.header}>
                    <p className={styles.text1}>Dashboard</p>
                    <p className={styles.text2}>Home / Dashboard</p>
                </header>
                <div className={styles.main1}>
                    <div className={styles.cardMain1}></div>
                    <div className={styles.cardMain1}></div>
                </div>
                <div className={styles.iklan}></div>
                <div className={styles.main2}>
                    <div className={styles.main2_header}>
                        <p className={styles.text3}>Product Saya</p>
                        <p>{base_product.length}</p>
                        <button className={styles.btn1} onClick={()=>setvalue("1.1")}>Add Product</button>
                    </div>
                    <main className={styles.main2_main}>
                        {base_product.map(a=>{
                            return <Card_page key={a.id} onPress={()=>{
                                setidProduct(a.id)
                                setvalue("1.2")
                            }} data={a}/>    
                        })}
                    </main>
                </div>
            </div>
            <div className={styles.mainRight}>
                <div className={styles.box}>
                    <ProfilePage/>
                </div>
                <div className={styles.box}></div>
            </div>
        </div>
    )
}

export default DashboardPage