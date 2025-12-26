import type {AppProps} from "next/app";
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider} from "next-themes";

import "@/styles/globals.css";

import {TooltipProvider} from "@/components/ui/tooltip";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";

export default function App({Component, pageProps}: AppProps) {
	const [queryClient] = useState(() => new QueryClient());
	
	return (
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<QueryClientProvider client={queryClient}>
					<TooltipProvider>
						<Toaster/>
						<Sonner/>
						<ScrollToTop/>
						<Component {...pageProps} />
					</TooltipProvider>
				</QueryClientProvider>
			</ThemeProvider>
	);
}
