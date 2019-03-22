import React, {useEffect} from 'react';
import ParCoords from 'parcoord-es';

import './style.css';

let parcoords;

const ParallelCoordinatesChart = React.memo(({ data, setHighlightedData, shadows }) => {
	const chart = React.createRef();

	console.log(data)
	useEffect(() => {
		parcoords = ParCoords()(chart.current).alpha(0.4);
		//.color(color); update grid on brush
		parcoords.on('brush', function(d) {
			//setTableData(d); Reset highlights to nothing
			//parcoords.unhighlight();
      setHighlightedData(d)
		});

		if(data){
		  parcoords
			.data(data)
			.margin({ top: 50, left: 60, bottom: 20, right: 60 })
			//.mode('queue')
			//.hideAxis(hiddenAxis) .composite('darker')
			.render()
      .shadows()
			.reorderable()
			.interactive()
			.brushMode('1D-axes'); // enable brushing
      if(shadows){
        parcoords.shadows().render();
      }
    }
	}, [data]);

	console.log('paracoord render')

	return (
		<div>
			<div
				style={{
					width: window.innerWidth,
					height: 400
				}}
				className="parcoords"
				ref={chart}
			/>
		</div>
	);
});

export default ParallelCoordinatesChart;