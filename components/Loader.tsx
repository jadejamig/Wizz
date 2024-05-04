import Image from "next/image"

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
        <div className="w-10 h-10 relative animate-pulse">
            <Image 
                alt="logo"
                fill
                src="/wizard.png"
                sizes="auto"
            />
        </div>
        <p className="text-sm text-muted-foreground">
            Performing some Wizz magic...
        </p>
    </div>
  )
}

export default Loader