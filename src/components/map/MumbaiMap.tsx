import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Complaint, ComplaintCategory } from '../../types';
import { useApp } from '../../context/AppContext';
import { Search, Navigation, Layers, Check, AlertCircle } from 'lucide-react';
import { MUMBAI_WARDS } from '../../data/mumbaiWards';

interface MumbaiMapProps {
  complaints: Complaint[];
  selectedComplaintId: string | null;
  onSelectComplaint: (id: string) => void;
  showFilters?: boolean;
  heightClass?: string;
}

export const MumbaiMap: React.FC<MumbaiMapProps> = ({
  complaints,
  selectedComplaintId,
  onSelectComplaint,
  showFilters = true,
  heightClass = 'h-[calc(100vh-140px)]',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');
  const [searchArea, setSearchArea] = useState('');
  const [userLocating, setUserLocating] = useState(false);

  const { showToast } = useApp();

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Safety: ensure any previous leaflet instance on this DOM node is cleared
    if ((mapContainerRef.current as any)._leaflet_id) {
      delete (mapContainerRef.current as any)._leaflet_id;
    }

    let map: L.Map;
    try {
      // Default center on Bandra West / Ward 12
      map = L.map(mapContainerRef.current, {
        center: [19.0596, 72.8295],
        zoom: 14,
        zoomControl: false,
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Zoom control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
      markersLayerRef.current = markersLayer;

      // Invalidate size after mounting to prevent blank tiles in dynamic or modal containers
      setTimeout(() => {
        try {
          map.invalidateSize();
        } catch (e) {}
      }, 150);
      setTimeout(() => {
        try {
          map.invalidateSize();
        } catch (e) {}
      }, 400);

      const handleResize = () => {
        try {
          mapInstanceRef.current?.invalidateSize();
        } catch (e) {}
      };
      window.addEventListener('resize', handleResize);
    } catch (err) {
      console.error('Failed to initialize Leaflet map:', err);
      return;
    }

    return () => {
      try {
        map.remove();
      } catch (e) {
        console.warn('Error removing map instance:', e);
      }
      mapInstanceRef.current = null;
    };
  }, []);

  // Filter complaints
  const filteredComplaints = complaints.filter((c) => {
    if (activeCategoryFilter !== 'all' && c.category !== activeCategoryFilter) return false;
    if (activeStatusFilter !== 'all' && c.status !== activeStatusFilter) return false;
    if (searchArea) {
      const q = searchArea.toLowerCase();
      const match =
        c.location.address.toLowerCase().includes(q) ||
        c.location.landmark.toLowerCase().includes(q) ||
        c.location.ward.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Render Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const layer = markersLayerRef.current;
    layer.clearLayers();

    filteredComplaints.forEach((c) => {
      const isSelected = c.id === selectedComplaintId;
      const isOverdue =
        (c.status === 'in_progress' || c.status === 'assigned' || c.status === 'reviewed') &&
        new Date(c.deadline).getTime() < new Date().getTime();

      // Pin Color according to design
      let pinColor = '#1F2937'; // Reported/Unassigned = dark slate
      if (c.status === 'assigned') pinColor = '#2563EB'; // Blue
      else if (c.status === 'in_progress') pinColor = '#D97706'; // Golden amber
      else if (c.status === 'paused') pinColor = '#EA580C'; // Orange
      else if (c.status === 'awaiting_verification') pinColor = '#0D9488'; // Teal
      else if (c.status === 'verified') pinColor = '#16A34A'; // Green
      else if (c.status === 'reopened') pinColor = '#E11D48'; // Rose red

      const markerHtml = `
        <div class="relative cursor-pointer group transition-transform duration-150 ${isSelected ? 'scale-125 z-50' : 'hover:scale-110'}">
          ${
            isOverdue
              ? `<div class="absolute -inset-1.5 rounded-full border-2 border-red-500 animate-ping opacity-75"></div>
                 <div class="absolute -inset-1.5 rounded-full border-2 border-red-500"></div>`
              : ''
          }
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md border-2 ${
            isSelected ? 'border-white ring-2 ring-[#176B4D]' : 'border-white'
          }" style="background-color: ${pinColor}">
            ${
              c.status === 'verified'
                ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
                : c.status === 'in_progress' && c.progress
                ? `<span class="text-[10px] font-bold">${c.progress}%</span>`
                : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
            }
          </div>
          ${
            isSelected
              ? `<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#176B4D] rotate-45"></div>`
              : ''
          }
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-urbanfix-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([c.location.lat, c.location.lng], { icon: customIcon });

      // Click to select
      marker.on('click', () => {
        onSelectComplaint(c.id);
        mapInstanceRef.current?.panTo([c.location.lat, c.location.lng], { animate: true });
      });

      marker.addTo(layer);
    });
  }, [filteredComplaints, selectedComplaintId]);

  // Center on selected complaint when changed
  useEffect(() => {
    if (!selectedComplaintId || !mapInstanceRef.current) return;
    const selected = complaints.find((c) => c.id === selectedComplaintId);
    if (selected) {
      mapInstanceRef.current.panTo([selected.location.lat, selected.location.lng], {
        animate: true,
      });
    }
  }, [selectedComplaintId]);

  const handleUseLocation = () => {
    setUserLocating(true);
    // Simulate user geolocation in Bandra West
    setTimeout(() => {
      setUserLocating(false);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([19.0570, 72.8260], 15, { animate: true });
        showToast('Located in Ward 12 (Bandra West)');
      }
    }, 500);
  };

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-[#E5E7EB]`}>
      {/* Map Search & Actions Floating Bar */}
      <div className="absolute top-4 left-4 z-[1000] w-[calc(100%-32px)] max-w-lg flex flex-col gap-2">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl p-1.5 shadow-card flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400 ml-2" />
          <input
            type="text"
            value={searchArea}
            onChange={(e) => setSearchArea(e.target.value)}
            placeholder="Search an area, street or landmark"
            className="flex-1 bg-transparent text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          {searchArea && (
            <button
              onClick={() => setSearchArea('')}
              className="text-xs text-gray-400 hover:text-gray-600 px-1"
            >
              ×
            </button>
          )}
          <button
            onClick={handleUseLocation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#065F46] text-xs font-medium border border-[#A7F3D0] transition-colors"
          >
            <Navigation className={`w-3.5 h-3.5 ${userLocating ? 'animate-spin' : ''}`} />
            <span>Use my location</span>
          </button>
        </div>

        {/* Quick Category Chips */}
        {showFilters && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All Issues' },
              { id: 'pothole', label: 'Potholes' },
              { id: 'garbage', label: 'Garbage' },
              { id: 'drain', label: 'Drains' },
              { id: 'water_leakage', label: 'Water Leak' },
              { id: 'streetlight', label: 'Lighting' },
              { id: 'footpath', label: 'Footpaths' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all shadow-sm ${
                  activeCategoryFilter === cat.id
                    ? 'bg-[#176B4D] text-white font-semibold'
                    : 'bg-white/90 text-gray-700 hover:bg-white border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating Status Legend (Top Right) */}
      <div className="hidden md:block absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-3 shadow-card text-[11px] space-y-1.5 min-w-[150px]">
        <div className="font-semibold text-gray-500 uppercase tracking-wider text-[10px] pb-1 border-b border-gray-100">
          Live Status
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1F2937]" />
          <span>Not assigned</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
          <span>Work assigned</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
          <span>In progress (%)</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
          <span>Paused / stopped</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
          <span>Done · Verified</span>
        </div>
        <div className="flex items-center gap-2 text-red-600 font-medium pt-1 border-t border-gray-100">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-red-500" />
          <span>Overdue SLA</span>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

