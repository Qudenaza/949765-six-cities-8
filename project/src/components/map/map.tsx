import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { City, Offer } from '../../types/types';
import {Icon, Marker} from 'leaflet';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';

type Props = {
  city: City,
  offers: Offer[],
  selectedPoint: number,
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({city, offers, selectedPoint}: Props): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(offer.id === selectedPoint ? currentCustomIcon: defaultCustomIcon)
          .addTo(map);
      });

    }
  }, [map, offers, selectedPoint]);

  return (
    <section className="cities__map map" style={{height: '500px'}} ref={mapRef}></section>
  );
}

export default Map;
