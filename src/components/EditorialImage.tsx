import { useState } from 'react';
import { MEDIA_REGISTRY } from '../data/media';
import type { MediaAssetKey } from '../types/hospitality';
import { MonogramMH } from './BrandMark';

interface EditorialImageProps {
  assetKey: MediaAssetKey;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  showCaption?: boolean;
  captionAlign?: 'left' | 'right';
}

export function EditorialImage({
  assetKey,
  className = '',
  imgClassName = '',
  priority = false,
  showCaption = false,
  captionAlign = 'left',
}: EditorialImageProps) {
  const asset = MEDIA_REGISTRY[assetKey];
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`group relative overflow-hidden bg-[#D8C9B5]/35 ${className}`}>
      {!hasError ? (
        <img
          src={asset.src}
          alt={asset.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${imgClassName}`}
        />
      ) : (
        <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center p-8 bg-[#EAE2D3] border border-[#D8C9B5] text-center">
          <MonogramMH className="w-10 h-10 mb-4" tone="dark" />
          <p className="font-serif text-lg text-[#292824]">{asset.alt}</p>
          <p className="mt-1 text-xs tracking-wider uppercase text-[#292824]/60">
            Maison Haven · Maitama, Abuja
          </p>
        </div>
      )}

      {showCaption && (
        <figcaption
          className={`mt-2.5 text-xs tracking-wide text-[#292824]/65 font-sans ${
            captionAlign === 'right' ? 'text-right' : 'text-left'
          }`}
        >
          {asset.caption}
        </figcaption>
      )}
    </figure>
  );
}
