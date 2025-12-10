import { useState } from "react";

const alerts = () => {
    const [showAlert, setShowAlert] = useState(true);
    return (
        <>
        {showAlert && (
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex items-center p-4 text-amber-100 rounded-lg bg-amber-900/50 border border-amber-700" role="alert">
                    <svg className="w-5 h-5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                        <div className="ms-3 text-sm font-medium">
                        Nous avons des soucis d'emails. Veuillez nous contacter à cette adresse email. <a href="mailto:jeanpysniak@hotmail.co.uk" className="font-semibold underline hover:no-underline">jeanpysniak@hotmail.co.uk</a>.
                        </div>
                        <button 
                        type="button" 
                        onClick={() => setShowAlert(false)}
                        className="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-amber-500 p-1.5 hover:bg-amber-800 inline-flex items-center justify-center h-8 w-8" 
                        aria-label="Close"
                        >
                        <span className="sr-only">Close</span>
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                            </svg>
                    </button>
            </div>
        </div>
        )}
      </>
    );
};
export default alerts;