"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Icon } from 'leaflet';
import { Clock } from 'lucide-react';
import { LuMapPin } from 'react-icons/lu';
import { AutoComplete, Button, Input, Spin, Empty } from 'antd';
import Image from 'next/image';
import { BsStarFill } from 'react-icons/bs';
import ResetView from './ResetView';
import { useGetAllProductsQuery } from '../../features/Products/productsApi';
import { BaseURL } from '../../utils/BaseURL';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/icons/markar2.svg',
  iconUrl: '/icons/markar2.svg',
  shadowUrl: '/icons/markar2.svg'
});

const ClubMap = ({ selectedClub, setSelectedClub }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState(null);
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const [products, setProducts] = useState([]);
  const [defaultCenter, setDefaultCenter] = useState([23.7558, 90.4125]); // Default to Dhaka
  const [locationLoading, setLocationLoading] = useState(true);

  const customIcon = new Icon({
    iconUrl: "/icons/markar2.svg",
    iconSize: [50, 50],
  });

  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        // Try browser geolocation first (more accurate)
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setDefaultCenter([latitude, longitude]);
              setLocationLoading(false);
            },
            async (error) => {
              console.log("Geolocation permission denied, falling back to IP detection");
              await fetchLocationByIP();
            },
            { timeout: 5000 } // 5 seconds timeout
          );
        } else {
          // Browser doesn't support geolocation
          await fetchLocationByIP();
        }
      } catch (error) {
        console.error("Location detection failed:", error);
        setLocationLoading(false);
      }
    };

    const fetchLocationByIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.latitude && data.longitude) {
          setDefaultCenter([data.latitude, data.longitude]);
        }
      } catch (ipError) {
        console.error("IP-based location failed:", ipError);
        // Keep default Dhaka coordinates
      } finally {
        setLocationLoading(false);
      }
    };

    detectUserLocation();
  }, []);

  useEffect(() => {
    if (data?.data?.result) {
      const validProducts = data.data.result.filter(
        product => product.location?.coordinates?.length === 2
      );
      setProducts(validProducts);

      // Only update center if we haven't detected user location yet
      if (validProducts.length > 0 && locationLoading) {
        const firstProduct = validProducts[0];
        setDefaultCenter([
          firstProduct.location.coordinates[1],
          firstProduct.location.coordinates[0]
        ]);
        setLocationLoading(false);
      }
    }
  }, [data, locationLoading]);

  // Transform API data to match expected format
  const filteredClubs = products.map(product => ({
    _id: product._id,
    name: product.name,
    address: product.description,
    location: {
      latitude: product.location.coordinates[1],
      longitude: product.location.coordinates[0]
    },
    rating: 4.5,
    openingHour: "10:00",
    closingHour: "22:00",
    price: product.price,
    capacity: product.capacity,
    model: product.model,
    images: product.images,
    originalData: product
  }));

  useEffect(() => {
    if (map && selectedClub) {
      map.setView(
        [selectedClub.location.latitude, selectedClub.location.longitude], 
        15
      );
    }
  }, [selectedClub, map]);

  const options = filteredClubs.map((club) => ({
    value: club.name,
    club,
    label: (
      <div className="flex items-center gap-2">
        {club.images?.[0] ? (
          <Image
            src={club.images[0]}
            alt={club.name}
            width={30}
            height={30}
            className="rounded-full"
          />
        ) : (
          <Image
            src="/icons/markar.svg"
            alt="Default"
            width={30}
            height={30}
            className="rounded-full"
          />
        )}
        {club.name}
      </div>
    ),
  }));

  if (isLoading || locationLoading) {
    return (
      <div className="h-[800px] w-full flex items-center justify-center">
        <Spin size="large" tip="Detecting your location..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[800px] w-full flex items-center justify-center">
        <Empty description="Failed to load map data" />
      </div>
    );
  }

  if (filteredClubs.length === 0) {
    return (
      <div className="h-[800px] w-full flex items-center justify-center">
        <Empty description="No products available with location data" />
      </div>
    );
  }

  return (
    <div className="h-[800px] w-full">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        }}
        whenCreated={setMap}
      >
        <div className="search-bar absolute top-4 left-1/2 transform -translate-x-1/2 md:left-20 md:translate-x-0 z-[1000]">
          <AutoComplete
            options={options}
            onSelect={(value) => {
              const selectedOption = options.find((option) => option.value === value);
              if (selectedOption) {
                setSelectedClub(selectedOption.club);
              }
            }}
            onSearch={(value) => setSearchQuery(value)}
            style={{
              height: 46,
              minWidth: 250,
              borderRadius: 24,
              backgroundColor: '#fff',
              borderColor: 'transparent',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            <Input
              placeholder="Search products..."
              value={searchQuery}
              style={{
                minWidth: 200,
                height: 46,
                borderRadius: 24,
                backgroundColor: '#fff',
                borderColor: 'transparent',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
              suffix={<ResetView center={defaultCenter} onReset={() => setSearchQuery('')} />}
            />
          </AutoComplete>
        </div>

        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2huYWRpciIsImEiOiJjbGYzbXB2cG4wcjNsM3FuZGkyeXgzaGp3In0.UW7J5lIaWc-P3nXa2WmRxQ"
          attribution="Map data &copy; <a href='https://www.mapbox.com/'>Mapbox</a>"
        />
        
        {filteredClubs.map((club) => (
          <Marker 
            key={club._id} 
            position={[club.location.latitude, club.location.longitude]} 
            icon={customIcon}
          >
            <Popup>
              <div className="w-[213px] h-full">
                <div className="mb-2">
                  <Image
                    src={`${BaseURL}${club.images?.[0]}` || "/images/faq.jpg"}
                    alt={club.name}
                    width={213}
                    height={120}
                    className="object-cover rounded-lg w-full h-[120px]"
                  />
                </div>
                <div className="absolute border-secondary top-6 left-6 bg-white rounded-full px-2 py-1 text-sm font-medium flex items-center gap-1">
                  {club.rating} <BsStarFill color="#FFC313" />
                </div>
                <div>
                  <h5 className="text-lg text-primary mb-1 font-semibold">{club.name}</h5>
                  <p className="text-sm text-gray-600 mb-1">Price: ${club.price}</p>
                  <p className="text-sm text-gray-600 mb-1">Capacity: {club.capacity}</p>
                  <p className="text-sm text-gray-600 mb-1">Model: {club.model}</p>
                </div>
                <div className="my-2">
                  <Button
                    href={`/product/${club._id}`}
                    style={{
                      height: 32,
                      width: '100%',
                      color: '#000000',
                      backgroundColor:"#FDC700"
                    }}
                    type="primary"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ClubMap;