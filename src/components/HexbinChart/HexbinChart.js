import React from 'react';
import { FlexibleXYPlot, HexbinSeries, XAxis, YAxis, ChartLabel } from 'react-vis/es';
import 'react-vis/dist/style.css';

const DIMENSIONS = [ 'displacement (cc)', 'power (hp)' ];

const HexbinChart = React.memo(({ DATA }) => {
	const data = DATA.map((d) => ({
		x: Number(d[DIMENSIONS[0]]),
		y: Number(d[DIMENSIONS[1]])
	}));

	return (
		<FlexibleXYPlot margin={50}>
			<HexbinSeries
				animation
				sizeHexagonsWithCount
				className="hexbin-size-example"
				radius={10}
				colorRange={[ 'blue', 'red' ]}
				style={{
					stroke: '#125C77',
					strokeLinejoin: 'round'
				}}
				data={data}
			/>
			<XAxis />
			<YAxis />
			<ChartLabel
				text={DIMENSIONS[0]}
				className="alt-x-label"
				xPercent={0.9}
				yPercent={0.75}
				style={{
					textAnchor: 'end',
					transform: 'rotate(0)'
				}}
			/>

			<ChartLabel
				text={DIMENSIONS[1]}
				className="alt-y-label"
				xPercent={0.1}
				yPercent={0.0}
				style={{
					textAnchor: 'start'
				}}
			/>
		</FlexibleXYPlot>
	);
});

export default HexbinChart;
