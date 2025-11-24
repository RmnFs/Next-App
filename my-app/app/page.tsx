import PopularRecipes from '@/components/landing/PopularRecipes';
import Testimonials from '@/components/landing/Testimonials';
import JoinBanner from '@/components/landing/JoinBanner';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import HeroSection from '@/components/landing/HeroSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <PopularRecipes />
      <Testimonials />
      <JoinBanner />
    </>
  );
}