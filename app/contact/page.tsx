"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Resend } from "resend";
import { sendEmail } from "@/actions/sendEmail";
import { Header } from "@/components/header";
import { HeaderNavigation } from "@/components/headerNavigation";
import { Footer } from "@/components/contactSection/footer";
import { BgImagesContainer } from "@/components/contactSection/bgImagesContainer";
import { useState } from "react";
import { links } from "@/data/data";
import { useRef } from "react";
import { gsap } from "gsap";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "This field has to be filled.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),

  message: z.string().min(1, { message: "This field has to be filled." }),
});

export type TFormSchema = z.infer<typeof formSchema>;

export default function ProfileForm() {
  const [status, setStatus] = useState<
    "Initial" | "Loading" | "Success" | "Error"
  >("Initial");
  const bgImagesSharedRef = useRef<gsap.core.Tween | null>(null);
  
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onMyFormSubmit = async (data: z.infer<typeof formSchema>) => {
    setStatus("Loading");
    const isSuccess = await sendEmail(data);
    if (isSuccess) {
      form.reset();
      setStatus("Success");
    } else {
      setStatus("Error");
    }
  };

  const renderButtonText = (
    status: "Initial" | "Loading" | "Success" | "Error",
  ) => {
    switch (status) {
      case "Success":
        return "Message Sent 👍";

      case "Error":
        return "Something Went Wrong ❌";

      case "Loading":
        return "Sending Message ⌛";

      default:
        return (
          <>
            Submit
            <svg
              className="ml-[0.3em] w-[0.7em] rotate-45 transition-transform group-hover:translate-x-1 "
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.6357 15.6701L20.3521 10.5208C21.8516 6.02242 22.6013 3.77322 21.414 2.58595C20.2268 1.39869 17.9776 2.14842 13.4792 3.64788L8.32987 5.36432C4.69923 6.57453 2.88392 7.17964 2.36806 8.06698C1.87731 8.91112 1.87731 9.95369 2.36806 10.7978C2.88392 11.6852 4.69923 12.2903 8.32987 13.5005C8.91282 13.6948 9.2043 13.792 9.44793 13.9551C9.68404 14.1131 9.88687 14.316 10.0449 14.5521C10.208 14.7957 10.3052 15.0872 10.4995 15.6701C11.7097 19.3008 12.3148 21.1161 13.2022 21.6319C14.0463 22.1227 15.0889 22.1227 15.933 21.6319C16.8204 21.1161 17.4255 19.3008 18.6357 15.6701Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M16.2116 8.84823C16.5061 8.55696 16.5087 8.0821 16.2174 7.78758C15.9262 7.49307 15.4513 7.49044 15.1568 7.78171L16.2116 8.84823ZM10.6626 14.336L16.2116 8.84823L15.1568 7.78171L9.60787 13.2695L10.6626 14.336Z"
                fill="currentColor"
              />
            </svg>
          </>
        );
    }
  };

  return (
    <>
      <Header color="Light"></Header>
      <HeaderNavigation />
      <main className="darkGradient relative flex min-h-screen w-full flex-col items-center justify-center px-paddingX py-paddingY text-colorLight">
        <BgImagesContainer bgImagesSharedRef={bgImagesSharedRef} />
        
        <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Get In Touch Form */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h1 className="mb-4 text-[clamp(24px,_4vw,_48px)] font-bold leading-[1.1] tracking-tight text-white">
              Get In Touch
            </h1>
            <p className="mb-8 text-[clamp(16px,_1.5vw,_20px)] text-white/80">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onMyFormSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className=" ">
                      <FormLabel className="text-white/90">Name</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="Your Name" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/30"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="yourname123@email.com" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/30"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="border-b">
                      <FormLabel className="text-white/90">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-[10em] bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/30"
                          placeholder="Type your message here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-auto rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold transition-all duration-300 px-6 py-3"
                  disabled={status === "Loading"}
                >
                  {renderButtonText(status)}
                </Button>
              </form>
            </Form>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Connect With Me Card */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="mb-6 text-[clamp(20px,_3vw,_32px)] font-bold leading-[1.1] tracking-tight text-white">
                Connect With Me
              </h2>
              <div className="space-y-4">
                <a 
                  href="mailto:rusirasandulhw@gmail.com" 
                  className="flex items-center gap-3 p-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4.499c0-.732-.397-1.369-.99-1.719L10 2.001a2 2 0 00-1.997.001L2.003 5.884A2 2 0 002 7.001v6a2 2 0 002.003 1.999zM10 11.001l7.997 3.998A2 2 0 0018 14.5v-6a2 2 0 00-.003-.616L10 6.001v5zM8 6.001L2.003 9.999A2 2 0 002 11.501v6a2 2 0 002.003 1.999L8 11.001v-5z"/>
                  </svg>
                  <span className="text-white/90">rusirasandulhw@gmail.com</span>
                </a>
                
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.054 0-1.872.867-1.872 1.947v2.234c-.316.192-.694.801-.694.801 0 1.368.673 2.574 1.912 2.574 1.924 0 3.486-.846 4.401-2.236.599-.111.793.261.793.577v2.234c0 .316-.192.694-.801.694-.801 0-1.368-.673-2.574-1.912-2.574-1.924 0-3.486.846-4.401 2.236-.599.111-.793-.261-.793-.577v-2.234c-3.338.726-4.033 1.416-4.033 1.416-.546 1.387-1.333 1.756-1.333 1.054 0 1.872-.867 1.872-1.947v-2.234z"/>
                  </svg>
                  <span className="text-white/90">GitHub</span>
                </a>
                
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-2.432-.14-3.223-.14-1.495 0-2.855.539-3.632 1.426-.878-.798-1.432-1.432-1.432-2.86 0-5.17 3.425-5.17 5.17v2.234h-3.554v-8.147h3.554v-2.234c0-3.425 3.425-5.17 5.17-5.17 1.495 0 2.855-.539 3.632-1.426.878.798 1.432 1.432 1.432 2.86 0 5.17-3.425 5.17-5.17v-2.234z"/>
                  </svg>
                  <span className="text-white/90">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Let's Work Together Card */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="mb-6 text-[clamp(20px,_3vw,_32px)] font-bold leading-[1.1] tracking-tight text-white">
                Let's Work Together
              </h2>
              <p className="text-[clamp(16px,_1.5vw,_20px)] text-white/80 leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>
          </div>
        </div>
        
        <Footer className="bottom-0 left-0"></Footer>
      </main>
    </>
  );
}
