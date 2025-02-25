import React from "react";
import {styled, keyframes} from 'styled-components';
import Navbar from "@/components/Navbar";
import { Pane, FileUploader, FileCard } from 'evergreen-ui';
import { useStorageUpload, useStorage, useSigner } from "@thirdweb-dev/react";
import { useState } from "react";
import { ethers } from "ethers";
import NFT from '@/abi/NFT.json';


export default function MusicNFT() {
    // address for smart contract
    const contractAdress = "0xcF6A5dcf7463C23b67A9BA4bfCc305Ef68FbaAF9";

    // keeps track of the track name, artist, year, and loading state
    const [track, setTrack] = useState('')
    const [artist, setArtist] = useState('')
    const [year, setYear] = useState('')
    const [loading, setLoading] = useState(false)
    const signer = useSigner();

    //code is from Evergreen UI
    // keeps track of the audio files and their rejections
    const [audioFiles, setAudioFiles] = React.useState([])
    const [fileRejections, setFileRejections] = React.useState([])
    const handleChange = React.useCallback((files) => setAudioFiles([files[0]]), [])
    const handleRejected = React.useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
    const handleRemove = React.useCallback(() => {
      setAudioFiles([])
      setFileRejections([])
    }, []);

    // keeps track of the visual files and their rejections
    const [visualFiles, setVisualFiles] = React.useState([])
    const [visualFileRejections, setVisualFileRejections] = React.useState([])
    const handleVisualChange = React.useCallback((files) => setVisualFiles([files[0]]), [])
    const handleVisualRejected = React.useCallback((fileRejections) => setVisualFileRejections([fileRejections[0]]), [])
    const handleVisualRemove = React.useCallback(() => {
      setVisualFiles([])
      setVisualFileRejections([])
    }, []);

  
  // initialize the storage from thirdweb
  const { mutateAsync: upload, isLoading } = useStorageUpload();





  async function uploadData() {
    try{
      // check if all fields are filled out
      if(audioFiles.length === 0 || visualFiles.length === 0 || track === '' || artist === '' || year === '') {
        alert('Please fill out all fields and upload files')
      }else if(signer == null){ // check if wallet is connected
        alert('Please connect wallet')
      }
      else{
      
        setLoading(true);
        // metadata for the NFT
        const metadata = {
          name: track,
          artist: artist,
          year: year,
          audio: audioFiles[0],
          visual: visualFiles[0]
        }
        // upload the metadata to the thirdweb storage
        const uris = await upload({ 
          data: [metadata], 
          options: {
            uploadWithGatewayUrl: true,
            uploadWithoutDirectory: false

          }
        });
        
        console.log(uris[0]);
        
        // Calls the contract to mint the NFT
        const contract = new ethers.Contract(contractAdress, NFT, signer);
        const tx = await contract.safeMint(uris[0]);
        await tx.wait();


        console.log("NFT Minted!");
        alert('NFT Minted!')

        // reset the fields and loading state
        setTrack('');
        setArtist('');
        setYear('');
        setLoading(false);
      }
    }catch(err){
      console.log(err)
      setTrack('');
        setArtist('');
        setYear('');
      setLoading(false);
      
  }
  }
  
  return (
    <>
    <Navbar/>

    <Container>
  
    
      {loading == false ? (
        <UploadForm>
        
          <Title>Create NFT</Title>
    
            <Input placeholder ="Track" onChange={(e) => setTrack(e.target.value)}/>
    
            <Input placeholder ="Artist" onChange={(e) => setArtist(e.target.value)}/>
    
            <Input placeholder ="Year" onChange={(e) => setYear(e.target.value)}/>
    
          <Pane maxWidth={5000}>
            <FileUploader
              label="Upload Audio File"
              description="You can upload 1 file. File can be up to 50 MB."
              maxSizeInBytes={50 * 1024 ** 2}
              acceptedMimeTypes = {[ '.oga', '.aac', '.mp3']}
              maxFiles={1}
              onChange={handleChange}
              onRejected={handleRejected}
              renderFile={(file) => {
                const { name, size, type } = file
                return (
                  <FileCard
                    key={name}
                    name={name}
                    onRemove={handleRemove}
                    sizeInBytes={size}
                    type={type}
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
                return (
                  <FileCard
                    key={name}
                    name={name}
                    onRemove={handleVisualRemove}
                    sizeInBytes={size}
                    type={type}
                  />
                )
              }}
              values={visualFiles}
            />
          </Pane>
    
          <UploadButton onClick={uploadData}>Upload</UploadButton>
        </UploadForm>
        
      ) :
            // Loading spinner
            <LdsGrid>
              <LdsGridItem />
              <LdsGridItem />
              <LdsGridItem />
              <LdsGridItem />
              <LdsGridItem />
              <LdsGridItem />
              <LdsGridItem />
              <LdsGridItem />
              <LdsGridItem />
            </LdsGrid>
            }
      
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


  const UploadForm = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(5, 5, 5, 1);
  padding: 25px;
  width: auto;
  height: auto;
  align-items: center;
  position: absolute;
  top: 300px; /* Adjust this value according to your Navbar height */
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  z-index: 1000; /* Ensure the form is above other content */
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

const UploadButton = styled.button`
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

const ldsGridAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const LdsGrid = styled.div`
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  width: 160px; /* Increased width */
  height: 160px; /* Increased height */
`;

const LdsGridItem = styled.div`
  position: absolute;
  width: 32px; /* Increased width */
  height: 32px; /* Increased height */
  border-radius: 50%;
  background: currentColor;
  animation: ${ldsGridAnimation} 1.2s linear infinite;

  &:nth-child(1) {
    top: 16px; /* Adjusted position */
    left: 16px; /* Adjusted position */
    animation-delay: 0s;
  }
  &:nth-child(2) {
    top: 16px; /* Adjusted position */
    left: 64px; /* Adjusted position */
    animation-delay: -0.4s;
  }
  &:nth-child(3) {
    top: 16px; /* Adjusted position */
    left: 112px; /* Adjusted position */
    animation-delay: -0.8s;
  }
  &:nth-child(4) {
    top: 64px; /* Adjusted position */
    left: 16px; /* Adjusted position */
    animation-delay: -0.4s;
  }
  &:nth-child(5) {
    top: 64px; /* Adjusted position */
    left: 64px; /* Adjusted position */
    animation-delay: -0.8s;
  }
  &:nth-child(6) {
    top: 64px; /* Adjusted position */
    left: 112px; /* Adjusted position */
    animation-delay: -1.2s;
  }
  &:nth-child(7) {
    top: 112px; /* Adjusted position */
    left: 16px; /* Adjusted position */
    animation-delay: -0.8s;
  }
  &:nth-child(8) {
    top: 112px; /* Adjusted position */
    left: 64px; /* Adjusted position */
    animation-delay: -1.2s;
  }
  &:nth-child(9) {
    top: 112px; /* Adjusted position */
    left: 112px; /* Adjusted position */
    animation-delay: -1.6s;
  }
`;