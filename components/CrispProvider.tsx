import CrispChat from "@/components/CrispChat";

const CrispProvider = () => {
    const CRISP_WEBSITE_ID = process.env.CRISP_WEBSITE_ID

    if (!CRISP_WEBSITE_ID)
        return null
    
    return (
        <CrispChat crisp_id={CRISP_WEBSITE_ID}/>
    )
}

export default CrispProvider