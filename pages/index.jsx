import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

import MatchView from '../components/MatchView';
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <MatchView/>
      <MatchView/>
    </div>
  )
}
