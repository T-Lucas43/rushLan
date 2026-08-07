"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Coffee, Crown, Gamepad2,
  Headphones, Instagram, MapPin, Menu, Monitor, MousePointer2, Phone, ShieldCheck,
  Sparkles, Trophy, UsersRound, Wifi, X, Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { contact, equipment, events, plans } from "@/lib/site-data";

type IconType = typeof Monitor;

const navigation = [
  { label: "Início", href: "/" }, { label: "PC Gamer", href: "/pc-gamer" },
  { label: "PS5", href: "/ps5" }, { label: "Corujões", href: "/corujoes" },
  { label: "Eventos", href: "/eventos" }, { label: "Planos", href: "/planos" },
  { label: "Galeria", href: "/galeria" }, { label: "Contato", href: "/contato" },
];

const benefits: { title: string; subtitle: string; Icon: IconType }[] = [
  { title: "PC Gamer", subtitle: "Alta performance", Icon: Monitor },
  { title: "PS5", subtitle: "Última geração", Icon: Gamepad2 },
  { title: "Corujões", subtitle: "Noites inesquecíveis", Icon: Clock3 },
  { title: "Ambiente", subtitle: "Climatizado", Icon: Sparkles },
  { title: "Atendimento", subtitle: "De qualidade", Icon: Headphones },
];

const gallery = [
  { id: 1, title: "Gameplay na Rush", type: "Ambiente", image: "/images/rush-ambiente.png" },
  { id: 2, title: "Setups iluminados", type: "Ambiente", image: "/images/rush-ambiente.png" },
  { id: 3, title: "Noites de gameplay", type: "Corujões", image: "/images/rush-ambiente.png" },
  { id: 4, title: "Comunidade Rush", type: "Eventos", image: "/images/rush-ambiente.png" },
  { id: 5, title: "Experiência premium", type: "Ambiente", image: "/images/rush-ambiente.png" },
  { id: 6, title: "A próxima partida", type: "Eventos", image: "/images/rush-ambiente.png" },
];

function RushMark() {
  return <Link href="/" className="brand" aria-label="Rush Lan House - página inicial">
    <img className="brand-logo" src="/images/rush-mark.png" alt="Rush Lan House" />
  </Link>;
}

function ButtonLink({ href, children, variant = "gold", className = "", external = false }: { href: string; children: ReactNode; variant?: "gold" | "ghost" | "line"; className?: string; external?: boolean }) {
  const classes = `button button-${variant} ${className}`;
  if (external) return <a className={classes} href={href} target="_blank" rel="noreferrer">{children}<ArrowRight size={16} /></a>;
  return <Link className={classes} href={href}>{children}<ArrowRight size={16} /></Link>;
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(8px)" }} whileInView={reduce ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.65, delay, ease: [0.2, 0.7, 0.2, 1] }}>{children}</motion.div>;
}

function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [path]);
  return <>
    <header className={`header ${scrolled || path !== "/" ? "header-solid" : ""}`}>
      <div className="shell nav-shell"><RushMark />
        <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(item => <Link className={path === item.href ? "active" : ""} href={item.href} key={item.href}>{item.label}</Link>)}</nav>
        <ButtonLink href="/reservar" className="nav-cta">Reservar agora</ButtonLink>
        <button className="menu-trigger" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu size={23} /></button>
      </div>
    </header>
    <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mobile-menu-top"><RushMark /><button className="close-menu" onClick={() => setOpen(false)} aria-label="Fechar menu"><X /></button></div>
      <nav>{navigation.map((item, index) => <motion.div key={item.href} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + index * 0.045 }}><Link href={item.href}>{item.label}<ArrowRight /></Link></motion.div>)}</nav>
      <ButtonLink href="/reservar" className="mobile-book">Reservar agora</ButtonLink>
      <div className="mobile-social"><a href={contact.instagram} target="_blank" rel="noreferrer"><Instagram /> Instagram</a><a href={contact.whatsapp} target="_blank" rel="noreferrer"><Phone /> WhatsApp</a></div>
    </motion.div>}</AnimatePresence>
  </>;
}

function SectionIntro({ eyebrow, title, text, align = "left" }: { eyebrow: string; title: ReactNode; text?: string; align?: "left" | "center" }) {
  return <Reveal className={`section-intro ${align === "center" ? "centered" : ""}`}><p className="eyebrow"><span />{eyebrow}</p><h2>{title}</h2>{text && <p className="section-copy">{text}</p>}</Reveal>;
}

function Footer() {
  return <footer className="footer"><div className="shell footer-grid"><div><RushMark /><p className="footer-description">O seu destino definitivo para jogos, diversão e experiências que ficam na memória.</p><div className="social-row"><a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a><a href={contact.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"><span>Tk</span></a><a href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Phone /></a></div></div><div><p className="footer-heading">Navegação</p>{navigation.slice(0, 5).map(item => <Link className="footer-link" key={item.href} href={item.href}>{item.label}</Link>)}</div><div><p className="footer-heading">Mais Rush</p>{navigation.slice(5).map(item => <Link className="footer-link" key={item.href} href={item.href}>{item.label}</Link>)}<a className="footer-link" href={contact.community} target="_blank" rel="noreferrer">Comunidade</a></div><div><p className="footer-heading">Fale com a gente</p><a className="footer-contact" href={contact.whatsapp} target="_blank" rel="noreferrer"><Phone /> WhatsApp</a><a className="footer-contact" href={contact.instagram} target="_blank" rel="noreferrer"><Instagram /> @rushlanhouse</a><a className="footer-contact" href={contact.linktree} target="_blank" rel="noreferrer"><Zap /> Todos os links</a></div></div><div className="shell footer-base"><span>© {new Date().getFullYear()} Rush Lan House.</span><span>Jogue no seu melhor.</span></div></footer>;
}

function Hero() {
  const reduce = useReducedMotion();
  return <section className="hero"><div className="hero-art" /><div className="hero-grid" /><div className="hero-vignette" /><div className="shell hero-shell"><motion.div className="hero-content" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.13, delayChildren: reduce ? 0 : 0.15 } } }}>
    <motion.p className="eyebrow" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}><span />A experiência Rush</motion.p>
    <motion.h1 variants={{ hidden: { opacity: 0, y: 28, filter: "blur(7px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }}>O seu<br /><em>destino</em><br />definitivo</motion.h1>
    <motion.p className="hero-kicker" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>Para jogos e diversão.</motion.p>
    <motion.p className="hero-text" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>Uma experiência gamer completa, com equipamentos de alta performance, ambiente climatizado e tudo o que você precisa para jogar no seu melhor.</motion.p>
    <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}><ButtonLink href="/reservar">Reservar agora</ButtonLink><ButtonLink href="/planos" variant="ghost">Ver planos</ButtonLink></motion.div>
  </motion.div></div><div className="shell feature-wrap"><div className="feature-grid">{benefits.map(({ title, subtitle, Icon }, index) => <Reveal key={title} delay={index * .08}><div className="feature-card"><Icon /><div><b>{title}</b><small>{subtitle}</small></div></div></Reveal>)}</div></div></section>;
}

function EquipmentPreview() {
  return <section className="section equipment-section"><div className="shell"><div className="split-block pc-block"><div className="media-card"><img src="/images/rush-ambiente.png" alt="Ambiente de computadores gamer da Rush Lan House" /><div className="media-badge"><Zap />Alta performance</div></div><div className="split-content"><SectionIntro eyebrow="PC Gamer" title={<>Seu jogo pede <em>performance.</em></>} text="Setups prontos para suas partidas mais intensas, do competitivo à resenha com a galera." /><div className="spec-row"><span><Monitor />Monitores gamer</span><span><MousePointer2 />Periféricos</span><span><Wifi />Internet rápida</span></div><ButtonLink href="/pc-gamer">Conhecer PCs</ButtonLink></div></div><div className="split-block ps-block"><div className="split-content"><SectionIntro eyebrow="PlayStation 5" title={<>Multiplayer, <em>sem limites.</em></>} text="Chame seu squad, escolha o jogo e viva a experiência de console com conforto, tela grande e clima de competição." /><div className="spec-row"><span><Gamepad2 />PS5</span><span><UsersRound />Multiplayer</span><span><Coffee />Mais diversão</span></div><ButtonLink href="/ps5">Reservar PS5</ButtonLink></div><div className="console-visual"><div className="console-glow" /><Gamepad2 /><p>Press start<br /><b>to Rush.</b></p><span className="console-line line-one" /><span className="console-line line-two" /></div></div></div></section>;
}

function NightPreview() {
  return <section className="section night-section"><div className="night-backdrop" /><div className="shell night-layout"><div><SectionIntro eyebrow="Corujões" title={<>Quando a noite chega, <em>a Rush acende.</em></>} text="Gameplay, energia e histórias para contar. Os nossos corujões são feitos para quem não quer que a partida acabe cedo." /><div className="night-perks"><span><Trophy />Desafios e brindes</span><span><Coffee />Lanches e bebidas</span><span><UsersRound />Comunidade Rush</span></div></div><Reveal delay={.16}><article className="event-highlight"><div className="event-orbit" /><p>Próximo evento</p><h3>Corujão<br />na <em>Rush</em></h3><div className="event-divider" /><span className="event-soon">Acompanhe as novidades nas redes</span><a href={contact.community} target="_blank" rel="noreferrer" className="small-action">Entrar na comunidade <ArrowRight size={15} /></a></article></Reveal></div></section>;
}

function PlansPreview() {
  return <section className="section plans-section"><div className="shell"><SectionIntro align="center" eyebrow="Planos" title={<>Escolha o ritmo da sua <em>gameplay.</em></>} text="Planos pensados para você jogar mais e aproveitar cada minuto na Rush." /><div className="plans-grid">{plans.map((plan, index) => <Reveal delay={index * .06} key={plan.name}><article className={`plan-card ${plan.featured ? "featured" : ""}`}>{plan.featured && <span className="popular-tag">Mais escolhido</span>}<p>{plan.name}</p><h3><small>R$</small> {plan.price}<sup>,00</sup></h3><span className="plan-detail">{plan.detail}</span><ul><li><Check />Ambiente climatizado</li><li><Check />Suporte da equipe</li><li><Check />Internet de alta velocidade</li></ul><ButtonLink href={`/reservar?plano=${encodeURIComponent(plan.name)}`} variant={plan.featured ? "gold" : "line"}>Escolher plano</ButtonLink></article></Reveal>)}</div></div></section>;
}

function GalleryPreview() { return <section className="section gallery-preview"><div className="shell"><div className="gallery-head"><SectionIntro eyebrow="Galeria" title={<>O cenário das suas <em>melhores partidas.</em></>} text="Uma prévia do que te espera na Rush." /><ButtonLink href="/galeria" variant="ghost">Ver galeria</ButtonLink></div><div className="gallery-mosaic">{gallery.slice(0, 4).map((item, index) => <Reveal delay={index * .08} key={item.id} className={`mosaic-item mosaic-${index + 1}`}><img src={item.image} alt={item.title} /><div><span>{item.type}</span><b>{item.title}</b></div></Reveal>)}</div></div></section>; }

function Home() { return <><Hero /><EquipmentPreview /><NightPreview /><PlansPreview /><GalleryPreview /><ContactBanner /></>; }

function ContactBanner() { return <section className="contact-banner"><div className="shell contact-banner-inner"><div><p className="eyebrow"><span />A Rush te espera</p><h2>Pronto para <em>jogar?</em></h2><p>Fale com a equipe, confira a programação e entre para a comunidade.</p></div><div className="contact-banner-actions"><ButtonLink href="/reservar">Reservar agora</ButtonLink><ButtonLink href={contact.whatsapp} external variant="ghost">Chamar no WhatsApp</ButtonLink></div></div></section>; }

const pageContent: Record<string, { eyebrow: string; title: ReactNode; copy: string; image: string; points: string[]; cta: string }> = {
  "/pc-gamer": { eyebrow: "PC Gamer", title: <>Seu melhor jogo<br /><em>começa aqui.</em></>, copy: "Uma estrutura gamer feita para quem busca conforto, imersão e performance em cada partida.", image: "/images/rush-ambiente.png", points: ["Equipamentos de alta performance", "Monitores, cadeiras e periféricos gamer", "Internet rápida para jogar sem interrupções", "Ambiente climatizado e equipe por perto"], cta: "Reservar PC Gamer" },
  "/ps5": { eyebrow: "PlayStation 5", title: <>O squad, o controle<br />e a <em>próxima vitória.</em></>, copy: "A experiência de console para reunir a galera, disputar aquela revanche e se divertir de verdade.", image: "/images/rush-ambiente.png", points: ["PlayStation 5 em ambiente preparado", "Experiência local para jogar com o squad", "Conforto para maratonar seus jogos", "Reserva simples e rápida"], cta: "Reservar PS5" },
  "/corujoes": { eyebrow: "Corujões", title: <>A madrugada é<br /><em>da Rush.</em></>, copy: "Quintas, sextas e sábados, das 22h às 6h. Nos outros dias, acontece com pelo menos sete pessoas confirmadas.", image: "/images/rush-ambiente.png", points: ["Quinta, sexta e sábado: 22h às 6h", "Sexta e sábado: R$ 40 PCs · R$ 50 consoles", "Demais dias: R$ 35 PCs · R$ 40 consoles", "Outros dias com mínimo de 7 pessoas confirmadas"], cta: "Entrar na comunidade" },
};

function DetailPage({ path }: { path: string }) {
  const item = pageContent[path];
  const isNight = path === "/corujoes";
  return <><section className="inner-hero"><div className="inner-hero-art" style={{ backgroundImage: `url(${item.image})` }} /><div className="shell inner-hero-content"><Reveal><p className="eyebrow"><span />{item.eyebrow}</p><h1>{item.title}</h1><p>{item.copy}</p><ButtonLink href={isNight ? contact.community : "/reservar"} external={isNight}>{item.cta}</ButtonLink></Reveal></div></section><section className="section detail-section"><div className="shell detail-grid"><Reveal><div className="detail-picture"><img src={item.image} alt={item.eyebrow} /><div className="detail-picture-glow" /></div></Reveal><div><SectionIntro eyebrow="Experiência Rush" title={<>Tudo pronto para <em>o seu momento.</em></>} /><ul className="check-list">{item.points.map(point => <li key={point}><span><Check /></span>{point}</li>)}</ul><div className="detail-callout"><ShieldCheck /><p><b>Quer tirar uma dúvida?</b><br />Nossa equipe atende pelo WhatsApp.</p><a href={contact.whatsapp} target="_blank" rel="noreferrer"><ArrowRight /></a></div></div></div></section><ContactBanner /></>;
}

function EventsPage() { return <><section className="page-hero compact-hero"><div className="shell"><Reveal><p className="eyebrow"><span />Agenda Rush</p><h1>Eventos para<br /><em>ficar na memória.</em></h1><p>Campeonatos, corujões e experiências para reunir a comunidade que vive o game.</p></Reveal></div></section><section className="section"><div className="shell events-list">{events.map((event, index) => <Reveal delay={index * .1} key={event.title}><article className="event-card"><div className="event-number">0{index + 1}</div><div><p>{event.tag}</p><h2>{event.title}</h2><span>{event.text}</span></div><div className="event-meta"><span><CalendarDays />{event.date}</span><span><Clock3 />{event.time}</span></div><a href={index === 1 ? contact.tournaments : contact.community} target="_blank" rel="noreferrer" aria-label={`Saiba mais sobre ${event.title}`}><ArrowRight /></a></article></Reveal>)}</div></section><ContactBanner /></>; }

function PlansPage() { return <><section className="page-hero compact-hero plans-hero"><div className="shell"><Reveal><p className="eyebrow"><span />Planos Rush</p><h1>Mais tempo.<br /><em>Mais jogo.</em></h1><p>Escolha seu plano e prepare-se para aproveitar a Rush no seu ritmo.</p></Reveal></div></section><PlansPreview /><section className="section plan-note"><div className="shell"><div><Sparkles /><h3>Planos fáceis de escolher.</h3><p>Os preços acima estão organizados como dados configuráveis para manter a tabela sempre atualizada.</p></div><ButtonLink href="/reservar">Fazer reserva</ButtonLink></div></section></>; }

function GalleryPage() {
  const [filter, setFilter] = useState("Todos"); const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null);
  const filtered = filter === "Todos" ? gallery : gallery.filter(item => item.type === filter);
  return <><section className="page-hero compact-hero gallery-hero"><div className="shell"><Reveal><p className="eyebrow"><span />Galeria</p><h1>Viva a<br /><em>experiência Rush.</em></h1><p>Espaço, luzes, partidas e momentos que fazem parte da nossa comunidade.</p></Reveal></div></section><section className="section"><div className="shell"><div className="gallery-filters">{["Todos", "Ambiente", "Corujões", "Eventos"].map(type => <button className={filter === type ? "selected" : ""} onClick={() => setFilter(type)} key={type}>{type}</button>)}</div><motion.div layout className="full-gallery">{filtered.map(item => <motion.button layout key={item.id} onClick={() => setSelected(item)} className="gallery-tile"><img src={item.image} alt={item.title} /><span>{item.type}</span><b>{item.title}</b></motion.button>)}</motion.div></div></section><AnimatePresence>{selected && <motion.div className="lightbox" onClick={() => setSelected(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button onClick={() => setSelected(null)} aria-label="Fechar imagem"><X /></button><motion.figure initial={{ scale: .94, y: 14 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94, y: 14 }} onClick={event => event.stopPropagation()}><img src={selected.image} alt={selected.title} /><figcaption>{selected.title}<span>{selected.type}</span></figcaption></motion.figure></motion.div>}</AnimatePresence></>; }

function ContactPage() { return <><section className="page-hero compact-hero contact-hero"><div className="shell"><Reveal><p className="eyebrow"><span />Contato</p><h1>Chegou a hora<br />de dar <em>play.</em></h1><p>Entre em contato, siga a Rush e acompanhe tudo que está rolando.</p></Reveal></div></section><section className="section contact-page"><div className="shell contact-grid"><div><SectionIntro eyebrow="Fale com a Rush" title={<>A comunidade começa <em>aqui.</em></>} text="Use nossos canais oficiais para reservas, dúvidas e novidades." /><div className="contact-cards"><a href={contact.whatsapp} target="_blank" rel="noreferrer"><span><Phone /></span><div><small>WhatsApp</small><b>Falar com o atendente</b></div><ArrowRight /></a><a href={contact.instagram} target="_blank" rel="noreferrer"><span><Instagram /></span><div><small>Instagram</small><b>@rushlanhouse</b></div><ArrowRight /></a><a href={contact.linktree} target="_blank" rel="noreferrer"><span><Zap /></span><div><small>Links oficiais</small><b>Linktree da Rush</b></div><ArrowRight /></a></div></div><Reveal className="location-card"><div className="map-lines" /><MapPin /><p>Localização</p><h3>Encontre a Rush<br />pelas redes oficiais.</h3><span>A localização e os horários atualizados são compartilhados no Instagram da Rush.</span><a href={contact.instagram} target="_blank" rel="noreferrer">Abrir Instagram <ArrowRight size={15} /></a></Reveal></div></section><section className="community-strip"><div className="shell"><UsersRound /><div><b>Faça parte da comunidade Rush</b><span>Participe do grupo para receber novidades.</span></div><a href={contact.community} target="_blank" rel="noreferrer">Entrar no grupo <ArrowRight /></a></div></section><RegistrationInfo /></>; }

function RegistrationInfo() {
  return <section className="registration-section"><div className="shell registration-grid"><div><p className="eyebrow"><span />Cadastro Rush</p><h2>Seu cadastro deixa a experiência <em>mais segura.</em></h2><p>Ele é necessário para jogar ou permanecer no local. Faça o cadastro até as 19h, apresentando um documento original — não aceitamos fotos de documentos.</p></div><div className="registration-card"><div><ShieldCheck /><h3>Documentos aceitos</h3></div><ul><li>RG</li><li>Carteira de Trabalho</li><li>Passaporte</li><li>CNH física ou digital</li><li>E-Título</li></ul><p><b>Indique um amigo:</b> após o cadastro, os dois ganham uma hora grátis.</p><a href="https://rushlanhouse.com.br/menores_10_anos.pdf" target="_blank" rel="noreferrer">Autorização para menores de 10 anos <ArrowRight size={14} /></a><a href="https://rushlanhouse.com.br/menores_maior_de_10.pdf" target="_blank" rel="noreferrer">Autorização para maiores de 10 anos <ArrowRight size={14} /></a></div></div></section>;
}

function BookingPage() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(equipment[0]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [time, setTime] = useState("14:00");
  const [duration, setDuration] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const slots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  const weekDays = useMemo(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    return Array.from({ length: 7 }, (_, index) => {
      const value = new Date(monday); value.setDate(monday.getDate() + index);
      const isToday = value.toDateString() === today.toDateString();
      return {
        id: value.toISOString().slice(0, 10),
        day: value.getDate(),
        weekday: value.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "").toUpperCase(),
        month: value.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "").toUpperCase(),
        full: isToday ? "Hoje" : value.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }),
        isToday,
      };
    });
  }, []);
  const date = weekDays[selectedDay].full;
  const canAdvance = step < 3 || Boolean(form.name.trim() && form.phone.trim() && form.email.includes("@"));
  const total = duration === 4 ? selected.packagePrice : selected.price * duration;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (step < 4) { if (canAdvance) setStep(current => current + 1); }
    else setSubmitted(true);
  };
  const title = ["Equipamento", "Data e horário", "Seus dados", "Confirmação"];

  if (submitted) return <section className="booking-success"><div className="success-light" /><motion.div initial={{ opacity: 0, y: 20, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }}><div className="success-check"><Check /></div><p className="eyebrow"><span />Reserva enviada</p><h1>Até logo na<br /><em>Rush!</em></h1><p>Recebemos a sua solicitação. A equipe da Rush confirmará os detalhes pelo WhatsApp informado.</p><div className="success-summary"><span>{selected.name}</span><span>{date} · {time}</span><b>R$ {total},00</b></div><ButtonLink href="/">Voltar ao início</ButtonLink></motion.div></section>;

  return <section className="booking-page"><div className="booking-backdrop" /><div className="shell booking-shell"><div className="booking-heading"><p className="eyebrow"><span />Reserva online</p><h1>Faça sua <em>reserva.</em></h1><p>Escolha seu equipamento, horário e deixe o resto com a Rush.</p></div><div className="stepper">{title.map((label, index) => <div key={label} className={step >= index + 1 ? "step-active" : ""}><span>{step > index + 1 ? <Check /> : index + 1}</span><b>{label}</b></div>)}</div><form onSubmit={submit} className="booking-panel"><AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: .25 }}>
    {step === 1 ? <><div className="booking-title"><span>01</span><div><h2>Escolha o equipamento</h2><p>Selecione onde sua próxima partida começa.</p></div></div><div className="booking-equipment">{equipment.map(item => <button type="button" onClick={() => setSelected(item)} className={selected.id === item.id ? "equipment-choice selected" : "equipment-choice"} key={item.id}><img src="/images/rush-ambiente.png" alt="" /><div><span>{item.type}</span><h3>{item.name}</h3><p>{item.description}</p><b>R$ {item.price},00 <small>por hora</small></b></div>{selected.id === item.id ? <i><Check /></i> : null}</button>)}</div></> : null}
    {step === 2 ? <><div className="booking-title"><span>02</span><div><h2>Defina data e horário</h2><p>Escolha o melhor momento para você.</p></div></div><div className="week-picker-heading"><div><CalendarDays /><span>Calendário da semana</span></div><b>{weekDays[0].day} {weekDays[0].month} — {weekDays[6].day} {weekDays[6].month}</b></div><div className="week-calendar">{weekDays.map((day, index) => <button type="button" aria-label={`Selecionar ${day.full}`} className={selectedDay === index ? "selected" : ""} onClick={() => setSelectedDay(index)} key={day.id}><span>{day.weekday}</span><b>{day.day}</b><small>{day.month}</small>{day.isToday ? <i>Hoje</i> : null}</button>)}</div><div className="time-head"><h3>Escolha o horário</h3><span>Alguns horários podem estar indisponíveis</span></div><div className="time-slots">{slots.map((slot, index) => <button disabled={index === 2 || index === 8} type="button" className={time === slot ? "selected" : ""} onClick={() => setTime(slot)} key={slot}>{slot}</button>)}</div><div className="duration-picker"><span>Duração</span>{[1, 2, 3, 4].map(hours => <button type="button" key={hours} className={duration === hours ? "selected" : ""} onClick={() => setDuration(hours)}>{hours}h{hours === 4 ? " · pacote" : ""}</button>)}</div></> : null}
    {step === 3 ? <><div className="booking-title"><span>03</span><div><h2>Seus dados</h2><p>Precisamos de poucas informações para falar com você.</p></div></div><div className="booking-fields"><label>Nome completo<input value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder="Como podemos te chamar?" required /></label><label>WhatsApp<input value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} placeholder="(00) 00000-0000" required /></label><label>E-mail<input type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} placeholder="voce@email.com" required /></label></div></> : null}
    {step === 4 ? <><div className="booking-title"><span>04</span><div><h2>Confirme sua reserva</h2><p>Confira os dados antes de enviar a solicitação.</p></div></div><div className="reservation-summary"><div><span>Equipamento</span><b>{selected.name} · {selected.type}</b></div><div><span>Data</span><b>{date}</b></div><div><span>Horário</span><b>A partir das {time}</b></div><div><span>Duração estimada</span><b>{duration} {duration === 1 ? "hora" : "horas"}</b></div><div className="summary-total"><span>Valor estimado</span><b>R$ {total},00</b></div></div><p className="booking-disclaimer">Esta é uma solicitação de reserva. A confirmação final será feita pela equipe da Rush pelo WhatsApp.</p></> : null}
  </motion.div></AnimatePresence><div className="booking-actions">{step > 1 ? <button type="button" className="back-button" onClick={() => setStep(current => current - 1)}>Voltar</button> : null}{step < 4 ? <button className="button button-gold" type="submit" disabled={!canAdvance}>Continuar <ArrowRight size={16} /></button> : <button className="button button-gold" type="submit">Enviar solicitação <Check size={16} /></button>}</div></form></div></section>;
}

function App() {
  const path = usePathname();
  const page = useMemo(() => {
    if (path === "/") return <Home />;
    if (path in pageContent) return <DetailPage path={path} />;
    if (path === "/eventos") return <EventsPage />;
    if (path === "/planos") return <PlansPage />;
    if (path === "/galeria") return <GalleryPage />;
    if (path === "/contato") return <ContactPage />;
    if (path === "/reservar") return <BookingPage />;
    return <Home />;
  }, [path]);
  return <><Header path={path} /><main>{page}</main>{path !== "/reservar" && <Footer />}<a className="floating-whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label="Falar com a Rush no WhatsApp"><Phone /></a></>;
}

export default App;
