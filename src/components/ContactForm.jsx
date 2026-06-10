import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { createMessage } from "@/services/messageService";

// Form validation schema matching backend requirements
const contactFormSchema = z.object({
  fullName: z
    .string({
      required_error: "Full name is required",
    })
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),

  emailAddress: z
    .string({
      required_error: "Email address is required",
    })
    .email("Please enter a valid email address")
    .toLowerCase(),

  subject: z
    .string({
      required_error: "Subject is required",
    })
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject cannot exceed 200 characters"),

  message: z
    .string({
      required_error: "Message is required",
    })
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
});

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [submitMessage, setSubmitMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      emailAddress: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setSubmitStatus(null);
      setSubmitMessage("");

      const response = await createMessage(data);

      if (response.status === 201) {
        setSubmitStatus("success");
        setSubmitMessage(
          "Thank you! Your message has been sent successfully. We'll get back to you soon."
        );
        form.reset();
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");

      if (error.response?.data?.message) {
        setSubmitMessage(error.response.data.message);
      } else {
        setSubmitMessage("Failed to send message");
      }
    }
  };

  return (
    <Card className="shadow-xl bg-gradient-to-br from-white to-gray-50/50 border-border border">
      <CardHeader className="space-y-6 pb-8">
        <div className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Get In Touch
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-md mx-auto">
            Have questions or need assistance? We'd love to hear from you.
          </CardDescription>
        </div>

        {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 bg-primary/5 rounded-xl border border-primary/10">
          <div className="flex items-center gap-3 text-primary">
            <div className="p-2 bg-primary/10 rounded-full">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span className="font-medium">Fill the form below</span>
          </div>

          <div className="hidden sm:block w-px h-8 bg-border"></div>
          <div className="sm:hidden w-full h-px bg-border"></div>

          <div className="flex items-center gap-3 text-primary">
            <div className="p-2 bg-primary/10 rounded-full">
              <Phone className="h-5 w-5" />
            </div>
            <div className="text-center sm:text-left">
              <span className="font-medium">Call us at</span>
              <div className="font-bold text-lg">+91 9001896382</div>
            </div>
          </div>
        </div> */}
      </CardHeader>

      <CardContent className="px-6 pb-8">
        {/* Status Message */}
        {submitStatus && (
          <div
            className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${
              submitStatus === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {submitStatus === "success" ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
            <p className="text-sm font-medium">{submitMessage}</p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-foreground">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="h-11 bg-white border-border/50 focus:border-primary transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-foreground">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="h-11 bg-white border-border/50 focus:border-primary transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-foreground">
                    Subject
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What is this message about?"
                      className="h-11 bg-white border-border/50 focus:border-primary transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please provide a brief subject for your message
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-foreground">
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-32 bg-white border-border/50 focus:border-primary transition-colors resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Share any details that will help us assist you better (up to
                    2000 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Sending Message...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Send Message
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
