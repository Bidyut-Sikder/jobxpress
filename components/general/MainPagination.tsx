"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface iAppProps {
  totalPages: number;
  currentPage: number;
}

function PaginationDemo({ totalPages, currentPage }: iAppProps) {
    console.log(totalPages,currentPage)
  const searchParams = useSearchParams();
  const router = useRouter();
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`/?${params.toString()}`);
  };

  function paginationItems() {
    const items = [];
    if (totalPages < 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      console.log(currentPage, 3);
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          items.push(i);
        }

        items.push(null); // Ellipsis
        items.push(totalPages);
      } else {
        items.push(1); // First page
        items.push(null); // Ellipsis

        if (currentPage < totalPages - 2) {
          items.push(currentPage - 1);
          items.push(currentPage);
          items.push(currentPage + 1);
          items.push(null); // Ellipsis
          items.push(totalPages);
        } else {
          for (let i = totalPages - 2; i <= totalPages; i++) {
            items.push(i);
          }
        }
      }
    }
    return items;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                handlePageChange(currentPage - 1);
              }
            }}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {paginationItems().map((page, index) =>
          page === null ? (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
                className={
                  page === currentPage
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : ""
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                handlePageChange(currentPage + 1);
              }
            }}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationDemo;

////////////////
