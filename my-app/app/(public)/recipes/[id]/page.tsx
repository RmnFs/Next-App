export default async function ItemPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    return (
        <div className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-4xl font-bold mb-8">Item Details</h1>
            <p>Details for item {id}</p>
        </div>
    )
}
