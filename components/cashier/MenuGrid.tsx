import MenuCard from './MenuCard'

export default function MenuGrid() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
                <MenuCard key={i} />
            ))}
        </div>
    )
}

