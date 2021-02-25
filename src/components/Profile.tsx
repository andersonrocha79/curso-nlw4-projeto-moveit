import styles from '../styles/components/Profile.module.css';

export function Profile()
{

    return (

        <div className={styles.profileContainer}>

            <img src="https://github.com/andersonrocha79.png" alt="Anderson Rocha"/>

            <div>
                <strong>Anderson Rocha</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1
                </p>
            </div>

        </div>

    );

}