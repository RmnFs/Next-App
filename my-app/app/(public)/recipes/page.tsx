import Image from "next/image";
import recipes from "@/app/data/recipes.json";
import SearchBar from "@/components/recipes/SearchBar";

export default function RecipesPage() {
  return (
    <section className="py-20 bg-white text-center px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">
          Our Recipes
        </h1>
        <p className="text-gray-600 mb-10">
          Explore authentic dishes crafted with flavor and passion.
        </p>

        <SearchBar />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {recipes.map((r) => (
            <a
              key={r.id}
              href={`/recipes/${r.id}`}
              className="block border rounded-lg shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-1 bg-white"
            >
              {/* Image section */}
              <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                <Image
                  src={r.img}
                  alt={r.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Text section */}
              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold text-orange-600 mb-1">
                  {r.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {r.desc}
                </p>
                <p className="text-orange-600 font-medium">
                  {r.meta.prepTime}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}