import { useState } from 'react'
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react'
import './App.css'

export default function App() {
  const userAddress = useTonAddress()
  const [amount, setAmount] = useState('1')
  const [loading, setLoading] = useState(false)

  const handleSwap = async () => {
    if (!userAddress) {
      alert('Будь ласка, підключіть кошелек через TON Connect!')
      return
    }
    setLoading(true)
    try {
      alert(`Транзакція обміну ${amount} TON сформована!`)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <h2>💎 TON Swap App</h2>
        <TonConnectButton />
      </header>

      <div className="swap-card">
        <h3>Обмін токенів</h3>
        
        <div className="input-box">
          <label>Ви віддаєте (TON):</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="0.0"
          />
        </div>

        <div className="input-box">
          <label>Отримуєте (примерно USDT):</label>
          <input 
            type="text" 
            value={amount ? (parseFloat(amount) * 5.2).toFixed(2) : '0'} 
            disabled 
          />
        </div>

        <button className="swap-button" onClick={handleSwap} disabled={loading}>
          {loading ? 'Обробка...' : 'Обміняти через STON.fi'}
        </button>
      </div>
    </div>
  )
}