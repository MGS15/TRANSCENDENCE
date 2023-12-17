import Login_page_C from "./login_page_cmp"
import { useState } from 'react';

const Login_page = () => {
    const [showComponent, setShowComponent] = useState(false);

    const ClickHandler = () => {
      setShowComponent(true);
    };

    const closeModal = () => {
        setShowComponent(false);
      };
      
    return (
        <div className= "p-10">
            <button onClick={ClickHandler} className="flex gap-x-5 bg-yellow-500 text-black py-2 px-40 rounded-full shadow-2xl"> tki ndik login_page </button>
            {showComponent && <Login_page_C onClose={closeModal} />}
        </div>
    )
}

export default Login_page