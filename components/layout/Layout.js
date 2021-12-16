import React from 'react'
import { Header } from './Header';
import styles from "../../styles/Layout.module.css";
import Head from 'next/head';

export const Layout = ({ children }) => {
    return (
        <>
            <Head>
                {/* <html lang="es"/> */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"/>
                <title>Product Hunt Firebase y Next.js</title>
            </Head>
            <Header />
            <main className={ styles.main }>
                { children }
            </main>
        </>
    )
}
