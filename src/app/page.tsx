import Hero from '@/components/Hero';
import ResumeHandler from '@/components/ResumeHandler';

export default function Home() {
  return (
    <div className="flex flex-col text-center items-center justify-items-center min-h-screen p-4 pb-20 font-[family-name:var(--font-geist-sans)]">
      <Hero />
      <ResumeHandler />
    </div>
  );
}
