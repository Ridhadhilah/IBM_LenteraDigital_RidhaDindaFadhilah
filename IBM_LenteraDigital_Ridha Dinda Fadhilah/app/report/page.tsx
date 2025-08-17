"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, AlertTriangle, ShieldCheck } from "lucide-react";
import { detectBullying } from "@/ai/flows/bullying-detection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  report: z.string().min(20, {
    message: "Mohon jelaskan kejadian dengan lebih detail (min. 20 karakter).",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ReportPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSupportDialog, setShowSupportDialog] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { report: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await detectBullying({ text: data.report });
      
      toast({
        title: "Laporan Terkirim",
        description: "Terima kasih, laporan Anda telah kami terima dan akan segera ditinjau.",
        variant: "default",
      });

      if (result.isBullying) {
        setShowSupportDialog(true);
      }
      form.reset();

    } catch (err) {
      setError("Gagal mengirim laporan. Silakan coba lagi.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToSupport = () => {
    setShowSupportDialog(false);
    router.push("/support-chat");
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Lapor Aman
          </h1>
          <p className="text-muted-foreground">
            Laporkan tindakan cyberbullying atau konten negatif secara anonim.
            Identitas Anda terjamin kerahasiaannya.
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Formulir Laporan Anonim</CardTitle>
              <CardDescription>
                Jelaskan kejadian yang Anda alami atau saksikan. Sertakan detail
                sebanyak mungkin untuk membantu kami menindaklanjuti.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="default" className="mb-4 bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700">
                <ShieldCheck className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <AlertTitle>Privasi Anda Terjamin</AlertTitle>
                <AlertDescription>
                  Laporan ini bersifat anonim. Kami tidak akan menyimpan
                  informasi pribadi Anda.
                </AlertDescription>
              </Alert>
              <Textarea
                {...form.register("report")}
                placeholder="Ceritakan kejadiannya di sini..."
                className="min-h-[200px] text-base"
                aria-invalid={form.formState.errors.report ? "true" : "false"}
              />
              {form.formState.errors.report && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.report.message}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="ml-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Kirim Laporan"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <AlertDialog open={showSupportDialog} onOpenChange={setShowSupportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kami di Sini Untukmu</AlertDialogTitle>
            <AlertDialogDescription>
              Kami telah menerima laporan Anda. Tampaknya Anda sedang melewati
              situasi yang sulit. Apakah Anda ingin berbicara dengan asisten AI
              kami untuk mendapatkan dukungan emosional awal?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Nanti Saja</AlertDialogCancel>
            <AlertDialogAction onClick={handleNavigateToSupport}>
              Ya, Bawa Saya ke Chat Bantuan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
