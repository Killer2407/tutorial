// to handle the file and to get the file inside this fps app using multer package and to store the file using Cloudinary  
import express from 'express';
import multer from 'multer'
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import File from './../models/File'
import https from 'https'

const router = express.Router()

router.post("/upload", (req, res) => {
    const storage = multer.diskStorage({})

    let upload = multer({
        storage
    })

    router.post("/upload", upload.single("myFile"), async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "Hey! We need the file" });
            }
            console.log(req.file)
            let uploadedFile: UploadApiResponse;
            try {
                uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                    folder: "shareMe",
                    resource_type: "auto"
                })
                const { originalname } = req.file
                const { secure_url, bytes, format } = uploadedFile;

                const file = await File.create({
                    filename: originalname,
                    sizeInBytes: bytes,
                    secure_url,
                    format,
                })
                res.status(200).json({
                    id: file._id,
                    downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`,
                })

            } catch (error) {
                console.error()
                res.status(500).json({ message: "Cloudinary Error" })
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Server Error" })
        }
    })

    router.get("/:id", async (req, res) => {
        try {
            const id = req.params.id
            const file = await File.findById(id)
            if (!file) {
                return res.status(404).json({ message: "File does not exist" })
            }

            const { filename, format, sizeInBytes } = file
            return res.status(200).json({
                name: filename,
                sizeInBytes,
                format,
                id,
            })
        }
        catch (error) {
            return res.status(500).json({ message: "Server Error" })
        }
    })

    router.get("/:id/download", async (req, res) => {
        try {
            const id = req.params.id
            const file = await File.findById(id)
            if (!file) {
                return res.status(404).json({ message: "File does not exist" })
            }

            https.get(file.secure_url, (fileStream) =>
                fileStream.pipe(res))
        }
        catch (error) {
            return res.status(500).json({ message: "Server Error" })
        }
    })

})

export default router;


//Will be storing assets in the cloudinary.
//Cloudinary is a file storage and image optimizer
