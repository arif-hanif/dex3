import React, { useEffect, useState, Fragment } from 'react';
import Papa from 'papaparse';

import { ParallelCoordinatesChart } from './components/ParallelCoordinatesChart';
import { Table } from './components/Table';
import { HexbinChart } from './components/HexbinChart';
//import { FileDrop } from './components/FileDrop';

const App = React.memo(() => {
	const [ resetBrush, setResetBrush ] = useState(false);
	const [ data, setData ] = useState(null);
	const [ brushedData, setBrushedData ] = useState(null);
	const [ highLight, setHighLight ] = useState(null);
	//console.log(highLight)

	useEffect(() => {
		Papa.parse('https://dex-3.herokuapp.com/csv/cars.csv', {
			download: true,
			complete: function(results) {
				//console.log('Finished:', results);
				setData(results);
			},
			header: true
		});
	}, []);

	console.log(resetBrush);

	return (
		<Fragment>
			{data && (
				<Fragment>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<div
							style={{
								border: '1px solid #D3D3D3',
								borderRadius: '5px',
								font: '26px sans-serif',
								fontWeight: 900,
								flex: 0.75,
								marginLeft: '40px',
								padding: '20px'
							}}
						>
							{`${brushedData ? brushedData.length : data.data.length} / ${data.data.length} selected`}
							<br />
							<button>Settings</button>
							<br />
							<button onClick={() => setResetBrush(true)}>Reset</button>
							<br />
							<button onClick={() => setHighLight(null)}>Clear Highlight</button>
						</div>
						<div
							style={{
								border: '1px solid #D3D3D3',
								borderRadius: '5px',
								flex: 3,
								marginLeft: '20px',
								padding: '20px',
								marginRight: '40px'
							}}
						>
							<ParallelCoordinatesChart
								resetBrush={resetBrush}
								setResetBrush={setResetBrush}
								highLight={highLight}
								data={data.data}
								brushedData={brushedData}
								setBrushedData={setBrushedData}
								setHighLight={setHighLight}
							/>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<div
							style={{
								border: '1px solid #D3D3D3',
								borderRadius: '5px',
								flex: 2,
								marginTop: '20px',
								marginLeft: '40px'
							}}
						>
							<Table
								data={brushedData ? brushedData : data.data}
								columnHeaders={data.meta.fields}
								setHighlight={setHighLight}
							/>
						</div>
						<div
							style={{
								border: '1px solid #D3D3D3',
								borderRadius: '5px',
								flex: 1,
								marginTop: '20px',
								marginLeft: '20px',
								marginRight: '40px'
							}}
						>
							<HexbinChart DATA={brushedData ? brushedData : data.data} />
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
});

export default App;
