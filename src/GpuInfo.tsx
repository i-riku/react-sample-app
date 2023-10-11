// src/GpuInfo.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GpuInfo: React.FC = () => {
    const [gpuInfo, setGpuInfo] = useState([]);

    const fetchGpuInfo = async () => {
        try {
            const response = await axios.get('http://localhost:5000/gpu-info');
            setGpuInfo(response.data);
        } catch (error) {
            console.error("Failed to fetch GPU info:", error);
        }
    };

    useEffect(() => {
        fetchGpuInfo();
        const intervalId = setInterval(fetchGpuInfo, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            {gpuInfo.map((info, index) => (
                <div key={index}>
                    <strong>Name:</strong> {info.name} | <strong>Memory Used:</strong> {info.memoryUsed} MB
                </div>
            ))}
        </div>
    );
}

export default GpuInfo;
