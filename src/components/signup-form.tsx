"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const signupSchema = z.object({
  email: z.string().email({message: "Please enter a valid email address."}),
  password: z.string().min(6, {message: "Password must be at least 6 characters."}),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof signupSchema>;

export default function LoginForm({ 
  children,
  signupAction 
} : {
  children?: React.ReactNode;
  signupAction: (formData: FormData) => Promise<void>;
}) {

  const form = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });


  const { isSubmitting } = form.formState;
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('confirmPassword', values.confirmPassword);

    const response = await signupAction(formData);
    form.reset()
  }

  return (
    <Card className="w-full max-w-sm bg-gray-900/80 backdrop-blur-sm border-gray-700 z-10">
      <CardHeader className="text-center">
        <Link href="/">
          <CardTitle className="text-3xl font-bold text-white">
            Curio<span className="text-emerald-400">Docs</span>
          </CardTitle>
        </Link>
        <CardDescription className="text-gray-400 pt-2">
          <span>Create an account to get started</span>
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="m@example.com" 
                      {...field} 
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-emerald-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      {...field} 
                      className="bg-gray-800 border-gray-600 text-white focus:border-emerald-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      {...field} 
                      className="bg-gray-800 border-gray-600 text-white focus:border-emerald-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-4">
            <Button type="submit" className="w-full bg-emerald-600 text-white hover:bg-emerald-700" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
            </Button>
            
            {/* <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button> */}
            
            <div className="text-center text-sm text-gray-400">
              <span>Already have an account?</span>
              <Link href="/login" className="text-emerald-400 hover:underline px-1">
                <Button variant="link" className="text-emerald-400 hover:underline px-1">
                  Sign In
                </Button>
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}