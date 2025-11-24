export default function PopularRecipes() {
    const recipes = [
        { title: 'Pasta Primavera', img: '🍝', desc: 'Fresh veggies & creamy sauce' },
        { title: 'Avocado Toast', img: '🥑', desc: 'Crispy toast with guac' },
        { title: 'Berry Smoothie', img: '🍓', desc: 'Healthy and refreshing' },
        { title: 'Classic Burger', img: '🍔', desc: 'Juicy grilled perfection' },
        { title: 'Sushi Roll', img: '🍣', desc: 'Delicate and flavorful' },
        { title: 'Chocolate Cake', img: '🍰', desc: 'Rich & indulgent dessert' },
    ];

    return (
        <section className="py-20 bg-orange-50 text-center">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-12">
                    Popular Recipes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.map((r, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 border rounded-lg shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-1"
                        >
                            <div className="text-5xl mb-3">{r.img}</div>
                            <h3 className="text-xl font-semibold mb-2 text-orange-600">{r.title}</h3>
                            <p className="text-gray-600 text-sm">{r.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}