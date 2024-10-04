import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// Giả định dữ liệu mẫu cho từng cấp độ rủi ro
const sampleDataRisk1 = [
  { id: 1, huyen: 'Huyện Văn Khánh', xa: 'Xã A', tongSo: 4442.38, daDuocCapGCN: 2516.35, chuaDuocCapGCN: 1081.11, datCongIch: 399.09,ratCao:1000 },
  { id: 2, huyen: 'Huyện Văn Khánh', xa: 'Xã B', tongSo: 3000, daDuocCapGCN: 2000, chuaDuocCapGCN: 500, datCongIch: 400,ratCao:1000 },
  { id: 3, huyen: 'Huyện Khác', xa: 'Xã C', tongSo: 6000, daDuocCapGCN: 3500, chuaDuocCapGCN: 2000, datCongIch: 500,ratCao:1000 },
];

const sampleDataRisk2 = [
  { id: 1, huyen: 'Huyện Văn Khánh', xa: 'Xã D', tongSo: 5000, daDuocCapGCN: 3000, chuaDuocCapGCN: 1500, datCongIch: 500,ratCao:1000 },
  { id: 2, huyen: 'Huyện Văn Khánh', xa: 'Xã E', tongSo: 4000, daDuocCapGCN: 2500, chuaDuocCapGCN: 1000, datCongIch: 500,ratCao:1000 },
  { id: 3, huyen: 'Huyện Khác', xa: 'Xã F', tongSo: 7000, daDuocCapGCN: 4000, chuaDuocCapGCN: 2500, datCongIch: 500,ratCao:1000 },
];

interface StatisticsTableProps {
  riskLevel: string;
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ riskLevel }) => {
  const [selectedHuyen, setSelectedHuyen] = useState<string>('');

  const sampleData = useMemo(() => {
    return riskLevel === '1' ? sampleDataRisk1 : sampleDataRisk2;
  }, [riskLevel]);

  const aggregatedData = useMemo(() => {
    const aggregated = sampleData.reduce((acc, curr) => {
      if (!acc[curr.huyen]) {
        acc[curr.huyen] = { huyen: curr.huyen, tongSo: 0, daDuocCapGCN: 0, chuaDuocCapGCN: 0, datCongIch: 0,ratCao:0 };
      }
      acc[curr.huyen].tongSo += curr.tongSo;
      acc[curr.huyen].daDuocCapGCN += curr.daDuocCapGCN;
      acc[curr.huyen].chuaDuocCapGCN += curr.chuaDuocCapGCN;
      acc[curr.huyen].datCongIch += curr.datCongIch;

      return acc;
    }, {} as Record<string, { huyen: string, tongSo: number, daDuocCapGCN: number, chuaDuocCapGCN: number, datCongIch: number,ratCao:number }>);
    
    return Object.values(aggregated);
  }, [sampleData]);

  const huyenList = useMemo(() => aggregatedData.map(item => item.huyen), [aggregatedData]);

  const displayData = useMemo(() => {
    if (!selectedHuyen) return aggregatedData;

    return sampleData.filter(item => item.huyen === selectedHuyen);
  }, [selectedHuyen, aggregatedData, sampleData]);

  return (
    <>
      <h2>Thống kê rủi ro cấp {riskLevel}</h2>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="huyen-select-label">Chọn Huyện</InputLabel>
        <Select
          labelId="huyen-select-label"
          value={selectedHuyen}
          label="Chọn Huyện"
          onChange={(e) => setSelectedHuyen(e.target.value as string)}
        >
          <MenuItem value="">Tất cả</MenuItem>
          {huyenList.map((huyen) => (
            <MenuItem key={huyen} value={huyen}>{huyen}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="statistics table">
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2}>STT</TableCell>
              <TableCell rowSpan={2}>Huyện</TableCell>
              {selectedHuyen && <TableCell rowSpan={2}>Xã</TableCell>}
              <TableCell colSpan={5} align="center">Nguy cơ xảy ra rủi ro mưa lớn (ha)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Rất thấp</TableCell>
              <TableCell align="center">Thấp</TableCell>
              <TableCell align="center">Trung bình</TableCell>
              <TableCell align="center">Cao</TableCell>
              <TableCell align="center">Rất cao</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((row, index) => (
              <TableRow key={selectedHuyen ? index : row.huyen}>
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell>{row.huyen}</TableCell>
                {selectedHuyen && <TableCell>{(row as any).xa}</TableCell>}
                <TableCell align="right">{row.tongSo.toFixed(2)}</TableCell>
                <TableCell align="right">{row.daDuocCapGCN.toFixed(2)}</TableCell>
                <TableCell align="right">{row.chuaDuocCapGCN.toFixed(2)}</TableCell>
                <TableCell align="right">{row.datCongIch.toFixed(2)}</TableCell>
                <TableCell align="right">{row.ratCao.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StatisticsTable;