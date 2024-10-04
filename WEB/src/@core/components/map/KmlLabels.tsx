import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

interface KmlLabelsProps {
  kml: XMLDocument
}

const KmlLabels: React.FC<KmlLabelsProps> = ({ kml }) => {
  const map = useMap()
  const [labelGroup, setLabelGroup] = useState<L.LayerGroup | null>(null)

  useEffect(() => {
    const newLabelGroup = L.layerGroup()

    const parser = new DOMParser()
    const kmlDoc = parser.parseFromString(kml.documentElement.outerHTML, 'text/xml')
    const placemarks = kmlDoc.getElementsByTagName('Placemark')

    const labels: { [key: string]: L.Marker } = {}

    Array.from(placemarks).forEach(placemark => {
      const name = placemark.getElementsByTagName('name')[0]?.textContent
      const coordinates = placemark.getElementsByTagName('coordinates')[0]?.textContent

      if (name && coordinates) {
        const [lng, lat] = coordinates.split(',').map(parseFloat)
        
        if (!labels[name]) {
          const label = L.divIcon({
            className: 'kml-label-text',
            html: `<div>${name}</div>`
          })
          const marker = L.marker([lat, lng], { 
            icon: label, 
            interactive: false 
          })
          labels[name] = marker
          newLabelGroup.addLayer(marker)
        }
      }
    })

    map.addLayer(newLabelGroup)
    setLabelGroup(newLabelGroup)

    return () => {
      if (labelGroup) {
        map.removeLayer(labelGroup)
      }
    }
  }, [kml, map])

  return null
}

export default KmlLabels