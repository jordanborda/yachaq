import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Prefetch páginas críticas para navegación más rápida
    const criticalRoutes = ['/intranet', '/matricula', '/aula-virtual', '/gestion-docentes']
    criticalRoutes.forEach(route => {
      if (route !== router.pathname) {
        router.prefetch(route)
      }
    })
  }, [router])

  return (
    <>
      <Head>
        {/* DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//supabase.co" />
        
        {/* Preconnect para recursos críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Mejorar rendimiento de navegación */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Optimizaciones de rendimiento */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </Head>
      
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
