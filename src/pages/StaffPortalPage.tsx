import { useState, type FormEvent } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import type { StaffPortalOverview } from '../types/hospitality';

const ROLE_DEFINITIONS = [
  {
    role: 'Super Administrator',
    permissions:
      'Full owner control across staff accounts, role permissions, website content settings, all 25 rooms, reservations, payments, and financial reports.',
  },
  {
    role: 'Reception Staff',
    permissions:
      'Operational management of guest reservations, check-in/check-out workflows, guest profiles, and guest enquiry responses.',
  },
  {
    role: 'Management',
    permissions:
      'Oversight of financial and revenue reports, room category availability calendars, occupancy metrics, and operational performance.',
  },
];

export function StaffPortalPage() {
  const [accessToken, setAccessToken] = useState('');
  const [overview, setOverview] = useState<StaffPortalOverview | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthenticate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const authRes = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken }),
      });

      const authData = (await authRes.json()) as { ok?: boolean; error?: string };
      if (!authRes.ok) {
        setError(authData.error || 'Authentication failed.');
        setLoading(false);
        return;
      }

      const overviewRes = await fetch('/api/admin/overview', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const overviewData = (await overviewRes.json()) as StaffPortalOverview & { error?: string };
      if (!overviewRes.ok) {
        setError(overviewData.error || 'Unable to load management overview.');
        setLoading(false);
        return;
      }

      setOverview(overviewData);
    } catch {
      setError('Unable to reach the administration service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        <div className="border-b border-[#292824]/15 pb-8 space-y-3">
          <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
            Private Administration Architecture
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#292824]">
            Maison Haven Staff & Management Portal
          </h1>
          <p className="text-sm text-[#292824]/75 max-w-2xl">
            Restricted pre-opening administration workspace. Ordinary visitors do not have navigation links to this route.
          </p>
        </div>

        {!overview ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <form
              onSubmit={handleAuthenticate}
              className="lg:col-span-6 p-8 bg-[#EAE2D3] border border-[#292824]/15 space-y-5"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-[#A58A64]" aria-hidden="true" />
                <h2 className="font-serif text-2xl text-[#292824]">Administrator Sign In</h2>
              </div>

              <div>
                <label
                  htmlFor="admin-token"
                  className="block text-[11px] font-medium tracking-[0.18em] uppercase text-[#292824]/75 mb-2"
                >
                  Administrator Access Token
                </label>
                <input
                  id="admin-token"
                  type="password"
                  required
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="Configured via ADMIN_ACCESS_TOKEN"
                  className="w-full min-h-[48px] px-4 py-3 bg-[#F2EDE3] border border-[#292824]/20 text-sm text-[#292824] focus:border-[#A58A64] focus:outline-none"
                />
              </div>

              {error && (
                <p role="alert" className="text-xs leading-relaxed text-[#292824] bg-[#F2EDE3] p-3 border border-[#292824]/25">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="min-h-[46px] px-6 py-3 bg-[#292824] text-[#F2EDE3] text-xs font-medium tracking-[0.16em] uppercase hover:bg-[#3A3832] transition-colors cursor-pointer"
              >
                {loading ? 'Verifying…' : 'Unlock Portal'}
              </button>
            </form>

            <div className="lg:col-span-6 space-y-5">
              <h2 className="font-serif text-2xl text-[#292824]">
                Planned RBAC Governance Structure
              </h2>
              <div className="divide-y divide-[#292824]/12 border-y border-[#292824]/12">
                {ROLE_DEFINITIONS.map((item) => (
                  <div key={item.role} className="py-4 space-y-1">
                    <p className="text-sm font-medium text-[#292824]">{item.role}</p>
                    <p className="text-xs leading-relaxed text-[#292824]/75">{item.permissions}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Integration Readiness */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#A58A64]" aria-hidden="true" />
                <h2 className="font-serif text-2xl text-[#292824]">
                  Pre-Opening Systems & Integration Readiness
                </h2>
              </div>
              <div className="divide-y divide-[#292824]/12 border-y border-[#292824]/12">
                {overview.integrationReadiness.map((item) => (
                  <div key={item.area} className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 text-sm">
                    <div className="md:col-span-4 font-medium text-[#292824]">{item.area}</div>
                    <div className="md:col-span-2 text-xs uppercase tracking-wider text-[#A58A64]">
                      {item.currentState === 'active' ? 'Active' : 'Pending Setup'}
                    </div>
                    <div className="md:col-span-6 text-xs leading-relaxed text-[#292824]/75">
                      {item.requirement}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stored Pre-Opening Registrations */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-[#292824] tabular-nums">
                Pre-Opening Interest Registrations ({overview.registrations.length})
              </h2>
              {overview.registrations.length === 0 ? (
                <p className="text-sm text-[#292824]/65 py-6 border-y border-[#292824]/10">
                  No pre-opening registrations recorded yet.
                </p>
              ) : (
                <div className="overflow-x-auto border-y border-[#292824]/15">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-[#292824]/15 text-xs uppercase tracking-wider text-[#292824]/60">
                        <th className="py-3 pr-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">WhatsApp</th>
                        <th className="py-3 pl-4">Submitted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#292824]/10">
                      {overview.registrations.map((reg) => (
                        <tr key={reg.id}>
                          <td className="py-3 pr-4 font-medium">{reg.fullName}</td>
                          <td className="py-3 px-4">{reg.email}</td>
                          <td className="py-3 px-4 tabular-nums">{reg.whatsappNumber || '—'}</td>
                          <td className="py-3 pl-4 text-xs text-[#292824]/65 tabular-nums">
                            {new Date(reg.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Stored Contact Enquiries */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-[#292824] tabular-nums">
                Guest Enquiries ({overview.enquiries.length})
              </h2>
              {overview.enquiries.length === 0 ? (
                <p className="text-sm text-[#292824]/65 py-6 border-y border-[#292824]/10">
                  No guest enquiries submitted yet.
                </p>
              ) : (
                <div className="divide-y divide-[#292824]/12 border-y border-[#292824]/12">
                  {overview.enquiries.map((enq) => (
                    <div key={enq.id} className="py-4 space-y-1.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="font-medium text-sm text-[#292824]">
                          {enq.subject} · <span className="font-normal">{enq.fullName}</span>
                        </p>
                        <span className="text-xs text-[#292824]/60 tabular-nums">
                          {new Date(enq.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-[#292824]/70">
                        {enq.email} {enq.phone ? `· ${enq.phone}` : ''}
                      </p>
                      <p className="text-sm text-[#292824]/85 pt-1">{enq.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 25-Room Inventory Blueprint */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-[#292824]">
                25-Room Inventory Blueprint (Pre-Opening)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {overview.inventoryBlueprint.map((room) => (
                  <div
                    key={room.roomNumber}
                    className="p-3.5 border border-[#292824]/15 bg-[#EAE2D3]/60 text-xs space-y-1"
                  >
                    <p className="font-medium text-[#292824] tabular-nums">
                      Room {room.roomNumber}
                    </p>
                    <p className="text-[#292824]/70 capitalize">{room.category}</p>
                    <p className="text-[#A58A64] tabular-nums">
                      ₦{room.nightlyRateNgn.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
