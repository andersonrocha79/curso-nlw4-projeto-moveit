import Head from 'next/head';

import { GetServerSideProps } from 'next';

import { CompletedChallenge } from '../components/CompletedChallenge';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../context/CountdownContext';
import { ChallengesProvider } from '../context/ChallengesContext';

// - criando o projeto
// yarn create react-app moveit --template typescript

// para bibliotecas 'js' que não tem as tipagens para typescript
// como o cookie, é possível buscar os 'types' para utilização
// yarn add @types/js-cookie -D
// repositório: https://github.com/DefinitelyTyped/DefinitelyTyped

// instalando a 'vercel cli' 
// npm i -g vercel

interface HomeProps
{
    level : number;
    currentExperience : number;
    challengesCompleted : number;
}

export default function Home(props : HomeProps) 
{

  return (

    <ChallengesProvider level={props.level}
                        currentExperience={props.currentExperience}
                        challengesCompleted={props.challengesCompleted}>

        <div className={styles.container}>

            <Head>
                <title>Início | move.it</title>
            </Head>

            <ExperienceBar />

            <CountdownProvider>

                <section>

                    <div>
                        <Profile />
                        <CompletedChallenge />
                        <Countdown />
                    </div>

                    <div>
                        <ChallengeBox />
                    </div>

                </section>

            </CountdownProvider>

        </div>

    </ChallengesProvider>

  )

}

export const getServerSideProps : GetServerSideProps = async (ctx) =>
{

    // são informações utilizadas pela 
    // página que o 'next' irá utilizar para
    // montar a página no servidor para já enviar para o client 'preenchidas'
    // tudo que é feito nesta função será executada no servidor, e não no client

    // busca as informações do cookie da aplicação
    const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

    return { 
        
        props : {
                    level : Number(level), 
                    currentExperience : Number(currentExperience),  
                    challengesCompleted : Number(challengesCompleted)
                }
    }

}
