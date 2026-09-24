import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { GraphicItem } from '../types.ts';

interface LightboxModalProps {
  isOpen: boolean;
  activeItem: GraphicItem | null;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function LightboxModal({
  isOpen,
  activeItem,
  currentIndex,
  totalCount,
  onClose,
  onNext,
  onPrev,
}: LightboxModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !activeItem) return null;

  return (
    <div
      id="lightbox-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Top Action Bar */}
      <div
        className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-md bg-white/10 border border-white/20 text-xs font-semibold text-white">
            {currentIndex + 1} / {totalCount}
          </span>
          <h3 className="text-sm font-bold text-white">
            {activeItem.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={activeItem.directSrc || activeItem.localSrc}
            target="_blank"
            rel="noreferrer"
            title="Open full resolution in new tab"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#CBEA30] transition-colors cursor-pointer border border-white/20"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <button
            type="button"
            id="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl transition-all cursor-pointer shadow-lg active:scale-95 bg-[#CBEA30] hover:bg-[#d8f53a] text-[#0B0F17]"
          >
            <X className="w-5 h-5 font-bold text-[#0B0F17]" />
          </button>
        </div>
      </div>

      {/* Prev / Next Navigation Buttons */}
      <button
        type="button"
        id="lightbox-prev-btn"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/60 hover:bg-[#CBEA30] text-white hover:text-[#0B0F17] border border-white/20 hover:border-[#CBEA30] transition-all hover:scale-105 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        id="lightbox-next-btn"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Next image"
        className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/60 hover:bg-[#CBEA30] text-white hover:text-[#0B0F17] border border-white/20 hover:border-[#CBEA30] transition-all hover:scale-105 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Stage */}
      <div
        className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          id="lightbox-active-img"
          src={activeItem.localSrc}
          data-postimg={activeItem.postimgUrl}
          alt={activeItem.title}
          onError={(e) => {
            e.currentTarget.src = activeItem.directSrc;
          }}
          className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl transition-transform duration-300 border border-white/10"
        />
      </div>

      {/* Bottom Caption */}
      <div
        className="absolute bottom-4 left-4 right-4 z-20 text-center text-xs sm:text-sm text-slate-200 pointer-events-none"
      >
        <p className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full inline-block border border-white/15">
          {activeItem.title} — {activeItem.description}
        </p>
      </div>
    </div>
  );
}
