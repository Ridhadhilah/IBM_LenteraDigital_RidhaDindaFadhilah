import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const articles = [
  {
    title: "5 Cara Mengenali Berita Hoax di Media Sosial",
    category: "Literasi Informasi",
    image: "https://placehold.co/600x400.png",
    hint: "social media",
  },
  {
    title: "Jejak Digital: Apa yang Perlu Kamu Ketahui?",
    category: "Keamanan Digital",
    image: "https://placehold.co/600x400.png",
    hint: "digital privacy",
  },
  {
    title: "Membangun Empati di Ruang Diskusi Online",
    category: "Etika Digital",
    image: "https://placehold.co/600x400.png",
    hint: "online community",
  },
  {
    title: "Filter Bubble dan Echo Chamber: Kenali Bahayanya",
    category: "Literasi Informasi",
    image: "https://placehold.co/600x400.png",
    hint: "algorithm bias",
  },
];

const videos = [
  {
    title: "Video: Stop Cyberbullying, Be a Friend",
    category: "Anti-Bullying",
    image: "https://placehold.co/600x400.png",
    hint: "friendship support",
  },
  {
    title: "Tutorial: Mengatur Privasi Akun Instagram",
    category: "Keamanan Digital",
    image: "https://placehold.co/600x400.png",
    hint: "privacy settings",
  },
  {
    title: "Animasi: Berpikir Kritis Sebelum Membagikan",
    category: "Literasi Informasi",
    image: "https://placehold.co/600x400.png",
    hint: "critical thinking",
  },
];

export default function DigitalLiteracyHubPage() {
  return (
    <div className="container mx-auto">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Pusat Literasi Digital
        </h1>
        <p className="text-muted-foreground">
          Jelajahi artikel dan video untuk meningkatkan kecakapan digital Anda.
        </p>
      </div>

      <Tabs defaultValue="articles">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="articles">Artikel</TabsTrigger>
          <TabsTrigger value="videos">Video</TabsTrigger>
        </TabsList>
        <TabsContent value="articles" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((item) => (
              <Card key={item.title} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <CardHeader className="p-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-48"
                    data-ai-hint={item.hint}
                  />
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Badge variant="secondary">{item.category}</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((item) => (
              <Card key={item.title} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <CardHeader className="relative p-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-48"
                    data-ai-hint={item.hint}
                  />
                   <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Badge variant="secondary">{item.category}</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
