import * as React from 'react';
import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import { getData } from 'src/api/axios';
import DangerForm from './form';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: '100%' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

interface FileData {
  tenBanDo: string;
  fileKML: string;
}

export default function Danger() {
  const [value, setValue] = useState(0);
  const [files, setFiles] = useState<FileData[]>([]);
  const [postSuccess, setPostSuccess] = useState(false);

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getDataReport1() {
      await getData('Test/danh-sach')
        .then(data => {
          setFiles(data);
        })
        .catch(error => {
          console.log(error);
        });
    }

    getDataReport1();
  }, [postSuccess]);

  return (
    <>
      <DangerForm data={files} setPostSuccess={handlePostSuccess} isEdit={false} />
      <Box sx={{ height: '100%', flexGrow: 1, bgcolor: 'background.paper', display: 'flex', p: 3 }}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {files.map((file, index) => (
            <Tab label={file.tenBanDo} {...a11yProps(index)} key={index} />
          ))}
        </Tabs>
        <Box sx={{ flexGrow: 1 }}>
          {files.map((file, index) => (
            <TabPanel value={value} index={index} key={index}>
              <Box sx={{ width: '100%' }}>
                <ShowFilePDF name={file?.tenBanDo} src={file?.fileKML} />
              </Box>
            </TabPanel>
          ))}
        </Box>
      </Box>
    </>
  );
}
