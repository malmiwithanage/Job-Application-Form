import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";

// MongoDB connection
const mongoURI = "mongodb+srv://umnew1:Nxi8kTnAV2sR1Fbk@cluster01.aikqm.mongodb.net/";
const conn = mongoose.createConnection(mongoURI);


// Init GridFS
let gfs: Grid.Grid;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads"); // Collection where CVs are stored
});

// Set up storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => ({
    filename: `${Date.now()}-${file.originalname}`,
    bucketName: "uploads", // Must match the collection
  }),
});

const upload = multer({ storage });

// API route for CV upload
export async function POST(req: NextRequest) {
  return new Promise((resolve) => {
    upload.single("cv")(req as any, {} as any, async (err: any) => {
      if (err) {
        return resolve(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
      }
      resolve(NextResponse.json({ message: "File uploaded successfully" }));
    });
  });
}
