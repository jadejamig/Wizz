"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

interface CrispChatProps {
    crisp_id: string
}
const CrispChat = ({ crisp_id }: CrispChatProps) => {

    useEffect(() => {
        Crisp.configure(crisp_id);
    }, [crisp_id])
    
    return null
}

export default CrispChat