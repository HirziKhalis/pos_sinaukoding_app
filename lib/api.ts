export async function withApiGuard(
    handler: () => Promise<Response>
): Promise<Response> {
    try {
        return await handler()
    } catch (err) {
        if (err instanceof Response) {
            return err
        }

        console.error(err)
        return new Response('Internal Server Error', { status: 500 })
    }
}
