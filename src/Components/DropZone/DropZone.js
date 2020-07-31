import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useStyles } from "./DropZoneStyles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

export default function MyDropZone({ setBase64 }) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          setBase64(reader.result);
        };
      });

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setBase64]
  );

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div style={{ width: "200px" }}>
        <img style={{ width: "200px" }} src={file.preview} />
      </div>
    </div>
  ));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",

    onDrop,
  });

  return (
    <div className={classes.dropZone} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className={classes.textContainer}>
          <p>Drop the files here ...</p>
        </div>
      ) : (
        <div className={classes.textContainer}>
          <CloudUploadIcon style={{ fontSize: "60px" }} color="disabled" />
          <p>Drag 'n' drop files here, or click to select files</p>
        </div>
      )}

      <div>{thumbs}</div>
    </div>
  );
}
