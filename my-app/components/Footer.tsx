export default function Footer() {
  return (
    <footer className="bg-orange-100 border-t">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} FoodHub. All rights reserved.
      </div>
    </footer>
  );
}