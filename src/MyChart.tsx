import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const MyChart: React.FC = () => {
    const [data, setData] = useState<number[]>([10, 20, 30, 40, 50, 60, 70]);

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ['2023-01-01T00:00:00', '2023-02-01T00:00:00', '2023-03-01T00:00:00', '2023-04-01T00:00:00', '2023-05-01T00:00:00', '2023-06-01T00:00:00', '2023-07-01T00:00:00']
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            // 新しいデータポイントを生成
            let newData = [...data, Math.floor(Math.random() * 100)];

            // 最初のデータポイントを削除してグラフをスクロールするように見せる
            if (newData.length > 7) {
                newData.shift();
            }
            console.log("Data updated: ", newData);

            setData(newData);
        }, 1000);

        // コンポーネントのクリーンアップ時にsetIntervalをクリア
        return () => clearInterval(intervalId);
    }, [data]);

    return (
        <div>
            <ApexCharts options={options} series={[{ name: 'Sales', data }]} type="line" height={350} />
        </div>
    );
}

export default MyChart;
