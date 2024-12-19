import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { auth } from '@/lib/auth';
import LoginRegister from './login-register/page';
import { ThemeProvider } from '@/components/theme-provider';

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	const username = session?.user?.name;
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
			>
				{session != null ? (
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<SidebarProvider>
							<AppSidebar username={username as string} />
							<SidebarTrigger />
							<main className="w-full">
								<Header
									username={username as string}
									image={session?.user?.image as string}
								/>
								{children}
							</main>
							<Toaster />
						</SidebarProvider>
					</ThemeProvider>
				) : (
					<>
						<main className="w-full">
							<LoginRegister />
						</main>
						<Toaster />
					</>
				)}
			</body>
		</html>
	);
}
