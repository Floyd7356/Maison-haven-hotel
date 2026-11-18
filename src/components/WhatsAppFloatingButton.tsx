import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../data/hotelData';

export function WhatsAppFloatingButton() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Maison Haven on WhatsApp (+234 816 752 4467)"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 min-h-[44px] px-4 py-2.5 bg-[#292824] text-[#F2EDE3] border border-[#A58A64]/45 shadow-lg hover:bg-[#3A3832] hover:border-[#A58A64] transition-colors duration-200"
    >
      <MessageCircle className="w-4 h-4 text-[#D8C9B5] stroke-[1.75]" aria-hidden="true" />
      <span className="text-xs font-medium tracking-[0.14em] uppercase whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
}
