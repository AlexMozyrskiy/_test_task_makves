import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// ----------------------------- Средние значения ---------------------------------------
const uvAvg = data.reduce((prevResult, item) => {        // среднее значение uv
  return prevResult + item.uv;
}, 0) / data.length;

const pvAvg = data.reduce((prevResult, item) => {        // среднее значение pv
  return prevResult + item.pv;
}, 0) / data.length;
// ----------------------------- / Средние значения -------------------------------------


// ------------------ Вычислим среднеарифметическое квадратов отклонений значений uv от их средней величины (дисперсию) ----------
const uvDisp = data.reduce((prevResult, item) => {
  let deviationSquares = Math.pow((item.uv - uvAvg), 2);        // квадрат отклонений каждого uv
  return deviationSquares + prevResult;

}, 0) / data.length;
// ------------------ / Вычислим среднеарифметическое квадратов отклонений значений uv от их средней величины (дисперсию) --------


// -------------------- Вычислим стандартное отклонение uv ---------------------------------------
const uvStandardDeviation = Math.sqrt(uvDisp);
// -------------------- / Вычислим стандартное отклонение uv -------------------------------------


// ------------------ Вычислим среднеарифметическое квадратов отклонений значений pv от их средней величины (дисперсию) ----------
const pvDisp = data.reduce((prevResult, item) => {
  let deviationSquares = Math.pow((item.pv - pvAvg), 2);        // квадрат отклонений каждого pv
  return deviationSquares + prevResult;

}, 0) / data.length;
// ------------------ / Вычислим среднеарифметическое квадратов отклонений значений pv от их средней величины (дисперсию) --------


// -------------------- Вычислим стандартное отклонение pv ---------------------------------------
const pvStandardDeviation = Math.sqrt(pvDisp);
// -------------------- / Вычислим стандартное отклонение pv -------------------------------------

// --------------------------- Границы за которыми окрашиваем графики ----------------------------
const topBound = uvAvg + uvStandardDeviation;         //  нам нужны значения в процентах, эти значения не в процентах, приведем их к процентам для использования в <linearGradient>
const bottomBound = uvAvg - uvStandardDeviation;

const uvArr = data.map( item => item.uv )             // новый массив из значений data.uv
// const uvMinValue = Math.min(...uvArr);                  // минимальное значение в массиве uvArr
const uvMaxValue = Math.max(...uvArr);                  // максимальное значение в массиве uvArr
// const defMaxMin = uvMaxValue - uvMinValue;            // длина диапозона по оси y
const topBoundPercentage = `${topBound * 100 / uvMaxValue}%`
const bottomBoundPercentage = `${bottomBound * 100 / uvMaxValue}%`
debugger
// --------------------------- / Границы за которыми окрашиваем графики ---------------------------

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    return (
      <ResponsiveContainer width={800} height={500}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <defs>
            <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="red" />
              <stop offset={bottomBoundPercentage} stopColor="red" />
              <stop offset={bottomBoundPercentage} stopColor="green" />
              <stop offset={topBoundPercentage} stopColor="green" />
              <stop offset={topBoundPercentage} stopColor="red" />
              <stop offset="100%" stopColor="red" />
            </linearGradient>
          </defs>

          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke='url(#colorUv)' />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
