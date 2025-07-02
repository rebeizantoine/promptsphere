"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-12 py-6 border-t border-white/10 text-white text-center text-sm bg-black bg-opacity-60 backdrop-blur-sm">
      <p className="mb-3">
        © {currentYear} PromptSphere. {t("footer.copyright")}
      </p>

      <div className="flex justify-center gap-4 mb-3">
        <Link href="/" className="hover:underline">
          {t("footer.home")}
        </Link>
        <Link href="/ask" className="hover:underline">
          {t("footer.ask")}
        </Link>
        <Link href="/ask-csv" className="hover:underline">
          {t("footer.askCsv")}
        </Link>
      </div>

      <div className="flex justify-center gap-5 text-xl">
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://twitter.com/your-twitter"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
}
