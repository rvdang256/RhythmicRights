import React from "react";
import styled from 'styled-components';
import Navbar from "@/components/Navbar";
import { Pane, FileUploader, FileCard } from 'evergreen-ui';


export default function MusicNFT() {
  
    const [files, setFiles] = React.useState([])
    const [fileRejections, setFileRejections] = React.useState([])
    const handleChange = React.useCallback((files) => setFiles([files[0]]), [])
    const handleRejected = React.useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
    const handleRemove = React.useCallback(() => {
      setFiles([])
      setFileRejections([])
    }, []);
  
  return (
    <>
    <Navbar/>
    <Container>
      <LoginForm>
        <Title>Create NFT</Title>

          <Input placeholder ="Track" />


          <Input placeholder ="Artist"/>

          <Input placeholder ="Genre" />


          <Input placeholder ="Year"/>

        
      
        <Pane maxWidth={5000}>
      <FileUploader
        label="Upload Audio File"
        description="You can upload 1 file. File can be up to 50 MB."
        maxSizeInBytes={50 * 1024 ** 2}
        acceptedMimeTypes = {['.pdf', '.oga', '.aac', '.mp3']}
        maxFiles={1}
        onChange={handleChange}
        onRejected={handleRejected}
        renderFile={(file) => {
          const { name, size, type } = file
          const fileRejection = fileRejections.find((fileRejection) => fileRejection.file === file)
          const { message } = fileRejection || {}
          return (
            <FileCard
              key={name}
              isInvalid={fileRejection != null}
              name={name}
              onRemove={handleRemove}
              sizeInBytes={size}
              type={type}
              validationMessage={message}
            />
          )
        }}
        values={files}
      />
    </Pane>

    <LoginButton>Submit</LoginButton>
 


      </LoginForm>
    </Container>
    </>
        
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  font-family: "Gill Sans", sans-serif;
  background-image: url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  
  `;


const LoginForm = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(5, 5, 5, 1);
  padding: 20px;
  width: auto;
  height: auto;
  align-items: center;
  position: relative;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;



const Input = styled.input`
  width: 97%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 30px;
  margin-bottom: 20px;
  align-items: center;
  
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 1.5vw;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  

  &:hover {
    background-color: #0056b3;
  }
`;

const SignUp = styled.h1`

font-size: 15px;
margin-top: 55px;
margin-left: 280px;
color: gray; /* Sets the text color to gray */
text-decoration: underline;
cursor: pointer;
`;