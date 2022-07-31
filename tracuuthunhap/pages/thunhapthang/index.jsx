import React, {useState} from "react";
import axios from 'axios'
import { Button } from 'antd';

const ThuNhapThang = () =>{
  const [data, setData] = useState()

  async function loadThuNhapThang(){
    return await axios
      .post('http://localhost:3001/thunhapthang', {manv: '1277', thangBK :'1', namBK: '2022'})
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
      <Button type="primary" onClick={loadThuNhapThang}>Load Data</Button>
    </>
    
  )
}

export default ThuNhapThang;