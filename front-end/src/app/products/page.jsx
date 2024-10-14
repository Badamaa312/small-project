"use client";

import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";

const ProductsPage = () => {
  const router = useRouter();
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    fetch("/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        /* Form data */
      }),
    }).then((res) => {
      // Do a fast client-side transition to the already prefetched dashboard page
      if (res.ok) router.push("/products");
    });
  }, []);

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/products");
  }, [router]);

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  );
};

export default ProductsPage;
