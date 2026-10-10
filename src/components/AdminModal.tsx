import React, { useState, useEffect } from 'react';
import { 
  Booking, Message, getStoredBookings, getStoredMessages, 
  updateBookingStatus, markMessageRead, STUDIO_INFO 
} from '../data';
import { 
  X, Lock, ShieldCheck, Calendar, Mail, CheckCircle2, 
  XCircle, Clock, Eye, LogOut, Check, Phone, MapPin 
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState(STUDIO_INFO.email);
  const [passwordInput, setPasswordInput] = useState('wesley2026!');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'bookings' | 'messages'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (isOpen) {
      setBookings(getStoredBookings());
      setMessages(getStoredMessages());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim().toLowerCase() === STUDIO_INFO.email.toLowerCase() && passwordInput === 'wesley2026!') {
      setIsAuthenticated(true);
      setLoginError('');
      setBookings(getStoredBookings());
      setMessages(getStoredMessages());
    } else {
      setLoginError('Invalid credentials. Use ' + STUDIO_INFO.email + ' / wesley2026!');
    }
  };

  const handleStatusChange = (id: string, newStatus: 'confirmed' | 'pending' | 'cancelled') => {
    const updated = updateBookingStatus(id, newStatus);
    setBookings(updated);
  };

  const handleOpenMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      const updated = markMessageRead(msg.id);
      setMessages(updated);
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#111116] border border-[#d4af37]/40 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#22222c] bg-[#0c0c10]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
                WESLEY STUDIO CMS
              </h3>
              <p className="text-xs text-[#8e8e9c]">
                {isAuthenticated ? `Signed in as ${STUDIO_INFO.email}` : 'Director Portal Authentication'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1c1c24] hover:bg-[#d4af37] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto w-full">
            <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-6">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-white mb-2 text-center">
              Studio Portal Access
            </h2>
            <p className="text-xs text-[#8e8e9c] text-center mb-6">
              Review client shoot bookings, schedule availability, and incoming film inquiries.
            </p>

            {loginError && (
              <div className="w-full mb-4 p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-400 text-xs text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9e9ea8] mb-1 font-semibold">
                  Director Email
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9e9ea8] mb-1 font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer mt-2"
              >
                Access Dashboard
              </button>
            </form>

            <div className="mt-8 pt-4 border-t border-[#1c1c24] text-center text-xs text-[#6e6e7c]">
              <span>Default Credentials: </span>
              <code className="text-[#d4af37] font-mono">{STUDIO_INFO.email} / wesley2026!</code>
            </div>
          </div>
        ) : (
          /* Dashboard Screen */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Stats Bar & Navigation */}
            <div className="px-6 py-4 bg-[#14141b] border-b border-[#22222c] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 ${
                    activeTab === 'bookings'
                      ? 'bg-[#d4af37] text-black'
                      : 'bg-[#1c1c24] text-[#b0b0be] hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Bookings ({bookings.length})</span>
                  {pendingCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-500/30 text-amber-900 font-bold text-[10px]">
                      {pendingCount} new
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 ${
                    activeTab === 'messages'
                      ? 'bg-[#d4af37] text-black'
                      : 'bg-[#1c1c24] text-[#b0b0be] hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Inquiries ({messages.length})</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-500/30 text-red-900 font-bold text-[10px]">
                      {unreadCount} unread
                    </span>
                  )}
                </button>
              </div>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 rounded-lg border border-[#2a2a35] text-xs text-[#9090a0] hover:text-red-400 hover:border-red-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

            {/* Dashboard Content Area */}
            <div className="p-6 overflow-y-auto flex-1">
              {activeTab === 'bookings' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-cinzel text-base font-bold text-white">
                      Client Shoot & Production Requests
                    </h4>
                    <span className="text-xs text-[#7e7e8e]">
                      Total: {bookings.length} reservations
                    </span>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="p-12 text-center text-[#707080] border border-dashed border-[#22222a] rounded-xl">
                      No bookings currently registered. New client submissions will appear here.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="p-5 rounded-xl bg-[#14141b] border border-[#22222c] hover:border-[#d4af37]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-base">
                                {booking.clientName}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                                booking.status === 'confirmed'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : booking.status === 'pending'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}>
                                {booking.status}
                              </span>
                            </div>

                            <div className="text-xs text-[#d4af37] font-medium">
                              {booking.serviceName}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8e8e9c]">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                                {booking.date} at {booking.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5" />
                                {booking.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5" />
                                {booking.email}
                              </span>
                              {booking.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {booking.location}
                                </span>
                              )}
                            </div>

                            {booking.notes && (
                              <p className="text-xs text-[#a0a0b0] bg-[#0c0c10] p-2.5 rounded border border-[#1e1e26] mt-2">
                                <span className="text-[#d4af37] font-semibold">Notes: </span>
                                {booking.notes}
                              </p>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                            {booking.status !== 'confirmed' && (
                              <button
                                onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                className="px-3 py-1.5 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-semibold flex items-center gap-1 border border-emerald-500/40 cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                                Confirm
                              </button>
                            )}
                            {booking.status !== 'cancelled' && (
                              <button
                                onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                className="px-3 py-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-semibold flex items-center gap-1 border border-red-500/40 cursor-pointer"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Cancel
                              </button>
                            )}
                            <a
                              href={`mailto:${booking.email}?subject=Regarding Your Wesley Studio Session on ${booking.date}`}
                              className="px-3 py-1.5 rounded bg-[#1f1f2a] text-white hover:bg-[#d4af37] hover:text-black text-xs font-semibold flex items-center gap-1 transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              Email Client
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Messages View */
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-cinzel text-base font-bold text-white">
                      Direct Inquiries & Press Contacts
                    </h4>
                    <span className="text-xs text-[#7e7e8e]">
                      {unreadCount} unread of {messages.length} total
                    </span>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-12 text-center text-[#707080] border border-dashed border-[#22222a] rounded-xl">
                      No inquiries received yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          onClick={() => handleOpenMessage(msg)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            !msg.isRead
                              ? 'bg-[#181822] border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.06)]'
                              : 'bg-[#131319] border-[#202028] opacity-80'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-white text-sm">
                              {msg.name}
                            </span>
                            <span className="text-[10px] text-[#707080]">
                              {msg.createdAt}
                            </span>
                          </div>
                          <div className="text-xs text-[#d4af37] font-medium mb-1">
                            {msg.subject}
                          </div>
                          <p className="text-xs text-[#9090a0] line-clamp-2">
                            {msg.message}
                          </p>
                          <div className="mt-3 pt-2 border-t border-[#1e1e28] flex items-center justify-between text-[11px] text-[#606070]">
                            <span>{msg.email}</span>
                            <span className="text-[#d4af37]">Click to read & reply →</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Selected Message Modal / Card */}
                  {selectedMessage && (
                    <div className="mt-6 p-6 rounded-xl bg-[#0c0c10] border border-[#d4af37]/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-[#d4af37] uppercase font-bold tracking-wider">
                            Message from:
                          </span>
                          <h4 className="text-lg font-bold text-white">
                            {selectedMessage.name} ({selectedMessage.email})
                          </h4>
                        </div>
                        <button
                          onClick={() => setSelectedMessage(null)}
                          className="text-[#888898] hover:text-white text-xs cursor-pointer"
                        >
                          Close Preview
                        </button>
                      </div>

                      <div className="text-sm font-semibold text-[#f0f0f4]">
                        Subject: {selectedMessage.subject}
                      </div>

                      <p className="text-sm text-[#c0c0d0] leading-relaxed bg-[#14141c] p-4 rounded-lg border border-[#22222e]">
                        {selectedMessage.message}
                      </p>

                      <div className="pt-2 flex justify-end">
                        <a
                          href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                          className="px-5 py-2 rounded-full bg-[#d4af37] hover:bg-[#f3e5ab] text-black font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Reply via Email ({selectedMessage.email})
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
