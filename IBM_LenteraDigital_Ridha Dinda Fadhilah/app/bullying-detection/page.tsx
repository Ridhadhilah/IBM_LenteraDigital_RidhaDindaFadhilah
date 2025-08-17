"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { detectBullying, type DetectBullyingOutput } from "@/ai/flows/bullying-detection";
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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FormSchema = z.object({
  text: z.string().min(10, {
    message: "Teks harus memiliki setidaknya 10 karakter.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function BullyingDetectionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DetectBullyingOutput | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { text: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await detectBullying({ text: data.text });
      setResult(response);
    } catch (err) {
      setError("Terjadi kesalahan saat menganalisis teks. Silakan coba lagi.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Deteksi Ujaran Kebencian & Bullying
        </h1>
        <p className="text-muted-foreground">
          Gunakan alat AI kami untuk menganalisis teks dan mendeteksi potensi
          cyberbullying atau ujaran kebencian.
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Analisis Teks</CardTitle>
            <CardDescription>
              Masukkan teks yang ingin Anda analisis di bawah ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              {...form.register("text")}
              placeholder="Ketik atau tempel teks di sini..."
              className="min-h-[150px] text-base"
              aria-invalid={form.formState.errors.text ? "true" : "false"}
            />
            {form.formState.errors.text && (
              <p className="text-sm font-medium text-destructive mt-2">
                {form.formState.errors.text.message}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="ml-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menganalisis...
                </>
              ) : (
                "Analisis Teks"
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

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Hasil Analisis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.isBullying ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Potensi Bullying Terdeteksi</AlertTitle>
                <AlertDescription>
                  <p className="font-semibold mt-4">Alasan:</p>
                  <p>{result.reason}</p>
                </AlertDescription>
              </Alert>
            ) : (
               <Alert variant="default" className="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Aman</AlertTitle>
                <AlertDescription>
                  Tidak ada potensi bullying atau ujaran kebencian yang terdeteksi.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
