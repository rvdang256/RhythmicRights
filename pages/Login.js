import Navbar from "@/components/Navbar"
import styled from "styled-components";
import { keyframes } from "styled-components";
import { useRouter } from 'next/router';
import {auth} from '@/library/firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useStateContext } from '@/context/StateContext';


export default function Login() {
    

    

  const { setUser } = useStateContext();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();




  //Sign in with email and password
  function handleLoginClick() {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      setUser(user)
      console.log(`User ${user.email} is signed in`)
      router.push('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      alert("Invalid username or password")
    });
  }

    return (
        <Container>
          <Left>
            <Header>
              <h2>Welcome Back</h2>
              <h4>Log in to your account using email and password</h4>
            </Header>
            <Form>
              <FormField type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
              <FormField type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              <ForgotPassword>
                <a href="/SignUp">Sign Up</a>
              </ForgotPassword>
              <SubmitButton onClick={handleLoginClick}>LOGIN</SubmitButton>
            </Form>
          </Left>
          <Right />
        </Container>
      );
    }
    
    
    

    
    const leftAnimation = keyframes`
      0% {
        opacity: 0;
        width: 0;
      }
      100% {
        opacity: 1;
        padding: 20px 40px;
        width: 440px;
      }
    `;
    
    // Styled components
    const Container = styled.div`
      display: flex;
      height: 100vh;
    `;
    
    const Left = styled.div`
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      animation: ${leftAnimation} 1s both 1s;
    `;
    
    const Right = styled.div`
      flex: 1;
      background-color: black;
      transition: 1s;
      background-image: url(https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `;
    
    const Header = styled.div`
      & > h2 {
        margin: 0;
        color: #4f46a5;
      }
    
      & > h4 {
        margin-top: 10px;
        font-weight: normal;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.4);
      }
    `;
    
    const Form = styled.div`
      max-width: 80%;
      display: flex;
      flex-direction: column;
    `;
    
    const FormField = styled.input`
      height: 46px;
      padding: 0 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-family: 'Rubik', sans-serif;
      outline: 0;
      transition: 0.2s;
      margin-top: 20px;
    
      &:focus {
        border-color: #0f7ef1;
      }
    `;
    
    const ForgotPassword = styled.p`
      text-align: right;
    
      & > a {
        color: #000;
        font-size: 14px;
      }
    `;
    
    const SubmitButton = styled.button`
      padding: 12px 10px;
      border: 0;
      background: linear-gradient(to right, #de48b5 0%, #0097ff 100%);
      border-radius: 3px;
      margin-top: 10px;
      color: #fff;
      letter-spacing: 1px;
      font-family: 'Rubik', sans-serif;
      cursor: pointer;

    `;