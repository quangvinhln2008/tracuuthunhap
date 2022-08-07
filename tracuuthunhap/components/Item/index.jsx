import React,  { useEffect, useState } from "react";
import { VStack, HStack, WrapItem } from "@chakra-ui/react";
import { Card, Button, Empty, Skeleton   } from 'antd';
import ItemDetail from "./ItemDetail";

const Item =(props)=>{
  const {data, thang, nam, loading} = props
  const [newData, setNewData] = useState()
  const [toogleLoadMore, setToogleLoadMore] = useState(true) 
  console.log('data item', data)
  useEffect(()=>{
    setNewData(data?.slice(0,5));
    setToogleLoadMore(true)
  },[data])

  function loadMore(){
    setNewData(data)
    setToogleLoadMore(false)
  }
  function unLoadMore(){
    setNewData(data?.slice(0,5))
    setToogleLoadMore(true)
  }
  
  return(
    <>
      {
      data?.length === 0 ?
      (
        <Skeleton loading={loading}>
          <Empty description={
            <span>
              Dữ liệu chưa được cập nhật
            </span>
          }/>
        </Skeleton>
      )
      
      :(
        <WrapItem>
          <VStack spacing={3}>
            <Card loading ={loading} style={ {fontSize: '16px', marginTop: '2rem', marginBottom:'2rem'}} title={`Thu nhập tháng ${thang} năm ${nam}`}>
              <HStack padding={1} borderBottom={"1px solid #CBD5E0"} alignItems={"center"} justifyContent="space-between">
                <p style ={{fontWeight:"bold", fontSize:"18px"}}>Nội dung</p>
                <p style ={{fontWeight:"bold", fontSize:"18px"}}>Số tiền (đồng)</p>
              </HStack>
                {
                  newData?.map((item, index) =>
                    <ItemDetail key ={index} item ={item}/> 
                  )
                }
                {toogleLoadMore && <Button onClick={loadMore} style={{marginTop: '2rem'}} type="primary">Chi tiết</Button>}
                {!toogleLoadMore && <Button onClick={unLoadMore} style={{marginTop: '2rem'}} type="primary">Thu nhỏ</Button>}
            </Card>
          </VStack>
        </WrapItem>
      )
    }
    </>
  )
}

export default Item;