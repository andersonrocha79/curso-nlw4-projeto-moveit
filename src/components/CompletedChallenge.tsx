import { useContext } from 'react';
import { challengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/CompletedChallenge.module.css'

export function CompletedChallenge()
{

    const { challengesCompleted } = useContext(challengesContext);

    return (

        <div className={styles.CompletedChallengeContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>

    );
}