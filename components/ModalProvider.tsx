"use client";

import React, { useEffect, useState } from 'react'
import ProModal from '@/components/ProModal';

const ModalProvider = () => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted)
        return null;

    return (
        <>
            <ProModal />
        </>
    )
}

export default ModalProvider