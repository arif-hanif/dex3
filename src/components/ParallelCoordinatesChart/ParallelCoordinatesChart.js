import React, { useEffect, useState } from 'react';
import ParCoords from 'parcoord-es';
import * as d3 from 'd3';

import './style.css';

var green_to_blue = d3.scaleLinear().domain([ 30, 80 ]).range([ 'darkblue', 'red' ]).interpolate(d3.interpolateLab);

var color = function(d) {
	return green_to_blue(d['out:Total [EUI]']);
};

const margin = { top: 100, left: 60, bottom: 20, right: 120 };

let parcoords;

const ParallelCoordinatesChart = React.memo(
	({ data, setBrushedData, highLight, setHighLight, setResetBrush, resetBrush }) => {
		const [ chartWidth, setChartWidth ] = useState(window.innerWidth - 300);

		const chart = React.createRef();

		/*function resize() {
		const width = parseInt(d3.select('#mychart').style('width')) - margin.left - margin.right;
		const height = parseInt(d3.select('#mychart').style('height')) - margin.top - margin.bottom;

		x.rangePoints([ 0, width ], 1);

		d3.values(y).forEach(function(scale) {
			scale.range([ height, 0 ]);
		});

		svg.selectAll('.line').attr('d', path);

		g = svg.selectAll('.dimension').attr('transform', function(d) {
			return 'translate(' + x(d) + ')';
		});

		g.selectAll('.axis').call(axis.scale(y[d]));
	}*/

		const handleResize = () => setChartWidth(window.innerWidth - 300);

		useEffect(() => {
			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		});

		useEffect(
			() => {
				if (parcoords) {
					if (highLight) {
						const d = parcoords.brushed();
						if (d !== false) {
							parcoords.highlight([ d[highLight] ]);
						} else {
							parcoords.highlight([ data[highLight] ]);
						}
					} else {
						parcoords.brushReset();
					}
				}
			},
			[ highLight ]
		);

		useEffect(
			() => {
				if (resetBrush) {
					parcoords.brushReset();
					setResetBrush(false);
				}
			},
			[ resetBrush ]
		);

		useEffect(
			() => {
				parcoords = ParCoords()(chart.current).alpha(0.4);

				parcoords.on('brush', function(d) {
					setBrushedData(d);
					parcoords.unhighlight();
				});

				if (data) {
					parcoords
						.data(data)
						.color(color)
						.margin(margin)
						//.mode('queue') .composite("darker")
						.hideAxis([
							'out:Cooling [EUI]',
							'out:Heating [EUI]',
							'out:Lights/Plug [EUI]',
							'out:Fan/Pump [EUI]',
							'in:Plant Performance'
						])
						.composite('darker')
						.render()
						.shadows()
						.reorderable()
						.interactive()
						.brushMode('1D-axes'); // enable brushing
				}

				if (chart.current) {
					d3
						.select(chart.current.lastChild)
						.selectAll('text.label')
						.attr('transform', 'rotate(-20)')
						.attr('text-anchor', 'start');
				}
			},
			[ data ]
		);

		return (
			<div>
				<div
					style={{
						width: chartWidth,
						height: 560
					}}
					className="parcoords"
					ref={chart}
				/>
			</div>
		);
	}
);

export default ParallelCoordinatesChart;
