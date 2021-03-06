import { ResponsivePie } from '@nivo/pie';

interface PieChartElement {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface ProgressPieChartProps {
  elements: PieChartElement[];
  effectiveValue: number;
}

function CenteredMetricFactory(effectiveValue: number) {
  return function CenteredMetric(props: { centerX: number; centerY: number }) {
    const { centerX, centerY } = props;
    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ color: '#FFFFFF', fontSize: '24px' }}
      >
        {effectiveValue}%
      </text>
    );
  };
}

export default function ProgressPieChart(props: ProgressPieChartProps) {
  const { elements, effectiveValue } = props;

  const CenteredMetric = CenteredMetricFactory(effectiveValue);

  return (
    <ResponsivePie
      data={elements}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      // margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
      innerRadius={0.6}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      colors={elements.map((el) => el.color)}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      defs={[
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'wrong',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'correct',
          },
          id: 'lines',
        },
      ]}
    />
  );
}
