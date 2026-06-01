"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";

export default function PrivacyPage() {
  const lang = useLang() || "ko";
  const router = useRouter();

  const items = [
    { icon: "🚫", title: TEXTS.privacyCollect[lang], desc: TEXTS.privacyCollectDesc[lang] },
    { icon: "💻", title: TEXTS.privacyProcess[lang], desc: TEXTS.privacyProcessDesc[lang] },
    { icon: "⏱️", title: TEXTS.privacyRetention[lang], desc: TEXTS.privacyRetentionDesc[lang] },
    { icon: "🤝", title: TEXTS.privacyThird[lang], desc: TEXTS.privacyThirdDesc[lang] },
  ];

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader onBack={() => router.back()} backLabel={TEXTS.prev[lang]} />

      <section className="max-w-md md:max-w-2xl mx-auto px-5 pt-6 pb-16">
        <h1 className="text-[24px] font-extrabold text-gray-900 tracking-tight mb-2">{TEXTS.privacyPageTitle[lang]}</h1>
        <p className="text-[14px] text-gray-500 font-medium mb-7">{TEXTS.privacyPageSub[lang]}</p>

        {/* 핵심 안심 박스 */}
        <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-6 mb-7">
          <p className="text-[18px] font-extrabold text-green-900 mb-1.5">🔒 {TEXTS.privacyHero[lang]}</p>
          <p className="text-[14px] text-green-700 leading-relaxed">{TEXTS.privacyHeroDesc[lang]}</p>
        </div>

        <div className="space-y-3 mb-7">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-[15px] font-extrabold text-gray-900 mb-1">{item.title}</p>
                <p className="text-[13px] text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 면책 */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-2xl mb-7">
          <p className="text-[15px] font-extrabold text-amber-900 mb-1">{TEXTS.privacyDisclaimerTitle[lang]}</p>
          <p className="text-[13px] text-amber-800 leading-relaxed">{TEXTS.privacyDisclaimerDesc[lang]}</p>
        </div>

        <p className="text-[12px] text-gray-400 mb-7">{TEXTS.privacyUpdated[lang]}</p>

        <Link href="/" className="block w-full text-center py-4 rounded-2xl font-extrabold text-[16px] bg-blue-700 text-white hover:bg-blue-800 transition-colors">
          {TEXTS.homeBtn[lang]}
        </Link>
      </section>
    </main>
  );
}