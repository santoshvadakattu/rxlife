import {View, processColor} from 'react-native';
import React from 'react';
import {PieChart} from 'react-native-charts-wrapper';
import styles from './styles';
import {Colors} from '../../theme';
export default function PieChartFullCircle() {
  return (
    <PieChart
      style={styles.chart}
      chartBackgroundColor={processColor(Colors.transparent)}
      chartDescription={{text: ''}}
      logEnabled={true}
      data={{
        dataSets: [
          {
            values: [
              {value: 45, label: 'Sandwiches'},
              {value: 21, label: 'Salads'},
            ],
            label: 'Pie dataset',
            config: {
              colors: [processColor('#FF294F'), processColor('#0D82FF')],
              valueTextSize: 14,
              valueTextColor: processColor('white'),
              sliceSpace: 0,
              selectionShift: 0,
              valueFormatter: "#.#'%'",
              valueLineColor: processColor('green'),
              valueLinePart1Length: 0.5,
            },
          },
        ],
      }}
      legend={{
        enabled: false,
      }}
      drawEntryLabels={false}
      usePercentValues={true}
      holeRadius={0}
      centeredText={'Total'}
      transparentCircleRadius={0}
      transparentCircleColor={processColor(Colors.transparent)}
      entryLabelColor={processColor('green')}
      entryLabelTextSize={12}
      rotationEnabled={false}
      rotationAngle={45}
      centerTextRadiusPercent={100}
      maxAngle={360}
    />
  );
}
