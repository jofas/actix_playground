import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { invoke } from '@tauri-apps/api/tauri'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    invoke('graphql', { query: "{projects}" })
      .then((projects) => {
        setProjects(projects);
      })
      .catch((e) => {
        // bad workaround for broken webkit inspector
        setProjects(e);
      })
  })

  return (
    <>
      <main className={styles.main}>
        <h1>Example Tauri App</h1>
        <p>
          projects: { JSON.stringify(projects) }
        </p>
      </main>
    </>
  )
}
