import React, {useState, useEffect} from "react";
import Head from 'next/head'
import axios from 'axios'
import { Button, Select, Space, Input  } from 'antd';
import {HStack, VStack, Wrap, Text} from  '@chakra-ui/react';
import Item from "../../components/Item";
import styles from './index.module.css'
const { Option } = Select;


const ThueTNCN = () =>{
  const [data, setData] = useState()
  const [maNV, setMaNV] = useState('')
  const [namBK, setNamBK] = useState()
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const defaultYear = today.getFullYear()

  useEffect(()=>{
    setNamBK(defaultYear)
  }, [defaultYear])
  
  useEffect(()=>{
    setMaNV(window.localStorage.getItem('idTracuu'))
  }, [])

  function handleChangeName (event)  {
    setNamBK(event.target.value)
  };

  async function loadThuNhapThang(){
    return await axios
      .post('http://localhost:3001/thuetncn', {manv: maNV, namBK: namBK})
      .then((res) => {
        const result = {
          status: res.data.status,
          data: res.data.result.recordset,
        }
        setData(res.data.result.recordset)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }
  return(
    <>
      <Head>
        <title>Tra cứu Quyết toán thuế TNCN</title>
        <meta name="description" content="Quyết toán thuế TNCN năm" />
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <VStack>
        <Text fontSize={"2xl"} fontWeight="bold" marginBottom={"2rem"} color ={"#38b2ac"}>Tra cứu Quyết toán thuế TNCN</Text>
        <HStack style ={{marginBottom:"1rem !important"}} alignItems={"center"} spacing={10}>
          <HStack>
            <Text>Năm:</Text>
            <Input defaultValue={defaultYear}  className={styles.inputNam} placeholder="Năm" onChange={handleChangeName}  />;
          </HStack>
          <Button type="primary" onClick={loadThuNhapThang}>Lọc dữ liệu</Button>  
        </HStack>
        {data &&
          (<Wrap justify='center'>
            <Item title ={`Quyết toán thuế năm ${namBK}`} loading ={loading} nam ={namBK} data ={data} />
          </Wrap>)
          }
      </VStack>
    </> 
  )
}

export default ThueTNCN;