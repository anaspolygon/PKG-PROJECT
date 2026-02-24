/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Link } from '@/app/(logged-in)/users/types/UserTypes';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  links:any;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, lastPage, links, onPageChange }: PaginationProps) => {
  const pageLinks = links.slice(1, -1);

  return (
    <div className="flex flex-col xl:flex-row items-center justify-between  px-4 py-3 sm:px-6 mt-4">
      <div className="flex  justify-between  sm:hidden">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } border border-gray-300`}
        >
          Previous
        </button>
        <button
          onClick={() => currentPage < lastPage && onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
            currentPage === lastPage
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } border border-gray-300`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex flex-col xl:flex-row  xl:flex-1 sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{lastPage}</span> pages
          </p>
        </div>
        <div>
          <nav className="isolate flex flex-wrap xl:inline-flex -space-x-px rounded-md" aria-label="Pagination">
            <button
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 mb-2 ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer'
              } border border-gray-300`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {pageLinks.map((link:any) => {
              const pageNumber = isNaN(Number(link.label)) ? null : Number(link.label);
              
              return (
                <button
                  key={link.label}
                  onClick={() => pageNumber && onPageChange(pageNumber)}
                  disabled={!link.url || link.active}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium mb-2 ${
                    link.active
                      ? 'z-10 bg-[#003970] text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      : link.url
                      ? 'bg-white text-gray-700 hover:bg-gray-100 cursor-pointer'
                      : 'bg-gray-100 text-gray-400'
                  } border border-gray-300`}
                >
                  {link.label}
                </button>
              );
            })}
            
            <button
              onClick={() => currentPage < lastPage && onPageChange(currentPage + 1)}
              disabled={currentPage === lastPage}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 mb-2 ${
                currentPage === lastPage
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer'
              } border border-gray-300`}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;