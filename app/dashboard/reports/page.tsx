import ReportHeader from '@/components/reports/ReportHeader'
import MetricsGrid from '@/components/reports/MetricsGrid'
import FiltersBar from '@/components/reports/FiltersBar'
import OrdersTable from '@/components/reports/OrdersTable'

export default function SalesReportPage() {
    return (
        <div className="p-8 space-y-8 bg-[#f8faff] min-h-full">
            <ReportHeader />
            <MetricsGrid />
            <FiltersBar />
            <OrdersTable />
        </div>
    )
}

