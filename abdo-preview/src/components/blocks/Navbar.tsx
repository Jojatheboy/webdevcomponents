"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import {
  IconHome,
  IconBuildingBank,
  IconMapPin,
  IconMessageDots,
  IconBuildings,
} from "@tabler/icons-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { empreendimentos } from "@/lib/empreendimentos";

type MenuItem = {
  title: string;
  href: string;
  icon?: React.ReactNode;
};

const mainLinks: MenuItem[] = [
  { title: "Home", href: "/#home", icon: <IconHome className="size-4" /> },
  { title: "A Construtora", href: "/#a-construtora", icon: <IconBuildingBank className="size-4" /> },
  { title: "A Cidade", href: "/#a-cidade", icon: <IconMapPin className="size-4" /> },
  { title: "Contato", href: "/#contato", icon: <IconMessageDots className="size-4" /> },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = scrolled
    ? "text-[var(--foreground)] hover:text-[var(--accent)] focus:text-[var(--accent)]"
    : "text-white hover:text-white/75 focus:text-white/75";
  const ctaColor = scrolled
    ? "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)]"
    : "bg-white text-[var(--foreground)] hover:bg-white/90";
  // logo nas cores originais sempre (cliente pediu pra não inverter)
  const logoStyle = undefined;
  const mobileBtnColor = scrolled
    ? "border-[var(--border-strong)] text-[var(--foreground)] hover:bg-[var(--surface)]"
    : "border-white/40 text-white hover:bg-white/10";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]"
          : "bg-transparent"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-6">
        {/* desktop nav */}
        <nav className="hidden lg:flex items-center justify-between h-20">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo-abdo-full.png"
                alt="ABDO Construtora"
                width={52}
                height={50}
                priority
                className="h-12 w-auto object-contain transition-[filter] duration-300"
                style={logoStyle}
              />
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                {mainLinks.slice(0, 3).map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      href={link.href}
                      className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${linkColor}`}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`bg-transparent ${linkColor}`}
                  >
                    Empreendimentos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[640px] p-4">
                      <div className="flex items-center gap-3 px-3 pb-3 mb-2 border-b border-[var(--border-subtle)]">
                        <div className="w-9 h-9 rounded-md bg-[var(--surface)] flex items-center justify-center">
                          <IconBuildings className="size-5 text-[var(--accent)]" />
                        </div>
                        <div>
                          <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-[var(--foreground-mute)]">
                            Portfólio ABDO
                          </p>
                          <p className="text-sm font-medium text-[var(--foreground)]">
                            8 empreendimentos · 212 unidades
                          </p>
                        </div>
                      </div>

                      <ul className="grid grid-cols-2 gap-1">
                        {empreendimentos.map((emp) => (
                          <li key={emp.slug}>
                            <NavigationMenuLink
                              href={`/empreendimentos/${emp.slug}`}
                              className="flex select-none gap-3 rounded-md p-3 leading-none outline-none transition-colors hover:bg-[var(--surface)]"
                            >
                              <span
                                className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${
                                  emp.status === "pronto"
                                    ? "bg-[var(--accent)] text-white"
                                    : "bg-[var(--surface)] text-[var(--foreground-soft)]"
                                }`}
                              >
                                <emp.Icon className="size-5" />
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-[var(--foreground)] truncate">
                                  {emp.nome}
                                </div>
                                <div className="mt-0.5 text-xs text-[var(--foreground-mute)] flex items-center gap-2">
                                  <span>{emp.cidade}</span>
                                  <span className="w-1 h-1 rounded-full bg-[var(--foreground-mute)]/40" />
                                  <span
                                    className={
                                      emp.status === "pronto"
                                        ? "text-[var(--accent)] font-medium"
                                        : ""
                                    }
                                  >
                                    {emp.status === "pronto"
                                      ? "Pronto pra morar"
                                      : `Entregue · ${emp.ano}`}
                                  </span>
                                </div>
                              </div>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-2 pt-3 px-3 border-t border-[var(--border-subtle)]">
                        <Link
                          href="/#empreendimentos"
                          className="text-xs text-[var(--accent)] hover:underline"
                        >
                          Ver todos no portfólio →
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/#contato"
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors ${linkColor}`}
                  >
                    Contato
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <a
            href="https://wa.me/554733493811"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-5 h-11 rounded-full text-sm transition-colors ${ctaColor}`}
            style={{ transitionDuration: "200ms" }}
          >
            <Phone className="size-4" />
            (47) 3349-3811
          </a>
        </nav>

        {/* mobile nav */}
        <div className="lg:hidden flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-abdo-full.png"
              alt="ABDO Construtora"
              width={42}
              height={40}
              priority
              className="h-10 w-auto object-contain transition-[filter] duration-300"
              style={logoStyle}
            />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Abrir menu"
                className={`inline-flex items-center justify-center w-10 h-10 rounded-md border transition-colors ${mobileBtnColor}`}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>

            <SheetContent className="w-[88vw] sm:w-96 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/images/logo-abdo-full.png"
                      alt="ABDO Construtora"
                      width={42}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="my-8 flex flex-col gap-2">
                {mainLinks.slice(0, 3).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 py-3 px-2 text-base font-medium text-[var(--foreground)] rounded-md hover:bg-[var(--surface)] transition-colors"
                  >
                    <span className="text-[var(--accent)]">{link.icon}</span>
                    {link.title}
                  </a>
                ))}

                <Accordion type="single" collapsible>
                  <AccordionItem value="empreendimentos" className="border-b-0">
                    <AccordionTrigger className="py-3 px-2 font-medium hover:no-underline rounded-md hover:bg-[var(--surface)]">
                      <span className="flex items-center gap-3">
                        <IconBuildings className="size-4 text-[var(--accent)]" />
                        Empreendimentos
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-9">
                      <ul className="flex flex-col gap-1 py-1">
                        {empreendimentos.map((emp) => (
                          <li key={emp.slug}>
                            <a
                              href={`/empreendimentos/${emp.slug}`}
                              className="flex items-start gap-3 py-2 px-2 rounded-md hover:bg-[var(--surface)]"
                            >
                              <span
                                className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                                  emp.status === "pronto"
                                    ? "bg-[var(--accent)] text-white"
                                    : "bg-[var(--surface)] text-[var(--foreground-soft)]"
                                }`}
                              >
                                <emp.Icon className="size-4" />
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-[var(--foreground)] leading-tight">
                                  {emp.nome}
                                </div>
                                <div className="text-xs text-[var(--foreground-mute)] mt-0.5">
                                  {emp.cidade} ·{" "}
                                  {emp.status === "pronto"
                                    ? "Pronto pra morar"
                                    : `Entregue ${emp.ano}`}
                                </div>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <a
                  href="/#contato"
                  className="flex items-center gap-3 py-3 px-2 text-base font-medium text-[var(--foreground)] rounded-md hover:bg-[var(--surface)] transition-colors"
                >
                  <span className="text-[var(--accent)]">
                    <IconMessageDots className="size-4" />
                  </span>
                  Contato
                </a>
              </div>

              <div className="pt-6 border-t border-[var(--border-subtle)]">
                <a
                  href="https://wa.me/554733493811"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 h-12 px-5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm"
                >
                  <Phone className="size-4" />
                  (47) 3349-3811
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
