import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const { lightboxImage, setLightboxImage } = useApp();

  if (!lightboxImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={() => setLightboxImage(null)}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] bg-[#10221C] border border-[#1E3D32] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E3D32] bg-[#0E1D18]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#176B4D] text-white text-xs font-semibold rounded uppercase tracking-wider">
              DEMO PHOTO
            </span>
            <span className="text-xs text-gray-400">
              Authentic photographic verification record
            </span>
          </div>
          <button
            onClick={() => setLightboxImage(null)}
            className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2 bg-black/40 flex items-center justify-center">
          <img
            src={lightboxImage}
            alt="Complaint evidence high resolution"
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
          />
        </div>

        <div className="px-4 py-2.5 bg-[#0E1D18] flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            Geotag & timestamp preserved in municipal audit trail
          </span>
          <span>Click anywhere outside to close</span>
        </div>
      </div>
    </div>
  );
};

