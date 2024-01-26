export default function Error_Comnp() {
    return (
        <div className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
            <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-yellow-300 font-pixelify ">404</p>
                <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-yellow-500 mt-4 animate-pulse font-pixelify">Page Not Found</p>
                <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center font-pixelify">Sorry, the page you are looking for could not be found.</p>
                <button className="font-pixelify flex md:gap-x-5 border-solid bg-buttonColor text-black border-black shadow-[2px_4px_0px_0px_#000301] border-2 justify-center items-center w-[90%] sm:w-[55%] md:w-[50%] lg:w-[65%] sm:gap-x-2 p-2">Return Home</button>
            </div>
        </div>
    );
}