import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function SimpleBarChart() {
  const data = {
    labels: ['', '', ''],
    datasets: [
      {
        data: [0, 0, 0],
      },
    ],
  };

 const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
        drawBorder: true,
      },
      title: {
        display: true,
        text: 'Courses',
        font: {
          size: 10,
          weight: 'bold',
        },
        color: '#000', 
      },
    },
    y: {
      min: 0,
      max: 800,
      ticks: {
        callback: (value) => {
          return [200, 500, 700].includes(value) ? value : '';
        },
        font: {
          size: 8,
        },
      },
      grid: {
        drawBorder: true,
        color: (context) => {
          const value = context.tick.value;
          return [200, 500, 700].includes(value) ? '#ccc' : 'transparent';
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};


  return (
    <div style={{ width: '100%', height: '150px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default SimpleBarChart;

