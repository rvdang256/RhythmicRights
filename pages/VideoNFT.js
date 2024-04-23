import React, { useEffect } from "react";
import {styled, keyframes} from 'styled-components';
import Navbar from "@/components/Navbar";
import { ConnectWallet, useSigner, useStorage, usedo} from "@thirdweb-dev/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { useState } from "react";
import { ethers } from "ethers";
import NFT from '@/abi/NFT.json';

import { darkTheme, lightTheme } from "@thirdweb-dev/react";
 
const customDarkTheme = darkTheme({
  fontFamily: "Inter, sans-serif",
  colors: {
    modalBg: "#000000",
    accentText: "red",
  },
});



export default function VideoNFT() {
const [image, setImage] = useState(null);
const signer = useSigner();
const storage = useStorage();
const contractAdress = "0x0480Add3a7f7FeCb894325b19c19a7a9D35BF33c";




const [file, setFile] = useState(null);
async function uploadData() {
  try {
  const contract = new ethers.Contract(contractAdress, NFT, signer);
  const URI = await contract.getAllTokenURIs();
  console.log(URI[0]);
  if(!URI[0]){
    alert('Boof')
  }else{
    const data = await storage.download(URI[0]);
    const metadataResponse = await fetch(data.url);
    const metadata = await metadataResponse.json();
    console.log(metadata);
    setImage(metadata.visual);
  }
}catch (error) {
  console.log(error);

  }
}
return (



<>
<Navbar/>
<div>


<ConnectWallet theme={customDarkTheme} connectModal={{ size: "wide" }}/>

  <button onClick={uploadData}>Upload</button>

  {image && <img src={image} alt="Image" />}

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

</div>
</>


  );

}

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
  width: 80px;
  height: 80px;
`;

const LdsGridItem = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: currentColor;
  animation: ${ldsGridAnimation} 1.2s linear infinite;

  &:nth-child(1) {
    top: 8px;
    left: 8px;
    animation-delay: 0s;
  }
  &:nth-child(2) {
    top: 8px;
    left: 32px;
    animation-delay: -0.4s;
  }
  &:nth-child(3) {
    top: 8px;
    left: 56px;
    animation-delay: -0.8s;
  }
  &:nth-child(4) {
    top: 32px;
    left: 8px;
    animation-delay: -0.4s;
  }
  &:nth-child(5) {
    top: 32px;
    left: 32px;
    animation-delay: -0.8s;
  }
  &:nth-child(6) {
    top: 32px;
    left: 56px;
    animation-delay: -1.2s;
  }
  &:nth-child(7) {
    top: 56px;
    left: 8px;
    animation-delay: -0.8s;
  }
  &:nth-child(8) {
    top: 56px;
    left: 32px;
    animation-delay: -1.2s;
  }
  &:nth-child(9) {
    top: 56px;
    left: 56px;
    animation-delay: -1.6s;
  }
`;