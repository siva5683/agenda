import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Feedback regarding an order');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please complete all required fields', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Your message has been received! Our support hero will call you shortly.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          We are Here to Help
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-stone-900 tracking-tight">
          Get in Touch with FoodHub
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Have an inquiry about catering, bulk corporate orders, delivery areas, or kitchen partnerships? Drop us a line!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black font-heading text-stone-900">
                Message Dispatched Successfully!
              </h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. Our customer relations team has received your ticket and will respond to <strong>{email}</strong> within 30 minutes.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="bg-stone-900 text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-stone-800"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-heading font-black text-xl text-stone-900 mb-2">
                Send Us a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                >
                  <option value="Feedback regarding an order">Feedback regarding an order</option>
                  <option value="Bulk catering / Corporate inquiry">Bulk catering / Corporate inquiry</option>
                  <option value="Delivery partner partnership">Delivery partner partnership</option>
                  <option value="General inquiry">General inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Your Message / Feedback *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you today?"
                  className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-500/25 transition-transform active:scale-98 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Contact Cards & Hubs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Support channels card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-5">
            <h3 className="font-heading font-black text-lg text-stone-900 pb-3 border-b border-stone-100">
              Direct Contact Lines
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Toll-Free Customer Care</h4>
                  <p className="text-sm font-bold text-stone-900">1800-FOODHUB (1800-366-3482)</p>
                  <p className="text-xs text-stone-500">Available 24x7 for live order updates</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Customer Support Email</h4>
                  <p className="text-sm font-bold text-stone-900">support@foodhub.in</p>
                  <p className="text-xs text-stone-500">Typical response time: under 15 mins</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Kitchen Operating Hours</h4>
                  <p className="text-sm font-bold text-stone-900">10:00 AM – 03:00 AM Daily</p>
                  <p className="text-xs text-stone-500">Late night midnight delivery available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Central Hubs */}
          <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-4">
            <h3 className="font-heading font-black text-base text-stone-900">
              Major Hub Kitchens in India
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">Bengaluru HQ</span>
                <span className="text-stone-500 text-[11px]">Indiranagar & Koramangala</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">Mumbai Hub</span>
                <span className="text-stone-500 text-[11px]">Bandra West & Powai</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">Delhi NCR</span>
                <span className="text-stone-500 text-[11px]">Connaught Place & Cyber City</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">Hyderabad</span>
                <span className="text-stone-500 text-[11px]">Hitec City & Banjara Hills</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
