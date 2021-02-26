import { createContext, useState, ReactNode, useEffect } from 'react';

import challenges from '../../challenges.json';

interface ChallengesProviderProps
{
    children : ReactNode
}

interface ChallengesProvider
{
    type : 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengeContextData
{
    level : number,
    currentExperience : number,
    challengesCompleted : number,
    activeChallenge : ChallengesProvider,
    experienceToNextLevel : number,
    levelUp : () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void
}

export const challengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider( { children } : ChallengesProviderProps)
{

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    // variáveis de contexto que serão
    // compartilhadas pelos componentes
    let contexto = 
    {         
        level, 
        currentExperience, 
        challengesCompleted, 
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge
    };

    useEffect( () =>
    {
        Notification.requestPermission();
    }, []); // quando o segundo parametro é [], indica que será executado uma única vez

    function levelUp()
    {
        setLevel(level + 1);
    }

    function startNewChallenge()
    {

        // gera um número aleatório para seleção de um desafio
        const randonChallengesIndex = Math.floor(Math.random() * challenges.length);
        
        // carrega o desafio
        const challenge = challenges[randonChallengesIndex];

        // coloca o desafio no contexto para compartilhamento
        setActiveChallenge(challenge);

        // toca um áudio para a notificação
        new Audio('/notification.mp3').play();

        // verifica se tem permissões
        // https://developer.mozilla.org/pt-BR/docs/Web/API/Notification
        if (Notification.permission === 'granted')
        {
            new Notification('Novo Desafio!', 
            {
                body: `Valendo ${challenge.amount} XP!`
            })
        }

    }

    function resetChallenge()
    {
        setActiveChallenge(null);
    }

    function completeChallenge()
    {

        if (!completeChallenge)
        {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel)
        {            
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);

        setActiveChallenge(null);

        setChallengesCompleted(challengesCompleted+1);

    }

    return (        

        <challengesContext.Provider value={ contexto }>
            {children}
        </challengesContext.Provider>

    )

}