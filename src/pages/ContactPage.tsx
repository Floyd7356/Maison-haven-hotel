import { useState, type FormEvent } from 'react';
import { AlertCircle, Check, ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BRAND_INFO, getWhatsAppUrl } from '../data/hotelData';

type EnquiryState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<EnquiryState>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (fullName.trim().length < 2) {
      setStatus('error');
      setFeedback('Please provide your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error');
      setFeedback('Please provide a valid email address.');
      return;
    }
    if (subject.trim().length < 3) {
      setStatus('error');
      setFeedback('Please specify a subject for your enquiry.');
      return;
    }
    if (message.trim().length < 10) {
      setStatus('error');
      setFeedback('Please include a brief message (at least 10 characters).');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = (await response.json()) as { ok?: boolean; message?: string; error?: string };
      if (!response.ok) {
        setStatus('error');
        setFeedback(data.error || 'Unable to submit your enquiry. Please try again.');
        return;
      }

      setStatus('success');
      setFeedback(
        data.message ||
          'Thank you for contacting Maison Haven. Your enquiry has been recorded.'
      );
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch {
      setStatus('error');
      setFeedback(
        'Could not reach the enquiry service. Please contact us directly on WhatsApp or telephone (+234 816 752 4467).'
      );
    }
  };

  return (
    <div>
      {/* Editorial Header */}
      <section className="pt-16 sm:pt-24 pb-14 border-b border-[#292824]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
              Contact & Pre-Opening Desk
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#292824] text-balance">
              We Welcome Your Enquiries Ahead of Opening.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#292824]/80">
              While Maison Haven prepares to welcome its first guests in Maitama, Abuja, our pre-opening team is reachable by telephone, WhatsApp, or the enquiry form below.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Contact & Enquiry Form */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Verified Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-2">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#A58A64]">
                  Direct Channels
                </p>
                <h2 className="font-serif text-3xl font-normal text-[#292824]">
                  {BRAND_INFO.displayTitle}
                </h2>
                <p className="text-sm text-[#292824]/75">{BRAND_INFO.location}</p>
              </div>

              <dl className="divide-y divide-[#292824]/12 border-y border-[#292824]/12">
                <div className="py-5 space-y-2">
                  <dt className="text-xs font-medium tracking-[0.18em] uppercase text-[#292824]/55">
                    Telephone
                  </dt>
                  <dd className="flex items-center justify-between gap-4">
                    <a
                      href={BRAND_INFO.telephoneHref}
                      className="inline-flex items-center gap-2.5 text-lg font-medium text-[#292824] hover:text-[#A58A64] transition-colors tabular-nums"
                    >
                      <Phone className="w-4 h-4 text-[#A58A64]" aria-hidden="true" />
                      <span>{BRAND_INFO.telephoneDisplay}</span>
                    </a>
                    <a
                      href={BRAND_INFO.telephoneHref}
                      className="text-xs tracking-[0.14em] uppercase underline underline-offset-4 text-[#292824]/70 hover:text-[#292824]"
                    >
                      Call Now
                    </a>
                  </dd>
                </div>

                <div className="py-5 space-y-3">
                  <dt className="text-xs font-medium tracking-[0.18em] uppercase text-[#292824]/55">
                    WhatsApp
                  </dt>
                  <dd className="space-y-3">
                    <p className="text-base font-medium text-[#292824] tabular-nums">
                      {BRAND_INFO.telephoneDisplay}
                    </p>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 min-h-[44px] px-5 py-2.5 bg-[#292824] text-[#F2EDE3] text-xs font-medium tracking-[0.16em] uppercase hover:bg-[#3A3832] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#D8C9B5]" aria-hidden="true" />
                      <span>Message on WhatsApp</span>
                    </a>
                  </dd>
                </div>

                <div className="py-5 space-y-1.5">
                  <dt className="text-xs font-medium tracking-[0.18em] uppercase text-[#292824]/55">
                    Email (Planned Address)
                  </dt>
                  <dd>
                    <p className="text-base font-medium text-[#292824]">
                      {BRAND_INFO.plannedEmail}
                    </p>
                    <p className="text-xs text-[#292824]/60 mt-1">
                      Planned official address; mail server configuration is pending prior to opening. For prompt responses today, please use telephone, WhatsApp, or the enquiry form.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Contact Enquiry Form */}
            <div className="lg:col-span-7 bg-[#EAE2D3] p-7 sm:p-10 border border-[#292824]/12">
              <div className="space-y-2 mb-7">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#A58A64]">
                  Send a Message
                </p>
                <h2 className="font-serif text-3xl font-normal text-[#292824]">
                  Pre-Opening Enquiry Form
                </h2>
              </div>

              {status === 'success' ? (
                <div className="p-6 border border-[#A58A64]/45 bg-[#F2EDE3] space-y-3" role="status">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#A58A64] shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl text-[#292824]">Enquiry Received</h3>
                      <p className="text-sm leading-relaxed text-[#292824]/80">{feedback}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setStatus('idle');
                          setFeedback('');
                        }}
                        className="pt-2 text-xs font-medium tracking-[0.16em] uppercase underline underline-offset-4 text-[#292824] hover:text-[#A58A64] cursor-pointer"
                      >
                        Send Another Enquiry
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[11px] font-medium tracking-[0.18em] uppercase text-[#292824]/75 mb-2"
                      >
                        Full Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full min-h-[48px] px-4 py-3 bg-[#F2EDE3] border border-[#292824]/20 text-sm text-[#292824] placeholder:text-[#292824]/45 focus:border-[#A58A64] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[11px] font-medium tracking-[0.18em] uppercase text-[#292824]/75 mb-2"
                      >
                        Email Address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full min-h-[48px] px-4 py-3 bg-[#F2EDE3] border border-[#292824]/20 text-sm text-[#292824] placeholder:text-[#292824]/45 focus:border-[#A58A64] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-[11px] font-medium tracking-[0.18em] uppercase text-[#292824]/75 mb-2"
                      >
                        Telephone / WhatsApp <span className="normal-case opacity-65">(Optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 ..."
                        className="w-full min-h-[48px] px-4 py-3 bg-[#F2EDE3] border border-[#292824]/20 text-sm text-[#292824] placeholder:text-[#292824]/45 focus:border-[#A58A64] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-[11px] font-medium tracking-[0.18em] uppercase text-[#292824]/75 mb-2"
                      >
                        Subject <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Pre-opening enquiry, corporate stay, event..."
                        className="w-full min-h-[48px] px-4 py-3 bg-[#F2EDE3] border border-[#292824]/20 text-sm text-[#292824] placeholder:text-[#292824]/45 focus:border-[#A58A64] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[11px] font-medium tracking-[0.18em] uppercase text-[#292824]/75 mb-2"
                    >
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How may our pre-opening team assist you?"
                      className="w-full px-4 py-3 bg-[#F2EDE3] border border-[#292824]/20 text-sm text-[#292824] placeholder:text-[#292824]/45 focus:border-[#A58A64] focus:outline-none resize-y"
                    />
                  </div>

                  {status === 'error' && feedback && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 p-3.5 border border-[#292824]/30 bg-[#F2EDE3] text-xs text-[#292824]"
                    >
                      <AlertCircle className="w-4 h-4 text-[#A58A64] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{feedback}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="min-h-[48px] px-8 py-3.5 bg-[#292824] text-[#F2EDE3] text-xs font-medium tracking-[0.18em] uppercase hover:bg-[#3A3832] transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Submit Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps District Reference Section */}
      <section className="py-16 sm:py-24 border-t border-[#292824]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
                  Location Reference
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#292824]">
                  Maitama, Abuja.
                </h2>
                <p className="text-sm leading-relaxed text-[#292824]/80">
                  Maison Haven is situated within Maitama, one of Abuja’s most serene, leafy, and established diplomatic and residential districts.
                </p>
              </div>

              <div className="p-5 bg-[#EAE2D3] border border-[#292824]/12 space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#A58A64] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-xs leading-relaxed text-[#292824]/80">
                    General Maitama district reference shown. Exact street address and property entrance coordinates will be published prior to official opening.
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Maitama+Abuja+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] uppercase text-[#292824] hover:text-[#A58A64] underline underline-offset-4"
                >
                  <span>View Maitama District in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 min-h-[360px] border border-[#292824]/15 bg-[#EAE2D3]">
              <iframe
                title="Maitama, Abuja District Reference Map"
                src="https://maps.google.com/maps?q=Maitama,Abuja,Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[360px] border-0 grayscale-[35%] contrast-[0.95]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
