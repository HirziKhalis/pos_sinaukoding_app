import { prisma } from '@/lib/prisma'
import CheckoutClient from './checkout-client'

export default async function CheckoutPage() {
    const products = await prisma.product.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' },
    })

    return (
        <div className="h-full">
            <CheckoutClient products={products} />
        </div>
    )
}
