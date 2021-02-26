

import '../styles/global.css';

import { challengesContext, ChallengesProvider } from '../context/ChallengesContext';
import { CountdownProvider } from '../context/CountdownContext';

function MyApp({ Component, pageProps }) 
{

    return (

        <ChallengesProvider>

            <Component {...pageProps} />

        </ChallengesProvider>
        
    ) 
}

export default MyApp
