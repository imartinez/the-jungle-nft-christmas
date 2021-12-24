import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import logo from '../public/logo.png'
import { useEffect, useState } from 'react'
import { 
  Connection, 
  clusterApiUrl,
  PublicKey,
} from '@solana/web3.js';
import { 
  getParsedNftAccountsByOwner,
  createConnectionConfig
} from "@nfteyez/sol-rayz";

export default function Home() {

  const THE_JUNGLE_UPDATE_AUTH = '86Go9CeoTmRvfSo821KFjPJbrnd46eYgAxQN8sQn6EVk';

  const connect = createConnectionConfig(clusterApiUrl('mainnet-beta'));
  const [connection, setConnection] = useState('undefined');
  const [walletInitialized, setwalletInitialized] = useState(false);
  const [provider, setProvider] = useState('undefined');
  const [waiting, setWaiting] = useState(0);
  const [image, setImage] = useState('undefined');
  const [account, setAccount] = useState();

  async function connectButton() {
      const getProviderPhantom = async () => {
          if ("solana" in window) {
              const provider = window.solana;
              if (provider.isPhantom) {
                  console.log("Is Phantom installed?  ", provider.isPhantom);
                  return provider;
              }
          } else {
              window.open("https://www.phantom.app/", "_blank");
          }
      };

      let which = 'phantom';

      connection = new Connection(
        clusterApiUrl('mainnet-beta')
      );

      setConnection(connection);

      if (!walletInitialized) {
          console.log("initializing " + which);
          if (which == 'phantom') {
              provider = await getProviderPhantom();
          } else if (which == 'solflare') {
              provider = await getProviderSolflare();
          }
          if (!provider) {
            return;
          }
          provider.connect();

          provider.on("connect", async () => {              
              setProvider(provider);
              await getBalance();
              setwalletInitialized(true);
          })
          
      } else {
          console.log('already initialized wallet');
          await getBalance();
          setwalletInitialized(true);
      }
  }

  async function fetchButton() {
    setWaiting(1);           
    let res = await getNftTokenData();
    setWaiting(0);   
  }   

  const getAllNftData = async () => {
    try {
        console.log(account);
        if (!account) {
          console.log('Account not defined');
          return;
        }
        const nfts = await getParsedNftAccountsByOwner({
          publicAddress: account,          
          //publicAddress: new PublicKey('EbAmZRQCeGoJFwe3E3BwPYXgJu75LS9csWyNUnhvy8ez'),
          connection: connect,
          serialization: true,
        });
        return nfts;
    } catch (error) {
      console.log(error);
    }
  };

  const getNftTokenData = async () => {
    try {
      let nftData = await getAllNftData();
      var data = Object.keys(nftData).map((key) => nftData[key]);                                                                    let arr = [];
      let n = data.length;      
      let animal_image;
      for (let i = 0; i < n; i++) {
        if (data && data[i].updateAuthority == THE_JUNGLE_UPDATE_AUTH && data[i].data) {
          //let val = await axios.get(data[i].data.uri);
          //arr.push(val);  
          //console.log(data[i].data.uri);
          animal_image = await axios.get(data[i].data.uri);
          //console.log(animal_image.data.image);
          setImage(animal_image.data.image);
          break;
        }
      }
      if (!animal_image) {
        setImage('no_jungle');
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  async function getBalance() {    
    if (connection && provider) {
      setWaiting(1);           
      let res = await getNftTokenData();
      setWaiting(0);   
      //setBalance(balance);
    }
  }

  function renderImage() {
    if (image != 'undefined' && image != 'no_jungle'){
      return(
        <div>
        <div className={styles.window}>
        <div id={styles.christmas} style={{ background: {image} }}>
        <Image  
            src={image}
            width={320}
            height={320}
        />
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-1"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-2"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-3"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-4"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-5"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-6"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-7"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-8"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-9"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-10"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-11"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-12"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-13"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-14"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-15"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-16"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-17"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-18"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-19"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-20"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-21"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-22"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-23"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-24"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-25"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-26"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-27"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-28"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-29"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-30"]}`}></div>
        <div className={`${styles["flake"]} ${styles["large"]} ${styles["f-31"]}`}></div>
        <div className={styles.ground}></div>

        </div>

        
        </div>
        
        </div>

      );
    } else if (image != 'no_jungle') {
      return(
      <div>
        <p className={styles.description}>Get your personalized Christmas greeting!</p>
        <input onChange={e => setAccount(e.target.value)} type="text" placeholder="Paste account address holding The Jungle NFTs"/>
        <div className={account ? styles.button : styles.disabledbutton} onClick={fetchButton}>
          <a>Get my Christmas greeting!</a>
        </div>
      </div>
      )
    } else if (image == 'no_jungle') {
      return(
      <div>
      <p className={styles.description}>No animal found on the selected wallet!</p>
      <div className={styles.button}>
      <a
          href="https://magiceden.io/marketplace/the_jungle"
          target="_blank"
          rel="noopener noreferrer"
        >Adopt an animal!</a>
      </div></div>  )
    }
  }

  function renderGreeting() {
    if (image != 'undefined'){
      return(
        <div>
          <h1 className={styles.title}>Merry Christmas!</h1>
        </div>
      );
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>The Jungle Merry Christmas</title>
        <meta name="description" content="The Jungle Merry Christmas Gretting - Unofficial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>        
        <Image 
            className="hero-image"
            src={logo}            
            quality={100}
            width={334}
            height={139}
            layout="intrinsic"
          /> 

        {renderImage()}

        {renderGreeting()}        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/mart_mc_fly"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Unofficial web3 Christmas greeting, with ♥ by <b>@mart_mc_fly</b></p>
        </a>
      </footer>
    </div>
  )
}
