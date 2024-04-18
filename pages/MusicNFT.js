import React from "react";
import styled from 'styled-components';
import Navbar from "@/components/Navbar";
import { Pane, FileUploader, FileCard } from 'evergreen-ui';
import { useStorageUpload, useStorage, useSigner } from "@thirdweb-dev/react";
import { useState } from "react";
import { ethers } from "ethers";


export default function MusicNFT() {

    const [track, setTrack] = useState('')
    const [artist, setArtist] = useState('')
    const [year, setYear] = useState('')
    const signer = useSigner();
    
  
    const [audioFiles, setAudioFiles] = React.useState([])
    const [fileRejections, setFileRejections] = React.useState([])
    const handleChange = React.useCallback((files) => setAudioFiles([files[0]]), [])
    const handleRejected = React.useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
    const handleRemove = React.useCallback(() => {
      setAudioFiles([])
      setFileRejections([])
    }, []);


    const [visualFiles, setVisualFiles] = React.useState([])
    const [visualFileRejections, setVisualFileRejections] = React.useState([])
    const handleVisualChange = React.useCallback((files) => setVisualFiles([files[0]]), [])
    const handleVisualRejected = React.useCallback((fileRejections) => setVisualFileRejections([fileRejections[0]]), [])
    const handleVisualRemove = React.useCallback(() => {
      setVisualFiles([])
      setVisualFileRejections([])
    }, []);


  const { mutateAsync: upload, isLoading } = useStorageUpload();





  async function uploadData() {
    try{
      if(audioFiles.length === 0 || visualFiles.length === 0 || track === '' || artist === '' || year === '') {
        alert('Please upload a file')
      }else{

        const metadata = {
          name: track,
          artist: artist,
          year: year,
          audio: audioFiles[0],
          visual: visualFiles[0]
        }
        
        const uris = await upload({ 
          data: [metadata], 
          options: {
            uploadWithGatewayUrl: true,
            uploadWithoutDirectory: false

          }
        });
        
        console.log(uris[0]);
        const contract = new ethers.Contract(Traderiod_NFT_CONTRACT_ADDRESS, TradioABI, signer);
      }
    }catch(err){
      console.log(err)
      
  }
  }
  
  return (
    <>
    <Navbar/>
    <Container>
      <LoginForm>
        <Title>Create NFT</Title>

          <Input placeholder ="Track" onChange={(e) => setTrack(e.target.value)}/>


          <Input placeholder ="Artist" onChange={(e) => setArtist(e.target.value)}/>


          <Input placeholder ="Year" onChange={(e) => setYear(e.target.value)}/>

        
      
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
          //const fileRejection = fileRejections.find((fileRejection) => fileRejection.file === file)
          //const { message } = fileRejection || {}
          return (
            <FileCard
              key={name}
              //isInvalid={fileRejection != null}
              name={name}
              onRemove={handleRemove}
              sizeInBytes={size}
              type={type}
              //validationMessage={message}
            />
          )
        }}
        values={audioFiles}
      />

      <FileUploader
        label="Upload Visual File"
        description="You can upload 1 file. File can be up to 50 MB."
        maxSizeInBytes={50 * 1024 ** 2}
        acceptedMimeTypes = {['.png', '.jpg', '.jpeg']}
        maxFiles={1}
        onChange={handleVisualChange}
        onRejected={handleVisualRejected}
        renderFile={(file) => {
          const { name, size, type } = file
          //const fileRejection = fileRejections.find((fileRejection) => fileRejection.file === file)
          //const { message } = fileRejection || {}
          return (
            <FileCard
              key={name}
              //isInvalid={fileRejection != null}
              name={name}
              onRemove={handleVisualRemove}
              sizeInBytes={size}
              type={type}
              //validationMessage={message}
            />
          )
        }}
        values={visualFiles}
      />
    </Pane>

    <LoginButton onClick={uploadData}>Upload</LoginButton>
 


      </LoginForm>
    </Container>
    </>
        
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150vh;
  font-family: "Gill Sans", sans-serif;
  background-image: url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  
  `;


const LoginForm = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(5, 5, 5, 1);
  padding: 25px;
  width: auto;
  height: auto;
  align-items: center;
  position: absolute;
  margin-top: auto;
  width: 50%;
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