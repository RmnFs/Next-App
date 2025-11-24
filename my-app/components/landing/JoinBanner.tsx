import Link from 'next/link';

export default function JoinBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-400 text-center text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Join FoodHub Today</h2>
        <p className="text-orange-100 mb-8">
          Sign up, add your recipes, and become part of our growing community.
        </p>
        <Link
          href="/login"
          className="bg-white text-orange-600 px-6 py-3 rounded-md font-medium hover:bg-orange-50 transition"
        >
          Get Started →
        </Link>
      </div>
    </section>
  );
}