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
const [NFTs, setNFTs] = useState(null);
const [track, setTrack] = useState('')
const signer = useSigner();
const storage = useStorage();
const contractAdress = "0x0480Add3a7f7FeCb894325b19c19a7a9D35BF33c";




const [file, setFile] = useState(null);
async function uploadData() {
  try {
  const contract = new ethers.Contract(contractAdress, NFT, signer);
  const URI = await contract.getAllTokenURIs();
  if(!URI[0]){
    alert('Boof')
  }else{
    const length = URI.length;
    const NFT_info = [];
    
    for (let i = 0; i < length; i++) {
      let data = await storage.download(URI[i]);
      let metadataResponse = await fetch(data.url);
      let metadata = await metadataResponse.json();
      console.log(metadata);
      NFT_info.push(metadata);
    }
    console.log(NFT_info);
    setNFTs(NFT_info);
    
    
  }
}catch (error) {
  console.log(error);

  }
}
return (



<>
<Navbar/>

<Wrapper>
<ConnectWallet theme={customDarkTheme} connectModal={{ size: "wide" }}/>

  <button onClick={uploadData}>Upload</button>



  
  
    
      <CardWrapper>
        <Card>
          <CardFront className="card-front">
            <CardImage src="https://image.tmdb.org/t/p/original/lr3cYNDlJcpT1EWzFH42aSIvkab.jpg" alt="Dune: Part One (2021) movie poster" />
          </CardFront>
          <CardBack className="card-back">
            <CardTitle>Dune: Part One (2021)</CardTitle>
            <CardDirector>Denis Villeneuve</CardDirector>
            <CardDescription>
              Track: {track}
              <audio controls>
      <source src="https://d54e8aaf1f167dbfd847c6ea03edce74.ipfscdn.io/ipfs/bafybeib3xqh7lv3o4fnntte6c7hegvggcx22wn7z43tipio4hpi3by4sva/file_example_MP3_5MG.mp3" type="audio/mpeg"/>
      Your browser does not support the audio element.
    </audio>
            </CardDescription>
            
          </CardBack>
        </Card>
        <Card>
          <CardFront className="card-front">
            <CardImage src="https://image.tmdb.org/t/p/original/mFnF8tpPMqEwti2J2aMhYGZYdv0.jpg" alt="Dune: Part Two (2024) movie poster" />
          </CardFront>
          <CardBack className="card-back">
            <CardTitle>Dune: Part Two (2024)</CardTitle>
            <CardDirector>Denis Villeneuve</CardDirector>
            <CardDescription>
              Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.
            </CardDescription>
          </CardBack>
        </Card>
      
    

    {NFTs && NFTs.map((nft, index) => (
      <Card key={index}>
        <CardFront className="card-front">
          <CardImage src={nft.visual} alt="NFT Image" />
        </CardFront>
        <CardBack className="card-back">
          <CardTitle>{nft.name}</CardTitle>
          <CardDescription>
            Artist: {nft.artist} <br /> Year: {nft.year}
            <audio controls>
              <source src={nft.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>


          </CardDescription>
        </CardBack>
      </Card>
    ))}

  </CardWrapper>
  
  </Wrapper>

  

</>


  );

}

const Wrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  
    display: grid;
    place-items: center;
    height: 100vh;
    font-family: system-ui;
    background-image: url('https://image.tmdb.org/t/p/original/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg');
    background-size: cover;
    background-position: center;

  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
`;

const Card = styled.div`
  width: 326px;
  place-items: center;
  z-index: 2;
  aspect-ratio: 50/75;
  isolation: isolate;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;

  &:hover > .card-front {
    transform: rotateY(180deg);
  }

  &:hover > .card-back {
    transform: rotateY(0deg);
    opacity: 1;
  }
`;

const CardFront = styled.div`
  aspect-ratio: inherit;
  transition: inherit;
  width: 100%;
  border-radius: 0.75rem;
  inset: 0;
  position: absolute;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.8s ease;
  z-index: 2;
`;

const CardImage = styled.img`
  max-width: 100%;
`;

const CardBack = styled.div`
  aspect-ratio: inherit;
  transition: inherit;
  width: 100%;
  border-radius: 0.75rem;
  inset: 0;
  position: absolute;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.8s ease;
  background-color: #000000cc;
  backface-visibility: hidden;
  padding: 1.5rem;
  z-index: 2;
  transform: rotateY(-180deg);
  backdrop-filter: blur(4px);
  color: white;
`;

const CardTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const CardDirector = styled.p`
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  margin-bottom: 0;
`;

const StyledAudio = styled.audio`
  width: 200px; /* Set width */
  
  background-color: #f2f2f2; /* Background color */
  border: 1px solid #ccc; /* Border */
  border-radius: 5px; /* Border radius */
  padding: 10px; /* Padding */

  

  
`;


