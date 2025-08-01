"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { InputOTP } from "@/components/ui/input-otp";
import { supabase } from "@/supabase/supabase";

const loginSchema = z.object({
  firstname: z.string().min(1, "First Name is required"),
  lastname: z.string().min(1, "Last Name is required"),
  referral: z.string().min(6, "Referral Code is required"),
  email: z.email("Invalid email address"),
  pwd: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      referral: "",
    },
  });

  const onSubmit = async (loginData: LoginSchema) => {
    const { data, error } = await supabase.auth.signUp({
      email: loginData.email,
      password: loginData.pwd,
    });

    if (error) {
      console.error(error);
    }

    console.log(data);
  };

  const handleReferralChange = (value: string) => {
    setValue("referral", value);
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 bg-[url('/login.jpg')] bg-cover bg-center overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <Link
              href="/"
              aria-label="go home"
              className="mx-auto block w-fit"
            ></Link>
            <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
              Create a RepPal Account
            </h1>
            <p className="text-sm">Welcome! Create an account to get started</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstname" className="block text-sm">
                  Firstname
                </Label>
                <Input type="text" id="firstname" {...register("firstname")} />
                {errors?.firstname && (
                  <p className="text-red-500 font-medium text-xs">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname" className="block text-sm">
                  Lastname
                </Label>
                <Input type="text" id="lastname" {...register("lastname")} />
                {errors?.lastname ? (
                  <p className="text-red-500 font-medium text-xs">
                    {errors?.lastname.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Referral Code
              </Label>

              <InputOTP maxLength={6} onChange={handleReferralChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              {errors?.referral && (
                <p className="text-red-500 font-medium text-xs">
                  {errors.referral.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Username
              </Label>
              <Input type="email" id="email" {...register("email")} />
              {errors?.email && (
                <p className="text-red-500 font-medium text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd" className="text-title text-sm">
                  Password
                </Label>
              </div>
              <Input
                type="password"
                id="pwd"
                className="input sz-md variant-mixed"
                {...register("pwd")}
              />
              {errors?.pwd && (
                <p className="text-red-500 font-medium text-xs">
                  {errors.pwd.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account ?
            <Button asChild variant="link" className="px-2">
              <Link href="/">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
