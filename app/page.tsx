import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FocusAreas } from "@/components/FocusAreas";
import { Impact } from "@/components/Impact";
import { FeaturedProgrammes } from "@/components/FeaturedProgrammes";
import { LatestInitiatives } from "@/components/LatestInitiatives";
import { SuccessStories } from "@/components/SuccessStories";
import { Partners } from "@/components/Partners";
import { CallToAction } from "@/components/CallToAction";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <FocusAreas />
      <Impact />
      <FeaturedProgrammes />
      <LatestInitiatives />
      <SuccessStories />
      <Partners />
      <CallToAction />
    </>
  );
}
