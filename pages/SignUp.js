import React from 'react';
import styled, { keyframes } from 'styled-components';
import {auth} from '@/library/firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function SignUp() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();

  function handleSignUpClick() {

    if (email === '' || password === '') {
      alert('Email and Password cannot be empty')
      return;
    }else{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log(`User ${user.email} is signed in up`)
      router.push('/loginPage');

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      alert("Email already in use")
    });

  }
}
  return (
    <Container>
      <Left>
        <Header>
          <h2>Welcome Aborad!</h2>
          <h4>Sign up using your email and password</h4>
        </Header>
        <Form>
          <FormField type="first name" placeholder="First Name" />
          <FormField type="last name" placeholder="Last Name" />
          <FormField type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
          <FormField type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          
          <ForgotPassword>
            <a href="/Login">Log In</a>
          </ForgotPassword>
          <SubmitButton>SIGN UP</SubmitButton>
        </Form>
      </Left>
      <Right />
    </Container>
  );
}


// Define keyframes
const moveAnimation = keyframes`
  0% {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-40px);
  }
  100% {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

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

const Dropdown = styled.select`




`;