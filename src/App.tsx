import './App.css'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import React, { useCallback, useMemo, useState } from "react";
import { Data } from './Data'
import LineChart from './components/LineChart';
import { DataInterface } from './Interfaces';

Chart.register(CategoryScale);

const App: React.FC = () => {

  const [initialData, setInitialData] = useState<DataInterface[]>(Data)
  const [lastValue, setLastValue] = useState<number|string>(Data[Data.length-1]?.value ?? 0)
  const [cashBalance, setCashBalance] = useState<number>(10000)
  const [sharesHeld, setSharesHeld] = useState<number>(0)

  const chartData = useMemo(() => {
    return {
      labels: initialData.map((data:any) => data.day), 
      datasets: [
        {
          label: "Stock's price",
          data: initialData.map((data:any) => data.value),
          backgroundColor: initialData.map(() => `rgba(${75 * Math.random()},${100 * Math.random()}, ${192 * Math.random()},1)`),
          borderColor: "black",
          borderWidth: 1,
        }
      ]
    }
  }, [initialData])

 
  const handleOnChange = useCallback((e: any): void => {
    setLastValue(e.target.value)
  }, [lastValue])

  const handleUpdatePrice = useCallback(():void => {
    setInitialData(oldData => [...oldData, {id:oldData.length, day:  (new Date).toLocaleString().split(',')[0], value: lastValue}])
    
  }, [initialData, lastValue, chartData])

  const handleBuy = useCallback(():void => {
    setCashBalance(oldVal => oldVal - Number(lastValue))
    setSharesHeld(oldVal => oldVal + 1)
  },[lastValue])

  const handleSell = useCallback(():void => {
    setCashBalance(oldVal => oldVal + Number(lastValue))
    setSharesHeld(oldVal => oldVal - 1)
  }, [lastValue])

  return (
    <div className="App">
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <div>
          <h2>Current price: </h2> 
          <input defaultValue={lastValue} onChange={handleOnChange}></input> <button onClick={handleUpdatePrice}>Update price</button>
        </div>
        <div>
          <h2>User's cash balance: {cashBalance}</h2>
          <button onClick={handleBuy} disabled={cashBalance < Number(lastValue)}>Buy</button>
          <button onClick={handleSell} disabled={sharesHeld === 0}>Sell</button>
          <h3>User's shares held: {sharesHeld}</h3>
        </div>
      </div>
      
     <LineChart chartData={chartData} />
  </div>
  )
}

export default App
