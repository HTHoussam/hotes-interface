import { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import './pdf-dropzone.css';
const FILE_SIZE_LIMIT_MB = 3;
const FILE_UPLOAD_ERROR = `Please upload a PDF file that is less than ${FILE_SIZE_LIMIT_MB}MB.`;

const PdfDropzone = ({ setValue }: { setValue: any }) => {
  const [uploadedFiles, setUploadedFiles] = useState(undefined);
  const [invalidFileUploadError, setInvalidFileUploadError] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const onFileDrop = useCallback((acceptedFiles: Array<File>, fileRejections: Array<FileRejection>) => {
    if (fileRejections.length === 0) {
      setInvalidFileUploadError('');
      console.log('accepteFiles', acceptedFiles[0]);
      setUploadedFiles(acceptedFiles[0]);
      setUploadedFileName(acceptedFiles[0].name);
      // setValue('file', acceptedFiles[0], {
      //   shouldDirty: true,
      // });
    } else {
      setInvalidFileUploadError(FILE_UPLOAD_ERROR);
    }
  }, []);
  console.log('invalidFileUploadError', invalidFileUploadError);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });
  console.log('uploadedFileName', uploadedFileName);
  return (
    <div className="upload-container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the file here</p> : <p>Drag and drop file here or click to browse</p>}
      </div>

      {uploadedFileName.length > 0 && <div className="file-list">{<ul>{uploadedFileName}</ul>}</div>}
    </div>
  );
};

export default PdfDropzone;
