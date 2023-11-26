"use client";
import { ClientContextProvider } from "./client_context";
import { Clicker } from "./clicker";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ClientContextProvider>
                <Clicker />
            </ClientContextProvider>
        </main>
    );
}
