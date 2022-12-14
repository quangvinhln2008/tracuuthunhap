import React, {useState, useEffect} from "react";
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { VStack, Text, HStack } from "@chakra-ui/react";
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import {Descriptions, Button, Form, Input, Modal }from 'antd';
import { getHeader } from "../../Helper";
import styles from './index.module.css'

const Profile = (props) =>{
  const [openModal, setOpenModal] = useState(false)
  const [openModalChangeEmail, setOpenModalChangeEmail] = useState(false)
  const [openModalChangePhone, setOpenModalChangePhone] = useState(false)
  const [openModalChangeId, setOpenModalChangeId] = useState(false)
  const [data, setData] = useState()
  const [rToken, setrToken] = useState()
  const [emailField, setEmailField] = useState([
    {
      name: ['email'],
      value: '',
    },
  ])
  const [idField, setIdField] = useState([
    {
      name: ['id'],
      value: '',
    },
  ])
  const router = useRouter()
  let token

  useEffect(()=>{
    token = window.localStorage.getItem('rTokenTracuu')
  },[])  
    
  function toogleModalForm(){
    setOpenModal(!openModal)
  }

  function toogleModalFormChangeEmail(){
    setOpenModalChangeEmail(!openModalChangeEmail)
  }

  function toogleModalFormChangePhone(){
    setOpenModalChangePhone(!openModalChangePhone)
  }

  function toogleModalFormChangeId(){
    setOpenModalChangeId(!openModalChangeId)
  }

  useEffect(()=>{
    loadProfile()
    setrToken(token)
  }, [token])
  
  function logout(){
    const isRememberMe = window.localStorage.getItem('rememberTracuu')
    if (isRememberMe === 'true') {
      window.localStorage.removeItem('passwordTracuu')
      window.localStorage.removeItem('emailTracuu')
      window.localStorage.removeItem('fullNameTracuu')
      window.localStorage.removeItem('emailTracuu')
      window.localStorage.removeItem('rTokenTracuu')
      window.localStorage.removeItem('rolesTracuu')
    } else {
      window.localStorage.clear()
    }
    router.push('/login')
  }

  async function loadProfile(){
    return await axios
      .post('http://localhost:3001/user/profile', {token: token})
      .then((res) => {
        const result = {
          status: res.data.status,
          data: res.data.result.recordset,
        }
        setData(res.data.result.recordset[0])
        const newField = [{
          name: ['email'],
          value: res.data.result.recordset[0].EMAILNV
        }]
        setEmailField(newField)
        const newIdField = [{
          name: ['id'],
          value: res.data.result.recordset[0].TENDANGNHAPNV
        }]
        setIdField(newIdField)
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
  }

  async function submitChangePassword(data){
    let checkPassword
    checkPassword = data.newPassword === data.repeatPassword ? true : false

    if(checkPassword){
      return await axios
      .post('http://localhost:3001/user/changePassword', {token: rToken, newPassword: data.newPassword })
      .then((res) => {
        toast.success('?????i m???t kh???u th??nh c??ng! Vui l??ng ????ng nh???p l???i')
        setOpenModal(!openModal)
        const result = {
          status: res.data.status,
          data: res.data.message,
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
      })
    }else{
      toast.error('Vui l??ng ki???m tra l???i m???t kh???u!')
    }
  }
  async function submitChangeEmail(data){
    return await axios
    .post('http://localhost:3001/user/changeEmail', {token: rToken, emailNew: data.emailNew })
    .then((res) => {
      toast.success('C???p nh???t Email th??nh c??ng!')
      setOpenModalChangeEmail(!openModalChangeEmail)
      const result = {
        status: res.data.status,
        data: res.data.message,
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error.response)
    })
  }

  async function submitChangeId(data){
    return await axios
    .post('http://localhost:3001/user/changeId', {token: rToken, idNew: data.idNew })
    .then((res) => {
      toast.success('C???p nh???t t??i kho???n th??nh c??ng! Vui l??ng ????ng nh???p l???i')
      setOpenModalChangeId(!openModalChangeId)
      logout()
      const result = {
        status: res.data.status,
        data: res.data.message,
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error.response)
    })
  }

  async function submitChangePhone(data){
    return await axios
    .post('http://localhost:3001/user/changePhone', {token: rToken, phoneNew: data.phoneNew })
    .then((res) => {
      toast.success('C???p nh???t ??i???n tho???i th??nh c??ng!')
      setOpenModalChangePhone(!openModalChangePhone)
      window.location.reload()
      const result = {
        status: res.data.status,
        data: res.data.message,
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error.response)
    })
  }

  return(
    <>
      <Head>
        <title>Trang c?? nh??n</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <VStack>
        <Text fontSize={{md:"2xl", lg:'2xl', sm:'xl'}} fontWeight="bold" marginBottom={"2rem"} color ={"#38b2ac"}>Trang th??ng tin c?? nh??n</Text>
          <Descriptions  layout="vertical" bordered>
            <Descriptions.Item label="T??i kho???n ????ng nh???p"><strong>{data?.TENDANGNHAPNV}</strong>{' '}<Button onClick={toogleModalFormChangeId} type="link">C???p nh???t</Button></Descriptions.Item>
            <Descriptions.Item label="M?? nh??n vi??n"><strong>{data?.MANV}</strong></Descriptions.Item>
            <Descriptions.Item label="H??? v?? T??n"><strong>{data?.HOTEN}</strong></Descriptions.Item>
            <Descriptions.Item label="????n v???"><strong>{data?.TENDONVI}</strong></Descriptions.Item>
            <Descriptions.Item label="??i???n tho???i"><strong>{data?.DIENTHOAINV}</strong>{' '}<Button onClick={toogleModalFormChangePhone} type="link">C???p nh???t</Button></Descriptions.Item>
            <Descriptions.Item label="Email"><strong>{data?.EMAILNV}</strong>{' '}<Button onClick={toogleModalFormChangeEmail} type="link">C???p nh???t</Button></Descriptions.Item>
          </Descriptions>
          <Button type="primary" onClick={toogleModalForm}>?????i m???t kh???u</Button>
      </VStack>
      <Modal
        visible={openModal}
        title="?????i m???t kh???u"
        // onOk={handleOk}
        onCancel={toogleModalForm}
        footer={null}
      >
      <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={submitChangePassword}
        >
          <Form.Item
            label="M???t kh???u m???i: "
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p m???t kh???u m???i'
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nh???p l???i m???t kh???u: "
            name="repeatPassword"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p l???i m???t kh???u!'
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalForm}>Tho??t</Button>,
            <Button type="primary" htmlType="submit">?????i m???t kh???u</Button>,
          </HStack>
        </Form>
      </Modal>
      {/* Modal ?????i Id */}
      <Modal
        visible={openModalChangeId}
        title="C???p nh???t t??i kho???n ????ng nh???p"
        // onOk={submitChangeEmail}
        onCancel={toogleModalFormChangeId}
        footer={null}
      >
      <Form
          name="basic"
          fields={idField}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={submitChangeId}
        >
          <Form.Item
            label="T??i kho???n hi???n t???i: "
            name="id"
          >
            <Input  readOnly/>
          </Form.Item>

          <Form.Item
            label="T??i kho???n m???i: "
            name="idNew"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p t??i kho???n m???i!'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalFormChangeId}>Tho??t</Button>
            <Button type="primary"  htmlType="submit" danger>C???p nh???t</Button>
          </HStack>
        </Form>
      </Modal>

      {/* Modal ?????i email */}
      <Modal
        visible={openModalChangeEmail}
        title="C???p nh???t email"
        // onOk={submitChangeEmail}
        onCancel={toogleModalFormChangeEmail}
        footer={null}
      >
      <Form
          name="basic"
          fields={emailField}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={submitChangeEmail}
        >
          <Form.Item
            label="Email hi???n t???i: "
            name="email"
          >
            <Input  readOnly/>
          </Form.Item>

          <Form.Item
            label="Email m???i: "
            name="emailNew"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p ????ng ?????nh d???ng Email! ',
                type:'email'
              },
              {
                required: true,
                message: 'Vui l??ng nh???p Email!'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalFormChangeEmail}>Tho??t</Button>
            <Button type="primary"  htmlType="submit" danger>C???p nh???t</Button>
          </HStack>
        </Form>
      </Modal>

      {/* Modal ?????i ??i???n tho???i */}
      <Modal
        visible={openModalChangePhone}
        title="C???p nh???t ??i???n tho???i"
        // onOk={submitChangeEmail}
        onCancel={toogleModalFormChangePhone}
        footer={null}
      >
      <Form
          name="basic"
          fields={emailField}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={submitChangePhone}
        >
          <Form.Item
            label="S??? ??i???n tho???i m???i: "
            name="phoneNew"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p s??? ??i???n tho???i!'
              },
              {
                required: true,
                message: 'Vui l??ng nh???p Email!'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalFormChangePhone}>Tho??t</Button>
            <Button type="primary"  htmlType="submit" >C???p nh???t</Button>
          </HStack>
        </Form>
    
      </Modal>
    </>
  )
}

export default Profile;