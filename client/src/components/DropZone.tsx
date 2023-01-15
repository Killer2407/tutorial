import React, { Dispatch, FunctionComponent, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const DropZone:FunctionComponent<{setFile: Dispatch<any>}>= ({setFile}) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            console.log('acceptedFiles', acceptedFiles)
            setFile(acceptedFiles[0])
        },
        [],
    )

    const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({ onDrop, multiple: false, accept: 'image/jpeg,image/png, audio/mpeg' })
    return (
        <div className="p-4 w-full">
            <div {...getRootProps()} className="w-full h-80 rounded-md cursor-pointer focus:outline-none"> //this is a property getter
                <input {...getInputProps()} />
                <div className={"flex flex-col items-center justify-center h-full space-y-3 border-2 border-dashed border-yellow-light rounded-xl " + (isDragReject === true ? "border-red-500" : "") + (isDragAccept === true ? "border-green-500" : "")}>
                    <img src="/images/folder.png" alt="folder" className='w-16 h-16' />
                    {
                        isDragReject ? (<p>Only accepts images and mp3</p>) : (
                            <>
                                <p>Drag Files</p>
                                <p className='mt-2 text-base text-gray-300'>
                                    Files Supported:- JPEG, PNG, & MP3.
                                </p>
                            </>
                        )}
                </div>
            </div>
        </div>
    )
}

export default DropZone

