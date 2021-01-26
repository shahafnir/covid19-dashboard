import * as Highcharts from 'highcharts/highstock';

export function getChartOptions(
  severePatientsdata,
  breathalysedPatientsdata
): Highcharts.Options {
  return {
    chart: {
      styledMode: true,
      events: {
        load: function () {
          const chart = this;
          chart.series[0].setData(severePatientsdata);
          chart.series[1].setData(breathalysedPatientsdata);
        },
      },
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 3,
          states: {
            hover: {
              radiusPlus: 3,
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
        className: 'xcross',
        label: {
          enabled: false,
        },
      },
      showFirstLabel: true,
      tickWidth: 0,
    },
    yAxis: {
      title: {
        text: 'מספר מקרים',
        margin: 20,
      },
      crosshair: {
        className: 'no-ycross',
        label: {
          enabled: false,
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
        className: 'severe-patients-serie',
        type: 'line',
        name: 'חולים קשה',
        data: severePatientsdata,
        dataLabels: {
          enabled: false,
        },
        marker: {
          symbol: 'circle',
        },
      },
      {
        className: 'breathalysed-patients-serie',
        type: 'line',
        name: 'מונשמים',
        data: breathalysedPatientsdata,
        dataLabels: {
          enabled: false,
        },
        marker: {
          symbol: 'circle',
        },
      },
    ],
  };
}
