"use client";

import Link from "next/link";
import LanguageHeader, { useLang } from "@/components/LanguageHeader";
import { TEXTS } from "@/lib/i18n";

export default function PrivacyPage() {
  const lang = useLang() || "ko";

  const items = [
    { icon: "🚫", title: TEXTS.privacyCollect[lang], desc: TEXTS.privacyCollectDesc[lang] },
    { icon: "💻", title: TEXTS.privacyProcess[lang], desc: TEXTS.privacyProcessDesc[lang] },
    { icon: "⏱️", title: TEXTS.privacyRetention[lang], desc: TEXTS.privacyRetentionDesc[lang] },
    { icon: "🤝", title: TEXTS.privacyThird[lang], desc: TEXTS.privacyThirdDesc[lang] },
  ];

  return (
    <main className="min-h-screen bg-white">
      <LanguageHeader backHref="/" backLabel={TEXTS.back[lang]} />

      <section className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">{TEXTS.privacyPageTitle[lang]}</h1>
        <p className="text-sm text-gray-500 mb-8">{TEXTS.privacyPageSub[lang]}</p>

        {/* 핵심 안심 박스 */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 mb-8">
          <p className="text-base font-medium text-green-900 mb-1">{TEXTS.privacyHero[lang]}</p>
          <p className="text-sm text-green-700">{TEXTS.privacyHeroDesc[lang]}</p>
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">{item.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 면책 */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-8">
          <p className="text-sm font-medium text-amber-900 mb-1">{TEXTS.privacyDisclaimerTitle[lang]}</p>
          <p className="text-xs text-amber-800 leading-relaxed">{TEXTS.privacyDisclaimerDesc[lang]}</p>
        </div>

        <p className="text-xs text-gray-400">{TEXTS.privacyUpdated[lang]}</p>

        <div className="mt-8">
          <Link href="/" className="inline-block px-6 py-3 rounded-xl font-medium text-sm bg-blue-700 text-white hover:bg-blue-800 transition-colors">
            {TEXTS.homeBtn[lang]}
          </Link>
        </div>
      </section>
    </main>
  );
}