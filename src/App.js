import React, {useEffect, useState} from 'react';
import Grid from 'styled-components-grid';

import {ParallelCoordinatesChart} from './components/ParallelCoordinatesChart';
import {Table} from './components/Table';
import {HexbinChart} from './components/HexbinChart';
import {FileDrop} from './components/FileDrop';

const originaldata = [{A: 1, B: 2}, {A: 3, B: 4}, {A: 1, B: 3}, {A: 3, B: 4}];

const App = () => {
  const [data, setData] = useState(null);
  const [highlightedData, setHighlightedData] = useState(null);

  useEffect(()=>{
    setData(originaldata)
    setHighlightedData(originaldata)
  }, [data])

  console.log(highlightedData)



  return(
      <Grid halign="justify-center">
        <Grid.Unit size={0.1}>
          <FileDrop/>
        </Grid.Unit>
        <Grid.Unit size={0.9}>
          <ParallelCoordinatesChart data={data} setHighlightedData={setHighlightedData} shadows />
        </Grid.Unit>
        <Grid.Unit size={0.75}>
          <Table />
        </Grid.Unit>
        <Grid.Unit size={0.25}>
          <HexbinChart/>
        </Grid.Unit>
      </Grid>
  )
};

export default App;
