/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface PaginationWrapperProps {
  currentPage: number;
  lastPage: number;
  links: any;
  onPageChange: (page: number) => void;
}

const PaginationWrapper = ({
  currentPage,
  lastPage,
  links,
  onPageChange,
}: PaginationWrapperProps) => {
  const pageLinks = links.slice(1, -1);

  return (
    <div className="flex flex-col xl:flex-row items-center xl:justify-between px-4 py-3 sm:px-6 mt-4 gap-4">
      <div className="hidden xl:flex">
        <p className="text-sm text-gray-700 whitespace-nowrap">
          Showing page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{lastPage}</span> pages
        </p>
      </div>

      <Pagination className="!justify-start xl:!justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {pageLinks.map((link: any, index: number) => {
            const pageNumber = isNaN(Number(link.label))
              ? null
              : Number(link.label);

            // Show ellipsis for "..." labels
            if (!pageNumber) {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={link.label}>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(pageNumber);
                  }}
                  isActive={link.active}
                  className={
                    !link.url
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                >
                  {link.label}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < lastPage) onPageChange(currentPage + 1);
              }}
              className={
                currentPage === lastPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationWrapper;
