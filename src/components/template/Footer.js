import { BsFacebook, BsTwitter, BsInstagram, BsGithub, BsLinkedin } from "react-icons/bs";

export default function Footer() {
    return(
        <footer className="w-full flex flex-row h-24 bg-white text-gray-600 justify-between sm:px-12 lg:px-52">
            <div className="my-auto text-xl font-semibold">
                C 2022 Hyr, Inc. All rights reserved. 
            </div>
            <div className="flex flex-row my-auto text-2xl justify-between w-40">
                <BsFacebook/>
                <BsInstagram />
                <BsTwitter />
                <BsGithub />
                <BsLinkedin />
            </div>
        </footer>
        
    )
}