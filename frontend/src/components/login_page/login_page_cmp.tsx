import karontdo from "./42.png"

  const Login_page_C: React.FC<{ onClose: () => void }> = ({ onClose }) => {

    const  KarontdoIntra = async () => {
        console.log("zabb")
        await fetch(`http://localhost:3001/auth/intra/login`, {method: "GET"}, )
        //console.log(res)
      };


    return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">

        <div className="bg-white p-6 rounded-lg shadow-xl">

            <div className="b-50 m-32 mx-auto max-w-[1199px] flex">

                <div className="w-[45%]">
                    <img src={karontdo}  className="w-[345px]"></img>
                </div>

                <div className="border-solid flex flex-col justify-center text-center gap-y-10">
                    <p className="font-bold text-3xl">Sign in, and let the games begin!</p>
                    <p className="font-bold text-1xl ">Ping-pong pal! It's been a 
                        minute, huh
                        Recall the pixel paddle days? Get ready for a nostalgia
                        wave your fave ping-pong platform beckons!</p>
                        <div className=" mt-32 flex justify-center align-center">
                            <button onClick={KarontdoIntra} className="flex gap-x-5 bg-yellow-500 text-black py-2 px-40 rounded-full shadow-2xl">
                            <img src={karontdo}  className="w-[30px]"></img>
                                NETWORK</button>
                        </div>
                </div>

            </div>

            <button onClick={onClose} className="bg-yellow-500 text-black py-2 px-5 rounded-full shadow-2xl"> Close </button>
        </div>

    </div>
    )
}

export default Login_page_C