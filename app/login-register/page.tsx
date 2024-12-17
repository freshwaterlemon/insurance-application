import React from 'react';
import { GalleryVerticalEnd } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginTab from '@/components/auth/login-tab';
import RegisterTab from '@/components/auth/register-tab';
import Link from 'next/link';

export default function LoginRegister() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="relative bg-muted lg:block bg-neutral-800"><div className="flex justify-center gap-2 md:justify-start text-neutral-50">
                <Link href="/" className="flex items-center gap-2 font-medium m-5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-50 text-neutral-900">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Singapore Insurance
                </Link>
            </div>
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <div className="flex w-full max-w-sm flex-col mb-5">
                            <Link
                                href="/"
                                className="flex items-center gap-2 justify-end text-xl"
                            >
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                Singapore Insurance
                            </Link>
                        </div>
                        <Tabs defaultValue="login" className="w-[400px]">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="register">
                                    Register
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                                <LoginTab />
                            </TabsContent>

                            <TabsContent value="register">
                                <RegisterTab />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}