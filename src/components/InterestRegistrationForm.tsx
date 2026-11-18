import { useState, type FormEvent } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { BRAND_INFO, getWhatsAppUrl } from '../data/hotelData';

interface InterestRegistrationFormProps {
  tone?: 'dark' | 'light';
  sourcePage?: string;
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error';

export function InterestRegistrationForm({
  tone = 'dark',
  sourcePage = '/',
}: InterestRegistrationFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [status, setStatus] = useState<SubmissionState>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const isDark = tone === 'dark';

  const inputBase = isDark
    ? 'w-full min-h-[48px] px-4 py-3 bg-[#F2EDE3]/8 border border-[#D8C9B5]/25 text-[#F2EDE3] placeholder:text-[#F2EDE3]/40 text-sm focus:border-[#A58A64] focus:outline-none transition-colors'
    : 'w-full min-h-[48px] px-4 py-3 bg-white/75 border border-[#292824]/20 text-[#292824] placeholder:text-[#292824]/45 text-sm focus:border-[#A58A64] focus:outline-none transition-colors';

  const labelClass = isDark
    ? 'block text-[11px] font-medium tracking-[0.18em] uppercase text-[#D8C9B5] mb-2'
    : 'block text-[11px] font-medium tracking-[0.18em] uppercase text-[#292824]/75 mb-2';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedWhatsapp = whatsappNumber.trim();

    if (trimmedName.length < 2) {
      setStatus('error');
      setFeedbackMessage('Please enter your full name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus('error');
      setFeedbackMessage('Please enter a valid email address.');
      return;
    }

    if (trimmedWhatsapp && !/^[+\d\s()-]{7,24}$/.test(trimmedWhatsapp)) {
      setStatus('error');
      setFeedbackMessage('Please enter a valid WhatsApp number or leave it blank.');
      return;
    }

    if (!consentAccepted) {
      setStatus('error');
      setFeedbackMessage(
        'Please confirm your consent to receive Maison Haven opening announcements and reservation updates.'
      );
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: trimmedName,
          email: trimmedEmail,
          whatsappNumber: trimmedWhatsapp || undefined,
          consentAccepted,
          sourcePage,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        duplicate?: boolean;
        message?: string;
        error?: string;
      };

      if (response.status === 409 && data.duplicate) {
        setStatus('duplicate');
        setFeedbackMessage(
          data.message ||
            'This email address is already registered on our pre-opening priority list.'
        );
        return;
      }

      if (!response.ok) {
        setStatus('error');
        setFeedbackMessage(
          data.error || 'We could not record your registration right now. Please try again.'
        );
        return;
      }

      setStatus('success');
      setFeedbackMessage(
        data.message ||
          'Thank you for registering your interest in Maison Haven. We will notify you ahead of our opening.'
      );
      setFullName('');
      setEmail('');
      setWhatsappNumber('');
      setConsentAccepted(false);
    } catch {
      setStatus('error');
      setFeedbackMessage(
        'Unable to reach the registration service. Please try again or message us directly via WhatsApp.'
      );
    }
  };

  if (status === 'success' || status === 'duplicate') {
    return (
      <div
        className={`p-7 sm:p-9 border ${
          isDark
            ? 'border-[#A58A64]/45 bg-[#F2EDE3]/6 text-[#F2EDE3]'
            : 'border-[#A58A64]/45 bg-[#D8C9B5]/25 text-[#292824]'
        }`}
        role="status"
      >
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 border border-[#A58A64] flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-4 h-4 text-[#A58A64]" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#A58A64]">
              {status === 'duplicate' ? 'Already Registered' : 'Registration Confirmed'}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal">
              {status === 'duplicate'
                ? 'Your interest is already on file.'
                : 'Thank you for your interest in Maison Haven.'}
            </h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-[#F2EDE3]/80' : 'text-[#292824]/80'}`}>
              {feedbackMessage}
            </p>
            <div className="pt-3 flex flex-wrap items-center gap-6 text-xs tracking-[0.14em] uppercase">
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setFeedbackMessage('');
                }}
                className={`underline underline-offset-4 cursor-pointer ${
                  isDark ? 'text-[#D8C9B5] hover:text-[#F2EDE3]' : 'text-[#292824] hover:text-[#A58A64]'
                }`}
              >
                Register Another Guest
              </button>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A58A64] hover:underline underline-offset-4"
              >
                WhatsApp Desk ({BRAND_INFO.telephoneDisplay})
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`interest-name-${tone}`} className={labelClass}>
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={`interest-name-${tone}`}
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor={`interest-email-${tone}`} className={labelClass}>
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input
            id={`interest-email-${tone}`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`interest-whatsapp-${tone}`} className={labelClass}>
          WhatsApp Number <span className="normal-case tracking-normal opacity-70">(Optional)</span>
        </label>
        <input
          id={`interest-whatsapp-${tone}`}
          name="whatsappNumber"
          type="tel"
          autoComplete="tel"
          placeholder="+234 ..."
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          className={inputBase}
        />
      </div>

      <label className="flex items-start gap-3.5 cursor-pointer pt-1">
        <input
          type="checkbox"
          checked={consentAccepted}
          onChange={(e) => setConsentAccepted(e.target.checked)}
          className="mt-1 w-4 h-4 accent-[#A58A64] cursor-pointer shrink-0"
          required
        />
        <span className={`text-xs leading-relaxed ${isDark ? 'text-[#F2EDE3]/75' : 'text-[#292824]/75'}`}>
          I agree to receive relevant pre-opening announcements, launch news, and future reservation updates from Maison Haven. Live bookings are not active until official opening.
        </span>
      </label>

      {status === 'error' && feedbackMessage && (
        <div
          role="alert"
          className={`flex items-start gap-2.5 p-3.5 border text-xs leading-relaxed ${
            isDark
              ? 'border-[#D8C9B5]/40 bg-[#F2EDE3]/10 text-[#F2EDE3]'
              : 'border-[#292824]/30 bg-[#D8C9B5]/35 text-[#292824]'
          }`}
        >
          <AlertCircle className="w-4 h-4 text-[#A58A64] shrink-0 mt-0.5" aria-hidden="true" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`min-h-[48px] px-8 py-3.5 text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-200 cursor-pointer disabled:opacity-60 ${
            isDark
              ? 'bg-[#F2EDE3] text-[#292824] hover:bg-[#D8C9B5]'
              : 'bg-[#292824] text-[#F2EDE3] hover:bg-[#3A3832]'
          }`}
        >
          {status === 'submitting' ? 'Submitting…' : 'Register Your Interest'}
        </button>

        <p className={`text-xs ${isDark ? 'text-[#F2EDE3]/55' : 'text-[#292824]/60'}`}>
          Pre-opening priority list · Maitama, Abuja
        </p>
      </div>
    </form>
  );
}
