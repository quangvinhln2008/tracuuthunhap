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
  const [data, setData] = useState()
  const [rToken, setrToken] = useState()
  const [emailField, setEmailField] = useState([
    {
      name: ['email'],
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
        toast.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại')
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
      toast.error('Vui lòng kiểm tra lại mật khẩu!')
    }
  }
  async function submitChangeEmail(data){
    return await axios
    .post('http://localhost:3001/user/changeEmail', {token: rToken, emailNew: data.emailNew })
    .then((res) => {
      toast.success('Cập nhật Email thành công! Vui lòng đăng nhập lại')
      setOpenModalChangeEmail(!openModalChangeEmail)
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

  return(
    <>
      <Head>
        <title>Trang cá nhân</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <VStack>
        <Text fontSize={{md:"2xl", lg:'2xl', sm:'xl'}} fontWeight="bold" marginBottom={"2rem"} color ={"#38b2ac"}>Trang thông tin cá nhân</Text>
          <Descriptions  layout="vertical" bordered>
            <Descriptions.Item label="Mã nhân viên"><strong>{data?.MANV}</strong></Descriptions.Item>
            <Descriptions.Item label="Họ và Tên"><strong>{data?.HOTEN}</strong></Descriptions.Item>
            <Descriptions.Item label="Đơn vị"><strong>{data?.TENDONVI}</strong></Descriptions.Item>
            <Descriptions.Item label="Điện thoại"><strong>{data?.DIENTHOAINV}</strong></Descriptions.Item>
            <Descriptions.Item label="Email"><strong>{data?.EMAILNV}</strong>{'    '}<Button onClick={toogleModalFormChangeEmail} type="link">Cập nhật email</Button></Descriptions.Item>
          </Descriptions>
          <Button type="primary" onClick={toogleModalForm}>Đổi mật khẩu</Button>
      </VStack>
      <Modal
        visible={openModal}
        title="Đổi mật khẩu"
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
            label="Mật khẩu mới: "
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu mới'
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu: "
            name="repeatPassword"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập lại mật khẩu!'
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalForm}>Thoát</Button>,
            <Button type="primary" htmlType="submit">Đổi mật khẩu</Button>,
          </HStack>
        </Form>
      </Modal>

      {/* Modal đổi email */}
      <Modal
        visible={openModalChangeEmail}
        title="Cập nhật email"
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
            label="Email hiện tại: "
            name="email"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Vui lòng nhập đúng định dạng Email!',
            //     type:'email'
            //   },
            //   {
            //     required: true,
            //     message: 'Vui lòng nhập Email!'
            //   },
            // ]}
          >
            <Input  readOnly/>
          </Form.Item>

          <Form.Item
            label="Email mới: "
            name="emailNew"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập đúng định dạng Email! ',
                type:'email'
              },
              {
                required: true,
                message: 'Vui lòng nhập Email!'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <HStack justifyContent="end">
            <Button key="back" onClick={toogleModalFormChangeEmail}>Thoát</Button>
            <Button type="primary"  htmlType="submit" onClick={submitChangeEmail} danger>Cập nhật</Button>
          </HStack>
        </Form>
    
      </Modal>
    </>
  )
}

export default Profile;