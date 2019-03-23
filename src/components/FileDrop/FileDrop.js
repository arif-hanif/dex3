import React, {useCallback, useMemo} from 'react';
import {useDropzone} from 'react-dropzone'
import Papa from 'papaparse';

const baseStyle = {
  width: 150,
  height: 100,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5
};

const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};

const acceptStyle = {
  borderStyle: 'solid',
  borderColor: '#00e676'
};

const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#ff1744'
};

const FileDrop = ({dataCallBack}) => {
  const onDrop = useCallback(acceptedFiles => {

    acceptedFiles.forEach(file => {
      if (file.type === "text/csv") {
        Papa.parse(file, {
          complete: function (results) {
            //console.log("Finished:", results);
            dataCallBack(results)
          },
          header: true
        })
      } else {
        // TODO ADD MODAL TO TELL USER they need upload CSV
      }
    })
  }, [])

  const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({onDrop})

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive
      ? activeStyle
      : {}),
    ...(isDragAccept
      ? acceptStyle
      : {}),
    ...(isDragReject
      ? rejectStyle
      : {})
  }), [isDragActive, isDragReject]);

  return (
    <div {...getRootProps({style})}>
      <input {...getInputProps()}/> {isDragActive
        ? <p>Drop csv file here...</p>
        : <p>Drag 'n' drop csv file here, or click to open file dialog box</p>
}
    </div>
  )
};

export default FileDrop;