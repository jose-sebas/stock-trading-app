export interface DataInterface {
  id: number
  day: string
  value: number|string
}

export interface DataSet {
  label: string
  data: string|number []
  backgroundColor: string[]
  borderColor: string
  borderWidth: number
}

export interface ChartData {
  labels: Array<string>,
  datasets: Array<DataSet>
}

export interface ChartProps {
  chartData: ChartData
}