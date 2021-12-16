import React from 'react'
import { Header } from './Header';
import styles from "../../styles/Layout.module.css"

export const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className={ styles.main }>
                { children }
            </main>
        </>
    )
}
