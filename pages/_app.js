import { createGlobalStyle } from "styled-components";
import { StateContext } from "@/context/StateContext";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
export const GlobalStyle = createGlobalStyle`
*{

  margin: 0;
  padding: 0;

}
`

export default function App({ Component, pageProps }) {
  return(
    
    <ThirdwebProvider
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        coinbaseWallet(),
        walletConnect(),
      ]}
      clientId="d54e8aaf1f167dbfd847c6ea03edce74"
      activeChain="binance-testnet"

    >
    
      <GlobalStyle/>
      
  
      <StateContext>
        <Component {...pageProps} />

      </StateContext>
    
      </ThirdwebProvider>


  );
}
