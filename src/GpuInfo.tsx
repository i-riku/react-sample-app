// src/GpuInfo.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ApexCharts from 'react-apexcharts';

const GpuInfo = () => {
    const [series, setSeries] = useState([]);
    const [gpuData, setGpuData] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchGpuInfo = async () => {
            try {
              const response = await axios.get('http://131.113.48.200:5000/gpu-info');
                // const response = await axios.get('/api/v1/')
                const gpuData = response.data;
                console.log("gpu data", gpuData)
                setGpuData(gpuData); // ステートを更新

                setSeries([
                    {
                        name: "Used Memory",
                        data: gpuData.map(gpu => gpu.memoryUsed)
                    },
                    {
                        name: "Total Memory",
                        data: gpuData.map(gpu => gpu.memoryTotal)
                    }
                ]);
            } catch (error) {
                console.error("Failed to fetch GPU info:", error);
            }
        };

        fetchGpuInfo();
    }, []);

    const options = {
      chart: {
          type: 'bar' as const,
          height: 350
      },
      plotOptions: {
          bar: {
              horizontal: false,
          },
      },
      xaxis: {
          categories: gpuData.map(gpu => gpu.name) // ステートからgpuDataを直接使用
      }
  };

  return <ApexCharts options={options} series={series} type="bar" />;
};

export default GpuInfo;
