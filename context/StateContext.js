import React, {useState, createContext, useContext} from "react";

const Context = createContext();

export const StateContext = ({children}) => {


    const [user, setUser] = useState(null);


    return (
        <Context.Provider value={{
            user, 
            setUser
            
            // add more state variables here
        
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);