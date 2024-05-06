"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {

    useEffect(() => {
        Crisp.configure("0f524bbc-d32e-43b5-93de-17e3210369de");
    }, [])
    
    return null
}

export default CrispChat