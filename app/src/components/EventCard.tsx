import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { type EventData } from '../context/EventContext';

interface EventCardProps {
  event: EventData;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isInCart } = useCart();
  const { role } = useAuth();
  const cardRef = useRef<HTMLDivElement>(null);
  const inCart = isInCart(event.id);

  const navigate = useNavigate();

  const handleRegister = () => {
    if (inCart || role === 'ADMIN') return;
    navigate('/register');
  };

  return (
    <div
      ref={cardRef}
      className="group bg-surface-container rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-transparent hover:border-red-900/30"
    >
      {/* Image */}
      <div className="h-48 relative overflow-hidden">
        <img
          src={event.image}
          alt={event.imageAlt}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-70" />
        {/* Tag */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/60 backdrop-blur-md text-tertiary px-2 py-1 text-[9px] font-bold uppercase tracking-widest border border-white/10">
            {event.tag}
          </span>
        </div>
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wider">
          ${event.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-base font-black font-headline mb-2 group-hover:text-primary transition-colors uppercase tracking-tight leading-tight">
          {event.name}
        </h3>
        <div className="flex items-center gap-4 text-outline text-[10px] font-bold uppercase tracking-widest mb-5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            {event.date}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            {event.location}
          </div>
        </div>

        {/* Action button based on role */}
        {role === 'ADMIN' ? (
          <button
            className="w-full py-3 text-[10px] font-black tracking-widest uppercase rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-red-600/30 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            EDIT PROTOCOL
          </button>
        ) : (
          <button
            onClick={handleRegister}
            disabled={inCart}
            className={`relative w-full py-3 text-[10px] font-black tracking-widest uppercase rounded transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden
              ${inCart
                ? 'bg-red-900/30 text-red-400 border border-red-900/50 cursor-default'
                : 'bg-surface-container-highest text-on-surface hover:bg-primary-container/90 hover:text-white hover:shadow-[0_0_16px_rgba(220,38,38,0.4)]'
              }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {inCart ? 'check_circle' : 'how_to_reg'}
            </span>
            {inCart ? 'REGISTERED' : 'REGISTER'}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;

