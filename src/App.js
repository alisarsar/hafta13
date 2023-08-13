import "./style.css"
import useInternetKontrol from "./useInternetKontrol";

function App() {
  const baglanti = useInternetKontrol()

  return (
    <>
      <p>Merhaba</p>
      {baglanti? "" : <div id="internet-durum">İnternet kesik</div> }
    </>
  );
}

export default App;
