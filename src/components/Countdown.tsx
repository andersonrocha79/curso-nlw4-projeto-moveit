import { useState, useEffect, useContext } from 'react';
import { challengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout : NodeJS.Timeout;

export function Countdown()
{

    const { startNewChallenge }   = useContext(challengesContext);

    const [time, setTime]         = useState(0.10 * 60); // 6 segundos
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60); // minutos
    const seconds = time % 60; // resto da divisão

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown()
    {
        setIsActive(true);
    }

    function resetCountdown()
    {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.10 * 60);
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

        <div>

            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (

                <button 
                    disabled
                    className={styles.countdownButton}
                >
                    "Ciclo encerrado!"
                </button>

            ) : (

                <>
                
                    {  isActive ? (

                        <button 
                            type="button" 
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                            >
                            "Abandonar o ciclo"
                        </button>
        
                    ) : (
        
                        <button 
                            type="button" 
                            className={styles.countdownButton}
                            onClick={startCountdown}
                        >
                            "Iniciar o ciclo"
                        </button>            
        
                    ) }    

                </>

            ) }

        </div>

    );
}