import * as Highcharts from 'highcharts/highstock';

export function getChartOptions(data): Highcharts.Options {
  return {
    chart: {
      styledMode: true,
      events: {
        load: function () {
          const chart = this;
          chart.series[0].setData(data);
        },
      },
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 2,
          states: {
            hover: {
              radiusPlus: 0,
            },
          },
        },
      },
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function () {
          return `${new Date(this.value).getDate()}.${
            new Date(this.value).getMonth() + 1
          }`;
        },
      },
      crosshair: {
        className: 'no-xcross',
        label: {
          enabled: false,
        },
      },
      showFirstLabel: true,
      tickInterval: 24 * 3600 * 1000,
      tickWidth: 0,
    },
    yAxis: {
      title: {
        text: 'אחוז שינוי יומי',
        margin: 20,
      },
      crosshair: {
        className: 'no-ycross',
        label: {
          enabled: false,
        },
      },
    },
    tooltip: {},
    legend: {
      enabled: false,
    },
    series: [
      {
        type: 'area',
        name: 'נפטרים',
        data: data,
        point: {
          events: {
            mouseOver: function () {},
          },
        },
        dataLabels: {
          className: 'data-labels',
          enabled: true,
          useHTML: true,
          formatter: function () {
            const numberOfDaysToDoubleTheInfected = this.y < 0 ? 'דעיכה' : '86';
            return `<div>${this.y}%</div><div class="daysToDouble"> (${numberOfDaysToDoubleTheInfected})</div>`;
          },
        },
      },
    ],
  };
}
