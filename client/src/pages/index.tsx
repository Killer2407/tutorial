import DropZone from "@components/DropZone";
import FileDetails from "@components/FileDetails";
import { useState } from "react";
import axios from 'axios'


export default function Home() {
  const [file, setFile] = useState(null)
  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null)
  const [uploadState, setUploadState] = useState<"Uploading" | "Upload Failed" | "Uploaded">(null)

  const handleUpload = async () => {
    if (uploadState === "Uploading") return;
    const formData = new FormData()
    formData.append("myFile", file)
    try {
      const { data } = await axios({
        method: "POST",
        data: formData,
        url: "api/files/upload",
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })
      setDownloadPageLink(data.downloadPageLink)
      setId(data.id)
    } catch (error) {
      console.log(error.response.data)
      setUploadState("Upload Failed")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-medium"> Share a Doc! </h1>
      <div className="w-96 flex flex-col items-center shadow-xl bg-gray-800 rounded-xl justify-center">
        <DropZone setFile={setFile} />
        {file &&
          <FileDetails file={{
            format: file.type.split("/")[1],
            name: file.name,
            sizeInBytes: file.size,
          }} />
        }
        {/* upload button */}
        <button onClick={handleUpload} className="w-44 bg-gray-900 my-5 rounded-md p-2 focus:outline-none">Upload</button>
      </div>
    </div>
  );
}
