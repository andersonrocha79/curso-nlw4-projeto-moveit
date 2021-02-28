import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { challengesContext } from './ChallengesContext';

interface CountdownContextData
{
    minutes         : number;
    seconds         : number;
    hasFinished     : boolean;
    isActive        : boolean;
    startCountdown  : () => void;
    resetCountdown  : () => void;
}

interface CountdownProviderProps
{
    children : ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout : NodeJS.Timeout;

export function CountdownProvider( { children } : CountdownProviderProps)
{

    const { startNewChallenge }         = useContext(challengesContext);

    const [time, setTime]               = useState(25 * 60); // 6 segundos
    const [isActive, setIsActive]       = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60); // minutos
    const seconds = time % 60; // resto da divisão    


    function startCountdown()
    {
        setIsActive(true);
    }

    function resetCountdown()
    {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);
    }

    // executa uma função sempre que o valor de 'active' ou 'time' for alterado
    useEffect( () => 
    {
        if (isActive && time > 0)
        {
            countdownTimeout = setTimeout( () => 
            {
                setTime(time-1);
            }, 
            1000);
        }
        else if (isActive && time ===0)
        {
            // o contador chegou a zero
            setHasFinished(true);
            setIsActive(false);
            // executa a função passada pelo 'contexto' para iniciar um novo 'desafio'
            startNewChallenge();
        }
    }, 
    [isActive, time]);


    return (        

        <CountdownContext.Provider value={ { minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown } }>
            {children}
        </CountdownContext.Provider>

    )

}    