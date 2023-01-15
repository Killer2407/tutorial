import DropZone from "@components/DropZone";
import { useState } from "react";


export default function Home() {
  const [file, setFile] = useState(null)
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-medium"> Share a Doc! </h1>
      <div className="w-96 flex flex-col items-center shadow-xl bg-gray-800 rounded-xl justify-center">
        <DropZone setFile={setFile} />
        {file?.name}
        {/* upload button */}
      </div>
    </div>
  );
}
