import * as Highcharts from 'highcharts/highstock';

export function getChartOptions(data): Highcharts.Options {
  return {
    chart: {
      styledMode: true,
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'תאריך',
      },
      labels: {
        formatter: function () {
          return `${new Date(this.value).getDate()}.${
            new Date(this.value).getMonth() + 1
          }`;
        },
      },
      crosshair: {
        className: 'xcross',
        snap: false,
        label: {
          enabled: true,
          padding: 3,
          formatter: function (value) {
            return Highcharts.dateFormat('%e.%m', value);
          },
        },
      },
      startOnTick: true,
      tickInterval: 5 * 24 * 3600 * 1000,
      tickWidth: 0,
    },
    yAxis: {
      title: {
        text: 'כמות מונשמים',
        margin: 20,
      },
      crosshair: {
        className: 'ycross',
        snap: false,
        label: {
          enabled: true,
          padding: 3,
          formatter: function (value) {
            return Math.floor(value) + '';
          },
        },
      },
    },
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
        type: 'area',
        name: 'מונשמים',
        data: data,
      },
    ],
  };
}
