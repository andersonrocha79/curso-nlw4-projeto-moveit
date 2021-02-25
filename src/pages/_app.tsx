

import '../styles/global.css';

import { challengesContext, ChallengesProvider } from '../context/ChallengesContext';

function MyApp({ Component, pageProps }) 
{

    return (

        <ChallengesProvider>

            <Component {...pageProps} />

        </ChallengesProvider>
        
    ) 
}

export default MyApp
