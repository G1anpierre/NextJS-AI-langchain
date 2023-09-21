'use client'

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {Line} from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
}

export const ChartAnalysis = ({
  data,
}: {
  data: {mood: string; sentimentScore: number}[]
}) => {
  const labels = data.map(d => d.mood)
  const values = data.map(d => d.sentimentScore)

  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Sentiment Score',
        data: values,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }

  return <Line options={options} data={dataChart} />
}
