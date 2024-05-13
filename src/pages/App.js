"use client";

import React, { useEffect } from "react";
import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();

  useEffect(() => {
    const lastVisitedSlug = sessionStorage.getItem('lastVisitedSlug');
    if (lastVisitedSlug) {
      /*    if (lastVisitedSlug === 'valto') {
           router.push("http://valtoai.com");
         } else {
           router.push(`/${lastVisitedSlug}`);
         } */
      router.push(`/${lastVisitedSlug}`);
    } else {
      router.push(`${process.env.SPEAK_TO_WEB}`);
    }
  }, [router]);

  return (
    <div></div>
  );
}

export default Home;
