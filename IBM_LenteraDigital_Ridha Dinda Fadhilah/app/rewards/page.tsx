import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Award, CheckCircle } from "lucide-react";

const leaderboard = [
  { rank: 1, user: "Andi S.", points: 12500, avatar: "AS" },
  { rank: 2, user: "Bunga C.", points: 11800, avatar: "BC" },
  { rank: 3, user: "Citra D.", points: 10500, avatar: "CD" },
  { rank: 4, user: "Doni E.", points: 9800, avatar: "DE" },
  { rank: 5, user: "Elisa F.", points: 9200, avatar: "EF" },
];

const waysToEarn = [
  {
    action: "Memberi komentar positif di forum",
    points: "+10 Poin",
    icon: CheckCircle,
  },
  {
    action: "Melaporkan konten negatif yang valid",
    points: "+50 Poin",
    icon: CheckCircle,
  },
  {
    action: "Menyelesaikan kuis literasi digital",
    points: "+100 Poin",
    icon: CheckCircle,
  },
  {
    action: "Berbagi artikel edukasi ke media sosial",
    points: "+25 Poin",
    icon: CheckCircle,
  },
];

export default function RewardsPage() {
  return (
    <div className="container mx-auto">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Poin & Komunitas
        </h1>
        <p className="text-muted-foreground">
          Dapatkan poin dengan berkontribusi positif dan jadilah pahlawan
          digital!
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Papan Peringkat (Leaderboard)</CardTitle>
              <CardDescription>
                Lihat kontributor paling aktif di komunitas Lentera Digital.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Pkt.</TableHead>
                    <TableHead>Pengguna</TableHead>
                    <TableHead className="text-right">Poin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard.map((player) => (
                    <TableRow key={player.rank}>
                      <TableCell className="font-medium">
                        {player.rank <= 3 ? (
                          <Award
                            className={`w-6 h-6 ${
                              player.rank === 1
                                ? "text-yellow-500"
                                : player.rank === 2
                                ? "text-gray-400"
                                : "text-orange-600"
                            }`}
                          />
                        ) : (
                          player.rank
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={`https://placehold.co/100x100.png?text=${player.avatar}`} />
                            <AvatarFallback>{player.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.user}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{player.points.toLocaleString("id-ID")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card className="bg-primary/10 border-primary/50">
            <CardHeader className="text-center">
              <CardTitle>Poin Anda</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Star className="w-12 h-12 text-accent" fill="currentColor" />
                <p className="text-5xl font-bold">1,250</p>
              </div>
              <Badge className="mt-4">Level: Pejuang Digital</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cara Mendapatkan Poin</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {waysToEarn.map((way) => (
                  <li key={way.action} className="flex items-start gap-3">
                    <way.icon className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{way.action}</p>
                      <p className="text-sm text-muted-foreground">{way.points}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
