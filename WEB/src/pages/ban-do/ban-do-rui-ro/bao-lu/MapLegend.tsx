import React, { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { FormControl, FormGroup, Typography } from '@mui/material'

const MapLegend = ({ onChange }: { onChange: (selectedOptions: string[]) => void }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const isChecked = event.target.checked

    let updatedSelectedOptions = []
    if (isChecked) {
      updatedSelectedOptions = [...selectedOptions, value]
    } else {
      updatedSelectedOptions = selectedOptions.filter(option => option !== value)
    }

    setSelectedOptions(updatedSelectedOptions)
    onChange(updatedSelectedOptions)
  }

  useEffect(() => {
    onChange(selectedOptions)
  }, [selectedOptions, onChange])

  return (
    <FormControl component='fieldset'>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedOptions.includes('ruirocap1')}
              onChange={handleOptionChange}
              value='ruirocap1'
            />
          }
          label={
            <Typography variant='overline' sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <span>&nbsp;Rủi ro cấp 1</span>
            </Typography>
          }
        />
        <FormControlLabel
          control={<Checkbox checked={selectedOptions.includes('ruirocap2')} onChange={handleOptionChange} value='ruirocap2' />}
          label={
            <Typography variant='overline' sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <span>&nbsp;Rủi ro cấp 2</span>
            </Typography>
          }
        />
      </FormGroup>
    </FormControl>
  )
}

export default MapLegend
