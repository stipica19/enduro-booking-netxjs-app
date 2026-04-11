"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function NotFound() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/"); // Automatski preusmjerava na početnu
    }, []);

    return <Loader />
}
