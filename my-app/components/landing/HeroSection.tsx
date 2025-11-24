export default function HeroSection() {
    return (
        <section className="flex flex-col items-center justify-center text-center  py-24 bg-gradient-to-b from-orange-50 to-white">
            <h1 className="text-5xl font-bold text-orange-600 mb-4">
                Welcome to FoodHub
            </h1>
            <p className="max-w-xl text-gray-600 mb-8">
                Discover, share, and manage your favorite meals. Simple and delicious!
            </p>
            <a
                href="/recipes"
                className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-400"
            >
                Browse Recipes
            </a>
        </section>
    );
}
