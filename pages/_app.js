import '../styles/base/globals.css';
import "../styles/base/variables.css";
import "../styles/base/boton.css"
import { FirebaseFn } from "../firebase/context";

function MyApp({ Component, pageProps }) {
  
    
  return (
    <FirebaseFn>
      <Component {...pageProps} />
    </FirebaseFn>
  )
}

export default MyApp
