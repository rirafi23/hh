import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/add_product.module.css'
import { BsArrowLeft, BsArrowLeftCircle } from "react-icons/bs";
import { useEffect, useState } from 'react';

// database
import firestore from "../../../firebase/clientApp";
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs, updateDoc, doc, deleteDoc, setDoc} from "@firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const KategoriCollection = collection(firestore,"kategori_product");


const AddProductPage = ({product_key, value, setvalue}) => {
    const [varian, setvarian] = useState([])
    const [categoryBase, setcategoryBase] = useState([])
    // img
    const [image, setImage] = useState([]);
    const [ObjectURL, setObjectURL] = useState([]);
    const [ObjectURL2, setObjectURL2] = useState([]);
    //
    const [product_name, setproduct_name] = useState("")
    const [harga_awal, setharga_awal] = useState(0)
    const harga_jual = (harga_awal * (5 / 100)) + parseInt(harga_awal)
    const [jumlah_product, setjumlah_product] = useState(0)
    const [kategori_product, setkategori_product] = useState("")
    const [description, setdescription] = useState("")

    useEffect(()=>{
        getData()
        // alert(product_key)
    },[])
    const getData = async () => {
        const base = []
        const Query = query(KategoriCollection);
        const querySnapshot = await getDocs(Query); 
        querySnapshot.forEach((snapshot) => {
               var a = snapshot
               base.push(a)
        });
        setcategoryBase(base)
      };

    const uploadToClient = (event, par) => {
        var FR= new FileReader();
        FR.addEventListener("load", function(e) {
            image.push(e.target.result)
          }); 
        if (event.target.files && event.target.files[0]) {
              const i = event.target.files[0];
              ObjectURL2.push(URL.createObjectURL(i))
            }
            FR.readAsDataURL( event.target.files[0] );
        const a = JSON.stringify(ObjectURL2)
        setObjectURL(JSON.parse(a))
    };
    const add_Product = async() => {
        const timestamp = Date.now().toString();
        const i = JSON.stringify(image)
        const key = {
              berat:0,
              category:kategori_product,
              created_ad:timestamp,
              description:description,
              harga:harga_jual,
              harga_awal:harga_awal,
              img:JSON.parse(i),
              product_key:product_key,
              product_name:product_name,
              stok_product:jumlah_product,
              terjual:0,
              updated_ad:timestamp,
              varian:[]
          }
        //   alert(JSON.stringify(key))
        // create a pointer to our Document
        const _todo = doc(firestore, `product_table/${timestamp}`);
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
      function convertToRupiah(angka){
        var rupiah = '';		
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp.'+rupiah.split('',rupiah.length-1).reverse().join('');
    }
    return(
        <div className={styles.container}>
            <header className={styles.header}>
                 <BsArrowLeft onClick={()=>setvalue("1")} />
                <div style={{marginLeft:"1.5%"}}>
                <p className={styles.text1}>Add Product</p>
                <p className={styles.text2}>Home / Add Product</p>
                </div>
            </header>
            <main className={styles.main}>
                <div className={styles.left}>
                    <p className={styles.text4}>Product Detail</p>
                    <div className={styles.box}>
                        <label className={styles.label}>Nama Product</label>
                        <input onChange={(e)=>setproduct_name(e.target.value)} className={styles.input}/>
                    </div>
                    <div  className={styles.left_row}>
                        <div className={styles.box2}>
                            <label className={styles.label}>Harga Awal</label>
                            <input onChange={(e)=>setharga_awal(e.target.value)} className={styles.input}/>
                        </div>
                        <div className={styles.box2}>
                            <label className={styles.label}>Harga Jual <a className={styles.text3}>(harga awal  x  20%)</a></label>
                            <input className={styles.input} value={convertToRupiah(harga_jual)}/>
                        </div>    
                    </div>
                    <div  className={styles.left_row}>
                        <div className={styles.box2}>
                            <label className={styles.label}>Jumlah Product</label>
                            <input onChange={(e)=>setjumlah_product(e.target.value)} className={styles.input}/>
                        </div>
                        <div className={styles.box2}>
                            <label className={styles.label}>Kategori Product</label>
                            <select onChange={(e)=>setkategori_product(e.target.value)} className={styles.input}>
                                {categoryBase.map(a=>(
                                    <option key={a.id} value={a.id}>{a.data().name}</option>
                                ))}
                            </select>
                        </div>    
                    </div>
                    <div className={styles.box}>
                        <label className={styles.label}>Description</label>
                        <textarea onChange={(e)=>setdescription(e.target.value)} rows="4" className={styles.textarea}/>
                    </div>
                </div>
                <div className={styles.right}>
                    {/* <div className={styles.box}>
                        <label className={styles.label}>Description</label>
                        <input className={styles.input}/>
                        <va
                    </div> */}
                    <div>
                        <div className={styles.box}>
                            <label className={styles.label}>Add Image {ObjectURL.length < 5 ? <input type="file" name="myImage" onChange={(e)=>uploadToClient(e)}/> : <input type="button" value={"Choose file"} name="myImage" onClick={(e)=>alert("penuh")} />}</label>
                            <div className={styles.imgRow}>
                            {ObjectURL.map((a)=>(
                                <div key="a" className={styles.boxImage}>
                                    <Image alt='aa' src={a} width={10} height={10} layout="responsive" />
                                </div>
                            ))}
                            </div>
                            {/* <textarea className={styles.input}/> */}
                        </div>
                    </div>
                    <div className={styles.rightBottom}>
                        <button onClick={()=>add_Product()} className={styles.btn}>Simpan</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AddProductPage