import { FormEvent, useEffect, useState } from "react";

const UpdateConfession = () => {
    const [confession, setConfession] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(true);

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();

        // send post to DB
    }

    useEffect(()=> {
        // update to the database
        
    }, [])
    
    return (
        <>
            <div className=" max-w-[900px] m-auto  flex flex-col gap-6 bg-gray-50 border border-blue-100 rounded p-3">
                <div className={`flex justify-between`}>
                    <div className={`flex gap-3.5 items-center`}>
                        <img src="https://avatar.iran.liara.run/public" className={`w-14 h-14 bg-red-200 rounded-full`}
                            alt="" />
                        <div className={`flex flex-col gap-0`}>
                            <p className={`font-semibold`}>Kamal Thapaliya</p>
                        </div>
                    </div>

                </div>
                <form onSubmit={handleUpdate} className="confession-box | min-h-[400px] flex flex-col items-start gap-4">

                    <textarea id="confession" placeholder="Your updated confession here." value={confession} onChange={e => setConfession(e.target.value)} maxLength={3000} className="confession | p-4 w-full flex-grow bg-white resize-none outline-green-100 rounded-md">
                    </textarea>

                    <div className="confession-type | center-child gap-2">
                        <input type="checkbox" id="anonymous-post" checked={isAnonymous} onClick={()=> setIsAnonymous(prev => !prev)}  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"/>
                        <label htmlFor="anonymous-post" className="text-gray-700">Anonymous Post</label>
                    </div>

                    <button type="submit" className={` w-[200px] border-2 border-blue-600 ease-in-out duration-200 text-gray-700 hover:text-white font-semibold p-2 rounded hover:bg-blue-600 transition`}
                    >
                        Update
                    </button>

                </form>
            </div>
        </>
    );
};

export default UpdateConfession;