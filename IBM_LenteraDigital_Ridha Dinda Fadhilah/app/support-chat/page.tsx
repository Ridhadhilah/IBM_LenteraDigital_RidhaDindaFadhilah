"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Sparkles, MessageSquareHeart } from "lucide-react";
import {
  aiChatbotSupport,
  type AIChatbotSupportOutput,
} from "@/ai/flows/ai-chatbot-support";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LenteraLogo } from "@/components/icons";

const FormSchema = z.object({
  text: z.string().min(10, {
    message: "Ceritakan perasaan Anda (min. 10 karakter).",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function SupportChatPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AIChatbotSupportOutput | null>(null);
  const [userInput, setUserInput] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { text: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setUserInput(data.text);

    try {
      const response = await aiChatbotSupport({ reportText: data.text });
      setResult(response);
      form.reset();
    } catch (err) {
      setError("Terjadi kesalahan. Bot kami sedang istirahat, silakan coba lagi nanti.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-2 mb-8 text-center">
        <MessageSquareHeart className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Chat Bantuan Emosional AI
        </h1>
        <p className="text-muted-foreground">
          Anda tidak sendirian. Ceritakan apa yang Anda rasakan, dan bot AI kami
          akan memberikan dukungan awal.
        </p>
      </div>

      <div className="space-y-6">
        {result && (
          <>
            <div className="flex items-start gap-3 justify-end">
              <div className="p-4 rounded-lg bg-primary text-primary-foreground max-w-lg">
                <p>{userInput}</p>
              </div>
              <Avatar>
                <AvatarImage src="https://placehold.co/100x100.png" alt="User"/>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback className="bg-accent text-accent-foreground p-1">
                  <LenteraLogo />
                </AvatarFallback>
              </Avatar>
              <div className="p-4 rounded-lg bg-muted max-w-lg">
                <p className="whitespace-pre-wrap">{result.chatbotResponse}</p>
              </div>
            </div>
          </>
        )}

        {isLoading && (
            <div className="flex items-start gap-3">
                 <Avatar>
                    <AvatarFallback className="bg-accent text-accent-foreground p-1">
                      <LenteraLogo />
                    </AvatarFallback>
                  </Avatar>
                <div className="flex items-center space-x-2 p-4 rounded-lg bg-muted max-w-lg">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>AI sedang berpikir...</span>
                </div>
            </div>
        )}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Textarea
                {...form.register("text")}
                placeholder="Ceritakan apa yang kamu rasakan atau alami..."
                className="pr-20 min-h-[60px]"
                aria-invalid={form.formState.errors.text ? "true" : "false"}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)();
                  }
                }}
              />
              <Button type="submit" disabled={isLoading} className="absolute top-1/2 right-2 -translate-y-1/2">
                <Sparkles className="h-4 w-4" />
                <span className="sr-only">Kirim</span>
              </Button>
            </div>
            {form.formState.errors.text && (
              <p className="text-sm font-medium text-destructive mt-2">
                {form.formState.errors.text.message}
              </p>
            )}
          </CardContent>
        </Card>
      </form>
      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
