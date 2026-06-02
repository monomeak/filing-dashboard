import { FileText } from 'lucide-react';

import { typeConfig } from './timeline-style';
import type { TimelineEvent, TimelineParty } from './types';

interface FilingDetailsProps {
  event: TimelineEvent;
}

export function FilingDetails({ event }: FilingDetailsProps) {
  const securingParties = event.details?.securingParties || event.details?.secuingParties;

  return (
    <div className="animate-in fade-in space-y-6 duration-200">
      <GeneralFilingInformation event={event} />

      {securingParties && securingParties.length > 0 && (
        <PartySection title="Securing Party Information" parties={securingParties} />
      )}

      {event.details?.securedParties && event.details.securedParties.length > 0 && (
        <PartySection title="Secured Party Information" parties={event.details.securedParties} />
      )}

      {event.details?.collateral && (
        <section className="rounded-lg border bg-card p-5 sm:p-6">
          <h2 className="mb-6 text-base font-semibold text-foreground">Collateral Information</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <Field label="Collateral Type" value={event.details.collateral.type} />

            {event.details.collateral.attachments && (
              <div>
                <p className="text-xs font-semibold uppercase text-gray-500">Attachments</p>
                <div className="mt-1 space-y-1">
                  {event.details.collateral.attachments.map((file) => (
                    <a key={file} href="#" className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline">
                      <FileText className="h-4 w-4" aria-hidden="true" />
                      {file}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 border-t pt-6">
            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Description</p>
            <p className="text-sm leading-6 text-foreground">{event.details.collateral.description}</p>
          </div>
        </section>
      )}
    </div>
  );
}

function GeneralFilingInformation({ event }: FilingDetailsProps) {
  return (
    <section className="rounded-lg border bg-card p-5 sm:p-6">
      <h2 className="mb-6 text-base font-semibold text-foreground">General Filing Information</h2>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Notice Number" value={event.noticeNumber} mono />
        <Field label="Filing Type" value={typeConfig[event.type].label} />
        <Field label="Issued At" value={event.issuedDate || event.date} />
        {event.expirationDate && <Field label="Expires At" value={event.expirationDate} />}
        {event.details?.interestType && <Field label="Interest Type" value={event.details.interestType} />}
        {event.details?.partySize && <Field label="Party Size" value={event.details.partySize} />}
        {event.details?.loanValue && <Field label="Loan Value" value={event.details.loanValue} />}
      </div>

      {event.description && (
        <div className="mt-6 border-t pt-6">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Details</p>
          <p className="mt-2 text-sm leading-6 text-foreground">{event.description}</p>
        </div>
      )}
    </section>
  );
}

interface PartySectionProps {
  title: string;
  parties: TimelineParty[];
}

function PartySection({ title, parties }: PartySectionProps) {
  return (
    <section className="rounded-lg border bg-card p-5 sm:p-6">
      <h2 className="mb-6 text-base font-semibold text-foreground">{title}</h2>
      <div className="space-y-6">
        {parties.map((party, index) => (
          <div key={`${party.name}-${index}`} className={index > 0 ? 'border-t pt-6' : ''}>
            <p className="mb-4 text-sm font-semibold text-foreground">{party.name}</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Field label="Party Type" value={party.type} small />
              <Field label="Nation ID" value={party.idNumber} small />
              {party.nameKhmer && <Field label="Full name (Khmer)" value={party.nameKhmer} small />}
            </div>

            {(party.country || party.province || party.district) && <AddressGrid party={party} />}
          </div>
        ))}
      </div>
    </section>
  );
}

function AddressGrid({ party }: { party: TimelineParty }) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Address</p>
      <div className="grid grid-cols-2 gap-4 text-sm text-foreground md:grid-cols-4">
        {party.country && <Field label="Country" value={party.country} subtle small />}
        {party.province && <Field label="Province" value={party.province} subtle small />}
        {party.district && <Field label="District" value={party.district} subtle small />}
        {party.commune && <Field label="Commune" value={party.commune} subtle small />}
        {party.phume && <Field label="Phume" value={party.phume} subtle small />}
        {party.streetNumber && <Field label="Street/House #" value={party.streetNumber} subtle small />}
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  mono?: boolean;
  small?: boolean;
  subtle?: boolean;
}

function Field({ label, value, mono, small, subtle }: FieldProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
      <p className={`${small ? 'text-sm' : 'text-base'} ${mono ? 'font-mono' : ''} mt-1 text-foreground`}>
        {value}
      </p>
      {subtle && null}
    </div>
  );
}
