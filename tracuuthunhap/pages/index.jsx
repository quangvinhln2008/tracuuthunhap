import {userEffect, useState} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import LayoutApp from '../components/Layout'
import { Button, Result } from 'antd';
import { useEffect } from 'react';
import Login from './login'

export default function Home() {

  useEffect(()=>{
    const isLogin = window.localStorage.getItem('rTokenTracuu') !== null ? true : false
    if(!isLogin){
      router.push('/login')
    }
  },[])

  const router = useRouter()

  function onClick(){
    router.push('/thunhapthang')
  }
    return (
      <div className={styles.container}>
        <Head>
          <title>Tra cứu thu nhập</title>
          <meta name="description" content="Tra cứu thu nhập" />
          <link rel="icon" href="/favicon-16x16.png" />
        </Head>
        
        <Result
        status="403"
        title=""
        subTitle="Chức năng đang hoàn thiện."
        extra={<Button onClick={onClick} type="primary">Quay lại</Button>}
      />      
      </div>
    )  
}
