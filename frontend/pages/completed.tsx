import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Link from '@mui/material/Link';

const Completed: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <h1 className={styles.title}>
                Congratulations, your swag request has been sent to <a href="https://www.stackbuilders.com/">Stackbuilders</a>. Please check your email inbox for confirmation
            </h1>
            <Link href="/">Go Back To Homepage</Link>
        </div>
    )
}

export default Completed;
