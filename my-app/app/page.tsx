import PopularRecipes from '@/components/landing/PopularRecipes';
import Testimonials from '@/components/landing/Testimonials';
import JoinBanner from '@/components/landing/JoinBanner';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-orange-600 mb-12">
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
      <PopularRecipes />
      <Testimonials />
      <JoinBanner />
    </>
  );
}