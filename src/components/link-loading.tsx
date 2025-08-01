"use client";

import { useLinkStatus } from "next/link";
import LoadingSpinner from "./loading-spinner";

export default function LinkLoading() {
  const { pending } = useLinkStatus();
  return pending ? <LoadingSpinner className="spinner" /> : null;
}
