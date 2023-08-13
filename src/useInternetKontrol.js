import { useState, useEffect } from "react";

function useInternetKontrol() {
    const [baglanti, baglantiGuncelle] = useState(window.navigator.onLine)

    function durumDegistir() {
        baglantiGuncelle(window.navigator.onLine)
    }

    useEffect(() => {
        window.addEventListener("offline", durumDegistir )
        window.addEventListener("online", durumDegistir )

        return ()=>{
            window.removeEventListener("offline", durumDegistir)
            window.removeEventListener("online", durumDegistir)
        }
    }, [])

    return baglanti
}

export default useInternetKontrol