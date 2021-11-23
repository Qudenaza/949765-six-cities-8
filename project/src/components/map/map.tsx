import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/types';
import { URL_MARKER } from '../../const';
import { Icon, Marker, LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { selectLocation } from '../../store/app-state/selectors';

type Props = {
  offers: Offer[] | null;
  selectedPoint: number;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER.DEFAULT || URL_MARKER.FALLBACK_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER.ACTIVE || URL_MARKER.FALLBACK_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createMarkers = (offers: Offer[], selectedPoint: number) =>
  offers.map((offer) =>
    new Marker({
      lat: offer.location.latitude,
      lng: offer.location.longitude,
    }).setIcon(offer.id === selectedPoint ? currentCustomIcon : defaultCustomIcon),
  );

function Map({ offers, selectedPoint }: Props): JSX.Element {
  const location = useSelector(selectLocation);
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);
  const [layerGroup, setLayerGroup] = useState(offers && new LayerGroup(createMarkers(offers, selectedPoint)));

  if (map) {
    layerGroup && layerGroup.addTo(map);
  }

  useEffect(() => {
    if (map) {
      map.once('zoomend', () => {
        layerGroup && layerGroup.clearLayers();
      });

      map.flyTo([location.location.latitude, location.location.longitude], location.location.zoom);

      setLayerGroup(offers && new LayerGroup(createMarkers(offers, selectedPoint)));

      layerGroup && layerGroup.addTo(map);
    }

    // eslint-disable-next-line
  }, [selectedPoint, location, offers]);

  return <section className="cities__map map" style={{ height: '500px' }} ref={mapRef}></section>;
}

export default React.memo(
  Map,
  (prevProps, nextProps) => prevProps.offers === nextProps.offers && prevProps.selectedPoint === nextProps.selectedPoint,
);
