import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Grid, Tab, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { SyntheticEvent, useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import StatisticsTable from './StatisticsTable'
import StormMap from './Map'
import { styled } from '@mui/material/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

// Cần thiết lập worker cho react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

// Tạo một component ListItemButton tùy chỉnh
const StyledListItemButton = styled(ListItemButton)<{ selected?: boolean }>(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.action.selected : 'inherit',
  '&:hover': {
    backgroundColor: selected ? theme.palette.action.selected : theme.palette.action.hover,
  },
}))

interface PdfItem {
  name: string;
  url: string;
  level: string;
  province?: string;
  district?: string;
}

const HiemHoa: React.FC = () => {
  const [value, setValue] = useState('1')
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string>('Cấp tỉnh')
  const [pdfData] = useState<PdfItem[]>([
    { name: "Bản đồ rủi ro cấp 1 cấp tỉnh Ninh Bình", url: "/pdf/R_RUIRO_MUALON_cap1.pdf", level: "Cấp tỉnh", province: "Tỉnh A" },
    { name: "Báo cáo cấp  cấp 2 cấp tỉnh Ninh Bình", url: "url_to_file_B", level: "Cấp tỉnh", province: "Tỉnh B" },
    { name: "Báo cáo cấp  cấp 1 cấp huyện A", url: "url_to_file_X", level: "Cấp huyện", province: "Tỉnh A", district: "Huyện X" },
    { name: "Báo cáo cấp cấp 2 cấp huyện B", url: "url_to_file_Y", level: "Cấp huyện", province: "Tỉnh B", district: "Huyện Y" },
    // Thêm các mục khác tương tự
  ])
  const [filteredPdfData, setFilteredPdfData] = useState<PdfItem[]>([])

  const levels = ['Cấp tỉnh', 'Cấp huyện']

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handlePdfSelect = (url: string) => {
    setSelectedPdf(url)
  }

  const riskLevels = [
    { name: 'Rủi ro cấp 1', value: '1' },
    { name: 'Rủi ro cấp 2', value: '2' }
  ]

  const handleRiskLevelSelect = (value: string) => {
    setSelectedRiskLevel(value)
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  useEffect(() => {
    handleRiskLevelSelect(riskLevels[0].value);
    const filtered = pdfData.filter(item => 
      selectedLevel === '' || item.level === selectedLevel
    );
    setFilteredPdfData(filtered);
  }, [selectedLevel, pdfData]);

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value);
    if (value === "") {
      setFilteredPdfData(pdfData);
    } else {
      setFilteredPdfData(pdfData.filter(item => item.level === value));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='ground water reserve'>
              <Tab label='Bản đồ Google' value='1' />
              <Tab label='Thống kê' value='2' />
              <Tab label='Bản đồ PDF' value='3' />
            </TabList>
          </Box>

          <TabPanel value='1'>
          <StormMap />
          </TabPanel>
          <TabPanel value='2'>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <List>
                  {riskLevels.map((level, index) => (
                    <ListItem key={index} disablePadding>
                      <StyledListItemButton 
                        onClick={() => handleRiskLevelSelect(level.value)}
                        selected={selectedRiskLevel === level.value}
                      >
                        <ListItemText primary={level.name} />
                      </StyledListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={10}>
                {selectedRiskLevel && (
                  <StatisticsTable riskLevel={selectedRiskLevel} />
                )}
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value='3'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth style={{ marginBottom: 16 }}>
                  <InputLabel>Chọn cấp</InputLabel>
                  <Select value={selectedLevel} onChange={(event: SelectChangeEvent<string>) => handleLevelChange(event.target.value as string)}>
                    <MenuItem value="">Tất cả</MenuItem>
                    {levels.map((level) => (
                      <MenuItem key={level} value={level}>{level}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <List>
                  {filteredPdfData.map((item, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton onClick={() => handlePdfSelect(item.url)}>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={10}>
                {selectedPdf && (
                  <div style={{ overflowX: 'auto' }}>
                    <Document file={selectedPdf} onLoadSuccess={onDocumentLoadSuccess}>
                      {Array.from(new Array(Math.min(numPages || 0, 1)), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} width={800} />
                      ))}
                    </Document>
                  </div>
                )}
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default HiemHoa;
