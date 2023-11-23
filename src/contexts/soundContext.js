import { createContext } from "react";

const soundContext =createContext({
    currentSound: null, 
    setCurrentSound: (currentSound)=>{},
    soundPlayed: null,
    setSoundPlayed: () => {},
    isPaused: true,
    setIsPaused: () => {},
})

export default soundContext;