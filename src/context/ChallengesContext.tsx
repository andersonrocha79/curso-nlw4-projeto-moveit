import React, { createContext, useState, ReactNode, useEffect } from 'react';

import challenges from '../../challenges.json';

import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';
interface ChallengesProviderProps
{
    children : ReactNode;
    level : number;
    currentExperience : number;
    challengesCompleted : number;    
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
    completeChallenge: () => void,
    closeLevelUpModal: () => void
}

export const challengesContext = createContext({} as ChallengeContextData);

// este ...rest faz com que todas as propriedades passadas, que não sejam a 'children'
// sejam colocadas neste objeto 'rest'
export function ChallengesProvider( { children, ...rest } : ChallengesProviderProps)
{

    const [level, setLevel] = useState(rest.level ?? 1); // indica que se a propriedade não existir, utiliza 1
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

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
        completeChallenge,
        closeLevelUpModal
    };

    useEffect( () =>
    {
        Notification.requestPermission();
    }, []); // quando o segundo parametro é [], indica que será executado uma única vez

    useEffect( () =>
    {

        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExperience, challengesCompleted]); // sempre que uma das 3 variáveis for alterada, os cookies serão atualizados

    function levelUp()
    {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true); // altera para que o modal seja exibido (mudança de level) 
    }

    function closeLevelUpModal()
    {
        setIsLevelUpModalOpen(false);
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

            { isLevelUpModalOpen && <LevelUpModal /> }

        </challengesContext.Provider>

    )

}