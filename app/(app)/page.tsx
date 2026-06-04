'use client'

import Link from "next/link";
import {
  FileTextOutlined as FileText,
  SafetyCertificateOutlined as ShieldCheck,
  SearchOutlined as Search,
} from "@ant-design/icons";

import { primaryNavigation } from "@/lib/routes";

export default function Page() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-10 sm:justify-center sm:px-6 sm:py-16">
      <section className="flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        <div className="space-y-5">
          <p className="text-sm font-medium text-primary">
            [Secured Transactions Filing Office]
          </p>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            File and search security right notices with confidence
          </h1>

          <p className="mx-auto max-w-2xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            FilingApp helps users file notices of security rights for movable
            property, search existing notices, and access filing office services
            through a simple and secure online platform.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={"/filing/new"}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              New Filing
            </Link>

            <Link
              href={"/search-filing"}
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-5 text-sm font-medium shadow-sm transition hover:bg-accent hover:text-accent-foreground"
            >
              Search Notices
            </Link>
          </div>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-card p-5 text-left shadow-sm">
            <FileText className="mb-4 h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">File Notices</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Submit security right notices for movable property used as
              collateral.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5 text-left shadow-sm">
            <Search className="mb-4 h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Search Records</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Check existing notices before accepting collateral for a debt.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5 text-left shadow-sm">
            <ShieldCheck className="mb-4 h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Secure Process</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Use a clear and reliable workflow for filing, searching, and
              managing notices.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
