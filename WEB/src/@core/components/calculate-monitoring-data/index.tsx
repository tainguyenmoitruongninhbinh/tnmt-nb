export function calculateMonitoringData(require: number, value: number) {
  const result = require - value
  if (require == null || value == null) {
    return <span style={{ fontWeight: 'bold', color: 'green' }}>0.00</span>
  } else {
    if (result < 0) {
      return <span style={{ fontWeight: 'bold', color: 'red' }}>{parseFloat(result.toFixed(2))}</span>
    } else {
      return <span style={{ fontWeight: 'bold', color: 'green' }}>{parseFloat(result.toFixed(2))}</span>
    }
  }
}
