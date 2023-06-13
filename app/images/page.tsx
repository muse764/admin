"use client";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Images() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.API_URL}/images`, {
            headers: {
            },
            timeout: 1000,
        }).then((response) => {
            const images = response.data.images;
            setImages(images);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const rows: GridRowsProp = images;

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'file', headerName: 'File' },
        { field: 'width', headerName: 'Width' },
        { field: 'height', headerName: 'Height' },
        { field: 'userId', headerName: 'User' },
        { field: 'published', headerName: 'Published' },
    ];

    return (
        <div className="App">
            <DataGrid rows={rows} columns={columns} />
        </div>
    )
}