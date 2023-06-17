import axios from "axios"
import { useEffect, useState } from "react"
import {Coin} from "./Coin"
import "./App.css"

function App() {

  const [listOfCoins, setListOfCoins] = useState([])
  const [searchWord, setSearchWord] = useState("")

  const url = "https://api.coinstats.app/public/v1/coins?skip=0"

  useEffect(() => {
    axios.get(url).then(
      (response) => {
        setListOfCoins(response.data.coins)
      }
    )
  }, [])

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase())
  })

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input 
          type="text"
          placeholder="search by coin name"
          onChange={(event) => {
            setSearchWord(event.target.value)
          }}
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin 
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
