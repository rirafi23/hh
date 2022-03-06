import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/index2.module.css'
import {} from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HeaderPage from './header';
import ProfilePage from './profile';
import DashboardPage from './dashboard';

// database
import firestore from "../../firebase/clientApp";
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs, updateDoc, doc, deleteDoc} from "@firebase/firestore";
import AddProductPage from './addProduct';
import SidebarPage from './sidebar.js';
import ShowProduct from './product';

const PenggunaCollection = collection(firestore,"pengguna_merchan");


const IndexMerchan = () => {
    const [value, setvalue] = useState("1")
    const [top_hiden, settop_hiden] = useState(false)
    const [user, setuser] = useState(null)
    const [idProduct, setidProduct] = useState("")

    useEffect(()=>{
        getData()
    },[])
    const getData = async () => {
        const localId = localStorage.getItem("merchanID")
        const base_user = []
         const Query = query(PenggunaCollection);
         const querySnapshot = await getDocs(Query); 
         querySnapshot.forEach((snapshot) => {
                var a = snapshot
              if(a.id === localId){
                base_user.push(a.data())
              }
         });
         setuser(base_user[0])
      };
      const renderPage = () => {
          if(value === "1"){
              return <DashboardPage setidProduct={(a)=>setidProduct(a)} value={value} setvalue={(a)=>setvalue(a)} product_key={user.product_key}/>
          }else if(value === "1.1"){
              return <AddProductPage value={value} setvalue={(a)=>setvalue(a)} product_key={user.product_key}/>
          }else if(value === "1.2"){
              return <ShowProduct value={value} setvalue={(a)=>setvalue(a)} id_product={idProduct}/>
          }
      }
    return(
        <div className={styles.container}>
            <HeaderPage/>
            <main className={styles.main1}>
                <main className={styles.sideBar}>
                    <SidebarPage value={value} setvalue={(a)=>setvalue(a)} top_hiden={top_hiden} settop_hiden={(a)=>settop_hiden(a)} />
                </main>
                <main style={value === "1.2" ? {padding:"0px"}:null} className={styles.main2}>
                    {user !== null ? renderPage() : (
                        <div></div>
                    )}
                </main>
            </main>
        </div>
    )
}

export default IndexMerchan