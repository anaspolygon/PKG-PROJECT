"use client";

import React, { FC, useCallback, useState, ChangeEvent } from "react";
import {
  File,
  FileText,
  Image,
  Loader2,
  FileText as PdfIcon,
  Upload,
} from "lucide-react";

interface FileUploadDropzoneProps {
  onLoad?: (file: File) => void;
  uploadFileToServer: () => void;
  loading: boolean;
  maxSizeMB?: number;
}

const bytes = (mb: number) => mb * 1024 * 1024;

const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <PdfIcon className="text-red-500" size={20} />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <Image className="text-blue-500" size={20} />;
    case "txt":
      return <FileText className="text-gray-700" size={20} />;
    case "xls":
    case "xlsx":
      return <FileText className="text-green-500" size={20} />; // Excel
    default:
      return <File className="text-gray-400" size={20} />;
  }
};

const FileUpload: FC<FileUploadDropzoneProps> = ({
  onLoad,
  uploadFileToServer,
  loading,
  maxSizeMB = 50,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      if (!file) return;

      if (file.size > bytes(maxSizeMB)) {
        setError(`File is too large. Max ${maxSizeMB} MB.`);
        return;
      }

      setFileName(file.name);
      onLoad?.(file);
    },
    [maxSizeMB, onLoad]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setDragActive(false);
      const files = e.dataTransfer.files;
      if (files && files[0]) handleFile(files[0]);
    },
    [handleFile]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) handleFile(files[0]);
      e.currentTarget.value = ""; // reset input
    },
    [handleFile]
  );

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDrop={onDrop}
        className={`border-1 rounded-lg p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-shadow h-48 ${
          dragActive
            ? "shadow-lg border-blue-500"
            : "border-dashed border-red-500"
        }`}
      >
        <input type="file" onChange={onChange} className="hidden" aria-hidden />

        <div className="text-center">
          <p className="text-sm font-medium">
            Drag and drop a xls or xlsx file here, or click to browse
          </p>
          <p className="text-xs text-gray-500 mt-2">Max {maxSizeMB} MB</p>
        </div>

        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </label>

      {fileName && (
        <>
          <div className="mt-4 w-full break-all bg-white shadow-md rounded-lg p-3 flex items-center gap-2">
            {getFileIcon(fileName)}
            <span className="text-sm font-semibold font-satoshi">
              {fileName}
            </span>
          </div>

          <button
            onClick={uploadFileToServer}
            disabled={loading} // <-- button disable here
            className={`flex items-center gap-2 justify-center sm:text-sm lg:text-lg 
        text-white font-medium sm:px-3 sm:py-2 lg:px-5 lg:py-2 
        rounded-lg min-w-fit mt-4 w-full cursor-pointer
        ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-red-700"
        }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default FileUpload;
