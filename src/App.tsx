import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import Header from './components/Header/Header'
import Encounters from './components/Encounters/Encounters'
import KOChart from './components/KOChart/KOChart';
// import Footer from './components/Footer/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <KOChart />
      <Encounters />
      {/* <Footer /> */}
    </>
  )
}

export default App
