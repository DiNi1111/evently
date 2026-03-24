import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'react-hot-toast';
import { useEvents, type EventData } from '../context/EventContext';
import dashboardImg from '../assets/dashboard_screen.png';

const AdminDashboard: React.FC = () => {
  const { allEvents, addEvent } = useEvents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Technical' as EventData['category'],
    time: '',
    venue: '',
    description: '',
    coordinatorId: ''
  });

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.time || !formData.venue || !formData.description || !formData.coordinatorId) {
      toast.error('All fields are required for synchronization.');
      return;
    }

    addEvent({
      name: formData.name,
      category: formData.category,
      date: formData.time,
      location: formData.venue,
      description: formData.description,
      coordinatorId: formData.coordinatorId,
      // Generic fields for the registry view
      tag: 'NEW',
      price: 0,
      imageAlt: formData.name
    });

    toast.success('Event successfully deployed to the grid.');
    setIsModalOpen(false);
    
    // Reset form
    setFormData({
      name: '',
      category: 'Technical',
      time: '',
      venue: '',
      description: '',
      coordinatorId: ''
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full bg-[#0a0a0a] overflow-hidden">
      {/* Background Reference Image (Low opacity) */}
      <img
        src={dashboardImg}
        alt="Dashboard Reference"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
      />

      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-red-500">
              <span className="material-symbols-outlined text-[18px]">security</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Administrator Terminal</span>
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">System Control</h1>
          </div>
          
          <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Dialog.Trigger asChild>
              <button className="btn-glow bg-red-600 hover:bg-red-500 text-white font-black px-6 py-3 rounded-lg flex items-center gap-3 transition-all text-xs uppercase tracking-widest">
                <span className="material-symbols-outlined">add</span>
                Initialize New Event
              </button>
            </Dialog.Trigger>
            
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fade-in" />
              <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-neutral-900/90 backdrop-blur-md border border-red-600/30 p-8 rounded-2xl shadow-2xl z-50 focus:outline-none overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-pink-400 to-red-600" />
                
                <Dialog.Title className="text-xl font-black text-white uppercase tracking-tighter mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500">settings_input_component</span>
                  Initialize New <span className="text-pink-400">Event</span>
                </Dialog.Title>
                <Dialog.Description className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest mb-6 border-b border-white/5 pb-4">
                  Constructing <span className="text-pink-400/50">digital node</span> for deployment
                </Dialog.Description>

                <form onSubmit={handleDeploy} className="space-y-5">
                  <div className="space-y-1.5 relative">
                    <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest block ml-1">Event Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="ENTER PROTOCOL NAME"
                        className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors placeholder:text-neutral-700"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-pink-400/30 animate-pulse" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest block ml-1">Category</label>
                      <div className="relative">
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value as EventData['category']})}
                          className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="Technical">Technical</option>
                          <option value="Creative">Creative</option>
                          <option value="Sports">Sports</option>
                          <option value="Workshop">Workshop</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none text-sm">expand_more</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest block ml-1">Temporal Sync</label>
                      <input 
                        type="time" 
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest block ml-1">Deployment Zone</label>
                      <input 
                        type="text" 
                        value={formData.venue}
                        onChange={(e) => setFormData({...formData, venue: e.target.value})}
                        placeholder="VENUE / ZONE"
                        className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors placeholder:text-neutral-700"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest block ml-1">Coordinator ID</label>
                      <input 
                        type="text" 
                        value={formData.coordinatorId}
                        onChange={(e) => setFormData({...formData, coordinatorId: e.target.value})}
                        placeholder="ADMIN-XXX"
                        className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors placeholder:text-neutral-700 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest block ml-1">Technical Brief</label>
                    <textarea 
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="DETAILED SPECIFICATIONS"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors placeholder:text-neutral-700 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <Dialog.Close asChild>
                      <button type="button" className="flex-1 py-3 rounded-lg border border-white/5 bg-white/5 text-[10px] font-black text-neutral-400 uppercase tracking-widest hover:bg-white/10 transition-all">
                        Abort
                      </button>
                    </Dialog.Close>
                    <button type="submit" className="flex-[2] py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 group/btn">
                       <span className="material-symbols-outlined text-sm group-hover/btn:text-pink-300 transition-colors">rocket_launch</span>
                       Deploy <span className="group-hover/btn:text-pink-300 transition-colors">Event</span>
                    </button>
                  </div>
                </form>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {/* Admin Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Attendee Metrics */}
          <div className="glass-card p-6 rounded-xl border border-white/5 space-y-4">
            <div className="flex justify-between items-start text-neutral-500">
              <span className="text-[10px] font-bold uppercase tracking-widest">Attendee Metrics</span>
              <span className="material-symbols-outlined text-[18px]">groups</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-white">4,281</div>
              <div className="flex items-center gap-2 text-[10px] text-teal-500 font-bold uppercase">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+12.4% Sync Rate</span>
              </div>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-red-600" />
            </div>
          </div>

          {/* Card 2: System Latency */}
          <div className="glass-card p-6 rounded-xl border border-white/5 space-y-4">
            <div className="flex justify-between items-start text-neutral-500">
              <span className="text-[10px] font-bold uppercase tracking-widest">System Latency</span>
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-white">12ms</div>
              <div className="flex items-center gap-2 text-[10px] text-teal-500 font-bold uppercase">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Optimized Performance</span>
              </div>
            </div>
            <div className="flex gap-1 h-8 items-end">
              {[40, 60, 30, 80, 50, 90, 40, 60, 70, 40].map((h, i) => (
                <div key={i} className="flex-1 bg-red-600/30 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Card 3: Active Buffers */}
          <div className="glass-card p-6 rounded-xl border border-white/5 space-y-4">
            <div className="flex justify-between items-start text-neutral-500">
              <span className="text-[10px] font-bold uppercase tracking-widest">Active Sessions</span>
              <span className="material-symbols-outlined text-[18px]">hub</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-white">{150 + allEvents.length}</div>
              <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span>Live Uplinks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Interface Action Area (Event Creation Focus) */}
        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="border-b border-white/5 px-8 py-4 flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Deployment Queue</span>
            <div className="flex gap-4">
              <span className="text-[10px] font-bold text-red-500 uppercase cursor-pointer">Live</span>
              <span className="text-[10px] font-bold text-neutral-600 uppercase cursor-pointer hover:text-neutral-400">Scheduled</span>
              <span className="text-[10px] font-bold text-neutral-600 uppercase cursor-pointer hover:text-neutral-400">Archived</span>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            {allEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-transparent hover:border-red-600/30 transition-all cursor-pointer group animate-fade-in">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
                     <span className="material-symbols-outlined">{event.category === 'Technical' ? 'terminal' : 'event'}</span>
                   </div>
                   <div className="space-y-1">
                     <div className="text-sm font-black text-white uppercase tracking-wider">{event.name}</div>
                     <div className="text-[10px] text-neutral-500 uppercase font-bold">Deploying to: {event.location} • {event.date}</div>
                   </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="hidden md:block text-right">
                    <div className="text-xs font-black text-white">{event.category === 'Technical' ? '92%' : '85%'}</div>
                    <div className="text-[9px] text-neutral-500 uppercase">Capacity</div>
                  </div>
                  <div className="flex gap-2">
                    <span className="material-symbols-outlined text-neutral-600 hover:text-red-500 transition-colors">edit</span>
                    <span className="material-symbols-outlined text-neutral-600 hover:text-red-500 transition-colors">delete</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Aesthetic Design Elements (Vector line language) */}
      <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
      <div className="fixed right-10 top-20 w-px h-64 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
    </div>
  );
};

export default AdminDashboard;
