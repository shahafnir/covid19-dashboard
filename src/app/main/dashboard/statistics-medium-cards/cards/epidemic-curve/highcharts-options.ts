import * as Highcharts from 'highcharts/highstock';

export function getChartOptions(
  newPositiveData,
  newRecoveringData,
  cumulativePositiveData
): Highcharts.Options {
  return {
    chart: {
      styledMode: true,
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
    yAxis: [
      {
        title: {
          text: 'מספר מקרים חדשים',
          margin: 10,
        },

        crosshair: {
          className: 'no-ycross',
          label: {
            enabled: false,
          },
        },
      },
      {
        opposite: true,
        title: {
          text: 'מספר מאומתים מצטבר',
          margin: 10,
        },
      },
    ],

    tooltip: {
      useHTML: true,
      formatter: function () {
        return `${this.y} ${this.series.name}`;
      },
      followPointer: true,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        yAxis: 0,
        type: 'column',
        name: 'מאומתים חדשים',
        data: newPositiveData,
      },
      {
        yAxis: 0,
        type: 'column',
        name: 'מחלימים חדשים',
        data: newRecoveringData,
      },
      {
        yAxis: 1,
        type: 'area',
        name: 'מאומתים מצטבר',
        data: cumulativePositiveData,
        zIndex: -1,
      },
    ],
  };
}
