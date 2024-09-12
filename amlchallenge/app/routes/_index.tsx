import { useState } from "react";

export default function Index() {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting files...");

    if (files.length === 0) {
      console.log("No files selected!");
      alert("No files selected!");
      return;
    }

    const formData = new FormData();
    console.log("Files selected:", files);

    files.forEach((file) => {
      formData.append("files", file);
      console.log("Appending file:", file.name, file);
    });

    try {
      const response = await fetch("http://localhost:5000/process-files", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        console.error("Failed to upload files", response.statusText);
        return;
      }

      const result = await response.json();
      console.log("Result:", result);

      // Store the result in state
      setResult(result);
    } catch (error) {
      console.error("Error submitting files:", error);
    }

    console.log("Files submitted!");
  };

  return (
    <div>
      <h1>Upload a Folder</h1>
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        multiple
        onChange={handleFileUpload}
      />
      <button onClick={handleSubmit}>Upload and Process</button>
      {result && (
        <div>
          <h2>Processed Data:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
