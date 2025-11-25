export default function HowItWorksPage() {
    return (
        <section className="py-20 bg-white text-center px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-orange-600 mb-10">How It Works</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 border border-orange-100 rounded-lg shadow-sm">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-orange-600 mb-2">Discover</h3>
                        <p className="text-gray-600">
                            Browse through our extensive collection of recipes. Filter by difficulty, price, or prep time to find exactly what you need.
                        </p>
                    </div>

                    <div className="p-6 border border-orange-100 rounded-lg shadow-sm">
                        <div className="text-4xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-orange-600 mb-2">Share</h3>
                        <p className="text-gray-600">
                            Create an account to share your own recipes. Add details, photos, and step-by-step instructions to guide others.
                        </p>
                    </div>

                    <div className="p-6 border border-orange-100 rounded-lg shadow-sm">
                        <div className="text-4xl mb-4">🍳</div>
                        <h3 className="text-xl font-semibold text-orange-600 mb-2">Cook</h3>
                        <p className="text-gray-600">
                            Follow the recipes and cook delicious meals. Save your favorites and manage your own recipe collection easily.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
