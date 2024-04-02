"use client";
import Card, { CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());

export default function Prompts() {
  const { data, error, isLoading } = useSWR(
    "https://demo6396395.mockable.io/prompts",
    fetcher
  );
  if (error) return <div>failed to load the prompts</div>;
  if (isLoading) return <div>Loading Prompts...</div>;
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Prompts" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-6">
        {data.map((d: CardProps, i: React.Key | null | undefined) => (
          <Card key={i} id={d.id} name={d.name} createdAt={d.createdAt} />
        ))}
      </section>
    </div>
  );
}
