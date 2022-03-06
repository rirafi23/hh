import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/sidebar2.module.css'
import {} from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const pageTop = [
    {
        value:"1",
        name:"Dashboard",
        arr:[]
    },
    {
        value:"2.1",
        name:"Laporan",
        arr:[
            {
                value:"2.1",
                name:"Penjualan",
            },
            {
                value:"2.2",
                name:"Pendapatan",
            }
        ]
    },
    {
        value:"3",
        name:"Pesanan",
        arr:[]
    }
]

const SidebarPage = ({value, setvalue, top_hiden, settop_hiden}) => {
    return(
        <div className={styles.container}>
            <div className={styles.card}>
            {pageTop.map(a=>{
                return a.arr.length === 0 ? (
                    <div key={1} onClick={()=>{
                        setvalue(a.value)
                        settop_hiden(false)
                        }} style={parseInt(a.value) !== parseInt(value) ? {backgroundColor:"#f3f3f3"}:null} className={styles.li}>
                        {a.name}
                    </div>
                ):(
                    <div key={1} className={styles.card_arr}>
                    <div onClick={()=>{
                        setvalue(a.value)
                        settop_hiden(true)
                        }} style={parseInt(a.value) !== parseInt(value)  ? {backgroundColor:"#f3f3f3"}:null} className={styles.li}>
                        {a.name}
                    </div>
                    {top_hiden === true ?  a.arr.map(a=>{
                        return(
                            <div key={1} onClick={()=>setvalue(a.value)} style={a.value !== value ? {backgroundColor:"#f3f3f3"}:null} className={styles.li2}>
                                {a.name}
                            </div>  
                        )
                    }):null}
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default SidebarPage