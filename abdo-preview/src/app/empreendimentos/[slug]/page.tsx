import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Home } from "lucide-react";

import Navbar from "@/components/blocks/Navbar";
import { empreendimentos } from "@/lib/empreendimentos";

export async function generateStaticParams() {
  return empreendimentos.map((e) => ({ slug: e.slug }));
}

export default async function EmpreendimentoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const emp = empreendimentos.find((e) => e.slug === slug);

  if (!emp) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-28 md:pt-32 pb-16 sm:pb-24 min-h-screen">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6">
          <Link
            href="/#empreendimentos"
            className="inline-flex items-center gap-2 text-sm text-[var(--foreground-soft)] hover:text-[var(--accent)] transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Voltar pro portfólio
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[var(--surface)]">
                {emp.image ? (
                  <Image
                    src={emp.image}
                    alt={emp.nome}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${emp.placeholder ?? "#2c4a5e"} 0%, ${emp.placeholder ?? "#2c4a5e"}cc 100%)`,
                    }}
                  >
                    <emp.Icon className="size-32 text-white/30" />
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className={`w-10 h-10 rounded-md flex items-center justify-center ${
                    emp.status === "pronto"
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--surface)] text-[var(--foreground-soft)]"
                  }`}
                >
                  <emp.Icon className="size-5" />
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 h-7 rounded-full text-[11px] font-mono uppercase tracking-wider ${
                    emp.status === "pronto"
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--surface)] text-[var(--foreground)]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      emp.status === "pronto"
                        ? "bg-white"
                        : "bg-[var(--foreground)]"
                    }`}
                  />
                  {emp.status === "pronto" ? "Pronto pra morar" : "Entregue"}
                </span>
              </div>

              <h1 className="font-[var(--font-display)] text-[var(--foreground)] text-[clamp(32px,4.5vw,52px)] leading-[1.05] mb-4">
                {emp.nome}
              </h1>

              <p className="text-[var(--foreground-soft)] text-base md:text-lg leading-relaxed mb-8 max-w-[52ch]">
                {emp.description}
              </p>

              <div className="grid grid-cols-2 gap-px bg-[var(--border-subtle)] rounded-lg overflow-hidden mb-8">
                <Info icon={<MapPin className="size-4" />} label="Cidade" value={emp.cidade} />
                <Info icon={<Calendar className="size-4" />} label="Ano" value={emp.ano ?? "—"} />
                <Info icon={<Home className="size-4" />} label="Unidades" value={String(emp.unidades ?? "—")} />
                <Info
                  icon={<emp.Icon className="size-4" />}
                  label="Status"
                  value={emp.status === "pronto" ? "Pronto pra morar" : "Vendido"}
                />
              </div>

              <a
                href="https://wa.me/554733493811"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[var(--accent)] text-white text-sm hover:bg-[var(--accent-dark)] transition-colors"
                style={{ transitionDuration: "200ms" }}
              >
                Falar com a ABDO
              </a>

              <p className="mt-6 text-xs text-[var(--foreground-mute)]">
                Página em construção · esta é uma prévia do site
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[var(--background)] p-5 flex flex-col gap-1.5">
      <span className="flex items-center gap-2 text-[var(--foreground-mute)] text-xs font-mono uppercase tracking-wider">
        {icon}
        {label}
      </span>
      <span className="text-[var(--foreground)] text-lg font-medium">
        {value}
      </span>
    </div>
  );
}
