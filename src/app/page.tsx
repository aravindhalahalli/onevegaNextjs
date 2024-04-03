"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { buildMenuHierarchy } from "@/lib/utils";
import PageTitle from "@/components/PageTitle";

const fetcher = (url: string | URL | Request) => fetch(url).then((res) => res.json());

export default function Home() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const toggleExpand = (name: string) => {
    if (expandedItems.includes(name)) {
      setExpandedItems(expandedItems.filter((item) => item !== name));
    } else {
      setExpandedItems([...expandedItems, name]);
    }
  };

  const { data, error, isLoading } = useSWR(
    "https://demo6396395.mockable.io/bcf-boards",
    fetcher
  );
  if (error) return <div>Failed to load the BCF boards</div>;
  if (isLoading) return <div>Loading BCF Boards...</div>;

  const Tree: React.FC<{ data: any }> = ({ data }) => {
    const isExpanded = expandedItems.includes(data.name);
    const isParent = data.children && data.children.length > 0;

    return (
      <div className="my-1" style={{ paddingLeft: 10 }}>
        <span
          onClick={() => toggleExpand(data.name)}
          className={`text-lg font-medium ${
            isParent ? "text-blue-600 cursor-pointer" : "text-green-600 cursor-text"
          }`}
        >
          {data.name}
        </span>
        {isExpanded ? (
          <div style={{ paddingLeft: 10 }}>
            {data?.children?.map((child: any, id: number) => (
              <Tree key={id} data={child} />
            ))}
          </div>
        ) : null}
      </div>
    );
  };

  const menu = buildMenuHierarchy(data.boards);
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="BCF Boards" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-6">
        <div className="flex justify-evenly flex-col">
          {menu?.map((d: any, i: number) => (
            <Tree key={i} data={d} />
          ))}
        </div>
      </section>
    </div>
  );
}



