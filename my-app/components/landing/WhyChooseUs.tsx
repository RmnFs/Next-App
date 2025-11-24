export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-orange-50 text-center">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-12">
                    Why Choose FoodHub?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            title: 'Easy Recipes',
                            desc: 'Step-by-step guidance to cook each meal perfectly.',
                            icon: '🍳',
                        },
                        {
                            title: 'Fresh Ideas',
                            desc: 'Explore trending recipes shared by food lovers worldwide.',
                            icon: '🥗',
                        },
                        {
                            title: 'Manage Meals',
                            desc: 'Save, edit, and organize your favorite dishes anytime.',
                            icon: '📝',
                        },
                        {
                            title: 'Community Rated',
                            desc: 'Find what others love and leave your ratings too!',
                            icon: '⭐',
                        },
                    ].map((f, i) => (
                        <div
                            key={i}
                            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-1"
                        >
                            <div className="text-4xl mb-3">{f.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-orange-600">{f.title}</h3>
                            <p className="text-gray-600 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 