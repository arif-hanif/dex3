import React from 'react';
import { HotTable } from '@handsontable/react';

import 'handsontable/dist/handsontable.full.css';
import './style.css';

const Table = React.memo(({ setHighlight, data, columns, columnHeaders }) => {
	const table = React.createRef();

	console.log('table render');

	return (
		<HotTable
			ref={table}
			height={400}
			columnSorting
			colHeaders={columnHeaders}
			afterSelection={(row, col) => {
				setHighlight(table.current.hotInstance.toPhysicalRow(row));
			}}
			stretchH="all"
			data={data}
			currentRowClassName="currentRow"
			rowHeaders
			licenseKey="non-commercial-and-evaluation"
		/>
	);
});

export default Table;
