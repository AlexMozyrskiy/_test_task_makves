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

// --------------------------- Границы за которыми окрашиваем график для uv ----------------------------
const uvBottomBound = Math.round(uvAvg - uvStandardDeviation);           //  нам нужны значения в процентах, эти значения не в процентах, приведем их к процентам для использования в <linearGradient>
const uvTopBound = Math.round(uvAvg + uvStandardDeviation);

const uvArr = data.map( item => item.uv )               // новый массив из значений data.uv
const uvMaxValue = Math.max(...uvArr);                  // максимальное значение в массиве uvArr
const uvMinValue = Math.min(...uvArr);                  // минимальное значение в массиве uvArr
const uvDef = uvMaxValue - uvMinValue;
const uvBottomBoundPercentage = `${(100 - (uvTopBound - uvMinValue) * 100 / uvDef)}%`       // значения в процентах
const uvTopBoundPercentage = `${(100 - (uvBottomBound - uvMinValue) * 100 / uvDef)}%`
// --------------------------- / Границы за которыми окрашиваем графики для uv ---------------------------


// --------------------------- Границы за которыми окрашиваем график для pv ----------------------------
const pvBottomBound = Math.round(pvAvg - pvStandardDeviation);           //  нам нужны значения в процентах, эти значения не в процентах, приведем их к процентам для использования в <linearGradient>
const pvTopBound = Math.round(pvAvg + pvStandardDeviation);

const pvArr = data.map( item => item.pv )               // новый массив из значений data.pv
const pvMaxValue = Math.max(...pvArr);                  // максимальное значение в массиве pvArr
const pvMinValue = Math.min(...pvArr);                  // минимальное значение в массиве pvArr
const pvDef = pvMaxValue - pvMinValue;
const pvBottomBoundPercentage = `${(100 - (pvTopBound - pvMinValue) * 100 / pvDef)}%`
const pvTopBoundPercentage  = `${(100 - (pvBottomBound - pvMinValue) * 100 / pvDef)}%`
// --------------------------- / Границы за которыми окрашиваем графики для pv ---------------------------


// ---------------------- Для отображения линии uvTopBound и uvMaxValue пушим в массив data ------------------
for(let e of data) {
  e.uvTopBound = uvTopBound;
  e.uvBottomBound = uvBottomBound;
  e.pvTopBound = pvTopBound;
  e.pvBottomBound = pvBottomBound;
}
// ---------------------- / Для отображения линии uvTopBound и uvMaxValue пушим в массив data ----------------

export default class Example extends PureComponent {

  render() {
    return (
      <>
      <h2 style={{marginLeft: "20px"}}>Спасибо компании "Маквес Групп" за интересное тестовое задание=)</h2>
      <h3 style={{marginLeft: "20px"}}>Задание: Модифицировать пример <a href="http://recharts.org/en-US/examples/SimpleLineChart">http://recharts.org/en-US/examples/SimpleLineChart</a>&nbsp;
          Чтобы все участки графиков значение y которых не входят в интервал (avg-stddev, avg+stddev) были подкрашены красным цветом.
          Где avg - среднее значение
          stddev - среднеквадратичное отклонение.</h3>
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
            <linearGradient id="uvLineColor" x1="0%" y1="0%" x2="0%" y2="1">
              <stop offset="0%" stopColor="red" />
              <stop offset={uvBottomBoundPercentage} stopColor="red" />
              <stop offset={uvBottomBoundPercentage} stopColor="green" />
              <stop offset={uvTopBoundPercentage} stopColor="green" />
              <stop offset={uvTopBoundPercentage} stopColor="red" />
              <stop offset="100%" stopColor="red" />
            </linearGradient>
          </defs>

          <defs>
            <linearGradient id="pvLineColor" x1="0%" y1="0%" x2="0%" y2="1">
              <stop offset="0%" stopColor="red" />
              <stop offset={pvBottomBoundPercentage} stopColor="red" />
              <stop offset={pvBottomBoundPercentage} stopColor="blue" />
              <stop offset={pvTopBoundPercentage} stopColor="blue" />
              <stop offset={pvTopBoundPercentage} stopColor="red" />
              <stop offset="100%" stopColor="red" />
            </linearGradient>
          </defs>

          <Line type="monotone" dataKey="pv" stroke="url(#pvLineColor)" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke='url(#uvLineColor)' />
          <Line type="monotone" dataKey="uvTopBound" stroke='green' strokeDasharray="3 3" dot={false} />
          <Line type="monotone" dataKey="uvBottomBound" stroke='green' strokeDasharray="3 3" dot={false} />
          <Line type="monotone" dataKey="pvTopBound" stroke='blue' strokeDasharray="3 3" dot={false} />
          <Line type="monotone" dataKey="pvBottomBound" stroke='blue' strokeDasharray="3 3" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      </ >
    );
  }
}
