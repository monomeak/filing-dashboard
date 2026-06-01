import { FilingDetail } from '@/components/filing'

type FilingDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function FilingDetailPage({
  params,
}: FilingDetailPageProps) {
  const { id } = await params

  return <FilingDetail filingId={id} />
}
