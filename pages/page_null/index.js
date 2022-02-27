import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/page_null.module.css'
import { BsArrowDown, BsArrowUp, BsFillBellFill,BsFillCartFill, BsMenuDown, BsSearch, BsSortDown } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PageNull = ({message, onPress}) => {
    return(
        <div className={styles.container}>
            <p className={styles.text1}>{message} <a className={styles.text2} onClick={()=>onPress()}>Reload...</a></p>
        </div>
    )
}

export default PageNull