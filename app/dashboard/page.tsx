import CategoryTabs from '@/components/cashier/CategoryTabs'
import MenuGrid from '@/components/cashier/MenuGrid'
import OrderPanel from '@/components/cashier/OrderPanel'

export default function DashboardPage() {
  return (
    <div className="flex h-full bg-[#f8faff]">
      {/* Menu Section */}
      <div className="flex-1 p-8 overflow-y-auto">
        <CategoryTabs />

        <div className="flex items-center justify-between mb-8 mt-4">
          <h2 className="text-2xl font-bold text-gray-900">List Menu</h2>
          <p className="text-xs text-gray-400 font-medium tracking-wide">
            Total <span className="text-gray-900 font-bold">30 Menu</span>
          </p>
        </div>

        <MenuGrid />
      </div>

      {/* Order Panel */}
      <OrderPanel />
    </div>
  )
}

