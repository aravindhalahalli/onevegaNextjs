import React from "react";
import { cn } from "@/lib/utils";

export type CardProps = {
  id:number;
  name:string;
  createdAt:string;

};

export default function Card(props: CardProps) {
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        <p className="text-sm">{props.id}</p>
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{props.name}</h2>
        <p className="text-xs text-gray-500">{props.createdAt}</p>
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}
