"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface HeroButtonProps {
  label: string;
  bgColor?: string;
  textColor?: string;
  onClick: () => void;
}

function HeroButton({
  label,
  bgColor = "bg-white",
  textColor = "text-black",
  onClick,
}: HeroButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer inline-block ${bgColor} ${textColor} font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95 hover:brightness-110`}
    >
      {label}
    </button>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/10 p-6 rounded-xl text-white">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-white/80">{description}</p>
    </div>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pb-16">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10"
        src="https://res.cloudinary.com/docxw6ugs/video/upload/v1751578703/publicmp4-compressed_vjccrc.mp4"
        autoPlay
        loop
        muted
      />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow mt-10"
      >
        {t("hero.title")}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="max-w-3xl text-lg md:text-xl text-white/80 mb-10"
      >
        {t("hero.subtitle")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-wrap justify-center gap-6"
      >
        <HeroButton
          label={t("hero.button")}
          bgColor="bg-white"
          textColor="text-black"
          onClick={() => router.push("/ask")}
        />
        <HeroButton
          label={`📄 ${t("hero.simpleGenerator", "Simple Generator")}`}
          bgColor="bg-purple-600"
          textColor="text-white"
          onClick={() => router.push("/ask-csv")}
        />
        <HeroButton
          label={`⚙️ ${t("hero.advancedGenerator", "Advanced Generator")}`}
          bgColor="bg-pink-600"
          textColor="text-white"
          onClick={() => router.push("/advanced-generator")}
        />
        <HeroButton
          label={`✉️ ${t("hero.emailDrafter", "Draft Email")}`}
          bgColor="bg-green-600"
          textColor="text-white"
          onClick={() => router.push("/email-drafter")}
        />
        <HeroButton
          label={`📝 ${t("hero.dailyExercise", "Daily Exercise")}`}
          bgColor="bg-yellow-500"
          textColor="text-black"
          onClick={() => router.push("/exercise-generator")}
        />
      </motion.div>

      <div className="mt-16 max-w-6xl mx-auto px-4 text-center">
        {/* First row with 3 features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <FeatureCard
            icon="🧠"
            title={t("hero.feature1Title", "Multi-LLM Q&A")}
            description={t(
              "hero.feature1Desc",
              "Ask several AI models at once for richer answers."
            )}
          />
          <FeatureCard
            icon="📄"
            title={t("hero.feature2Title", "Document Tools")}
            description={t(
              "hero.feature2Desc",
              "Generate PDF and Excel files with ease."
            )}
          />
          <FeatureCard
            icon="📝"
            title={t("hero.feature3Title", "Daily Exercises")}
            description={t(
              "hero.feature3Desc",
              "Boost your coding skills every day."
            )}
          />
        </div>

        {/* Second row with 2 features, centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          <FeatureCard
            icon="✉️"
            title={t("hero.feature4Title", "Email Drafting")}
            description={t(
              "hero.feature4Desc",
              "Quickly generate professional emails from your notes."
            )}
          />
          <FeatureCard
            icon="🔎"
            title={t("hero.feature5Title", "CSV/Excel Insights")}
            description={t(
              "hero.feature5Desc",
              "Upload spreadsheets and ask questions instantly."
            )}
          />
        </div>
      </div>
    </section>
  );
}
