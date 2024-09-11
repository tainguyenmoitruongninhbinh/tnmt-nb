import { useState, ChangeEvent,  } from 'react'
import { EditNote, Add,CloudUpload,  Save } from '@mui/icons-material'
import {
  Grid,
  Button,
  DialogActions,
  Typography,
  TextField,
  CircularProgress,
  Box
} from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData, uploadFile } from 'src/api/axios'
import { VisuallyHiddenInput } from 'src/@core/theme/VisuallyHiddenInput'

interface State {
    id: number
    tenBanDo: string;
    fileKML: string;
}


const Form = ({ data, setPostSuccess, isEdit, closeDialogs }: any) => {
  const [values, setValues] = useState<State>({
    id: data?.id || 0,
    tenBanDo: data?.tenBanDo || '',
    fileKML: data?.fileKML || ''
  })
  const [saving, setSaving] = useState(false)
  const [fileUpload, setFileUpload] = useState<any>()
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFileUpload(file)
  }
  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setValues({ ...values, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      const newValues = {
        ...values,
        fileKML: `${fileUpload.name?.replace(/\//g, '_').toLowerCase()}`
      }

      const newFile = {
        filePath: `pdfNB/`,
        fileName: `${fileUpload.name?.replace(/\//g, '_').toLowerCase()}`,
        file: fileUpload
      }

      setSaving(true)
      try {
        const res = await saveData('Test/luu', newValues)
        if (res) {
          await uploadFile(newFile)

          // Reset form fields
          setValues({
            id: 0,
            tenBanDo: '',
            fileKML: '',
          })

          typeof setPostSuccess === 'function' ? setPostSuccess(true) : ''
          closeDialogs()
        }
      } catch (error) {
        console.log(error)
      } finally {
        6
        setSaving(false)
      }
    }

    // Call the function
    handleApiCall()
  }

  const handleClose = () => {
    setValues({
      id: 0,
      tenBanDo: '',
      fileKML: '',
    })

    closeDialogs()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        {isEdit ? (
          ''
        ) : (
          <Grid item xs={12} md={12}>
            <TextField
              size='small'
              type='text'
              fullWidth
              sx={{ my: 3 }}
              label='Tên bản đồ'
              placeholder=''
              value={values?.tenBanDo}
              onChange={handleChange('tenBanDo')}
            />
          
          </Grid>
        )}
        <Grid item xs={12} md={12} sx={{ my: 3 }}>
        {fileUpload?.name && <Typography mb={3}>{fileUpload?.name}</Typography>}
          <Button
            className='uploadBtn'
            component='label'
            variant='contained'
            startIcon={<CloudUpload />}
            href={`#file-upload`}>
            Upload file
            <VisuallyHiddenInput type='file' onChange={handleFileChange} accept='.pdf' />
          </Button>
        </Grid>
      </Grid>
      <DialogActions sx={{ p: 0 }}>
        <Button onClick={() => handleClose()} className='btn cancleBtn'>
          Hủy
        </Button>
        <Button type='submit' disabled={saving} className='btn saveBtn'>
          {' '}
          {saving ? <CircularProgress color='inherit' size={20} /> : <Save />} &nbsp; Lưu{' '}
        </Button>
      </DialogActions>
    </form>
  )
}

const DangerForm = ({ data, setPostSuccess, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin' : 'Thêm mới'

  return (
    <DialogsControl>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <Box>
          {isEdit ? (
            <EditNote
              className='tableActionBtn'
              onClick={() =>
                openDialogs(
                  <Form data={data} setPostSuccess={setPostSuccess} isEdit={isEdit} closeDialogs={closeDialogs} />,
                  formTitle
                )
              }
            />
          ) : (
            <Button
            variant='outlined'
            size='small'
            startIcon={<Add />}
            onClick={() =>
              openDialogs(<Form data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
            }>
            Thêm mới
          </Button>
          )}
        </Box>
      )}
    </DialogsControl>
  )
}

export default DangerForm
