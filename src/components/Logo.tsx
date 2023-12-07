import React from "react"
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"

interface LogoProps { }

const Logo: React.FC<LogoProps> = () => {
    return <Link to="/" className="text-center flex justify-center text-gray-800">
        <div className="flex">
            <h2 className="font-bold leading-8 italic text-3xl">Target</h2>
            <ViewfinderCircleIcon className="h-6 w-6 ml-1" />
        </div>
    </Link>
}
export default Logo;