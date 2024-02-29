"use client";

import clsx from "clsx";
import Link from "next/link";

type BreadcrumbsType = {
  label: string;
  href: string;
  active?: boolean;
};

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbsType[];
}) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex text-sm">
          {breadcrumbs.map((breadcrumb, index) => {
            return (
              <li
                aria-current={breadcrumb.active}
                key={index}
                className={clsx(
                  breadcrumb.active ? "text-gray-700" : "text-gray-400"
                )}
              >
                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                {index < breadcrumbs.length - 1 ? (
                  <span className="mx-2 inline-block">{">"}</span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
