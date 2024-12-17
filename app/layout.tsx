import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/header';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Insurance Dashboard',
	description: 'Insurance Dashboard',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
			>
				<SidebarProvider>
					<AppSidebar />
					<SidebarTrigger />
					<main className="w-full">
						<Header />
						{children}
					</main>
					<Toaster />
				</SidebarProvider>
			</body>
		</html>
	);
}