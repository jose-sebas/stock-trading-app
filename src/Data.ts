import { DataInterface } from "./Interfaces"

const Data: Array<DataInterface> =[]

for(let i = 50; i>=0; i--) {
  const currentDate = new Date()
  const pastDate = new Date(currentDate)
  pastDate.setDate(pastDate.getDate() - i)
  Data.push({
    id: 50 - i,
    day: pastDate.toLocaleString().split(',')[0],
    value: (600 * Math.random()) + (400 * Math.random())
  })
}
 export { Data }