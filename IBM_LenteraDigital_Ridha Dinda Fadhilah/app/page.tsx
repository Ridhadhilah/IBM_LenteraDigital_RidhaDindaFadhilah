import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  MessageSquareHeart,
  SearchX,
  ShieldAlert,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ShieldAlert,
    title: "Lapor Aman",
    description: "Laporkan kasus cyberbullying secara anonim dan aman.",
    href: "/report",
    cta: "Buat Laporan",
  },
  {
    icon: BookOpenText,
    title: "Pusat Literasi",
    description:
      "Tingkatkan pengetahuanmu tentang dunia digital dengan artikel dan video.",
    href: "/hub",
    cta: "Mulai Belajar",
  },
  {
    icon: MessageSquareHeart,
    title: "Bantuan AI",
    description: "Dapatkan dukungan emosional awal dari chatbot AI kami.",
    href: "/support-chat",
    cta: "Mulai Chat",
  },
  {
    icon: SearchX,
    title: "Deteksi Bullying",
    description: "Analisis teks untuk mendeteksi potensi ujaran kebencian.",
    href: "/bullying-detection",
    cta: "Coba Sekarang",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="p-8 rounded-xl bg-card border shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">
          Selamat Datang di Lentera Digital
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ruang amanmu untuk belajar, berbagi, dan melawan cyberbullying.
          Bersama, kita ciptakan internet yang lebih positif.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="flex flex-col transition-transform transform hover:-translate-y-1"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-md bg-primary/20">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-end mt-auto">
              <Button asChild variant="ghost" className="text-primary">
                <Link href={feature.href}>
                  {feature.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
