import {FC} from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { generatePaginationLinks } from "./generate-pages";


type TPaginatorProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    showPreviousNext: boolean;
}

const Paginator: FC<TPaginatorProps> = ({
                                            currentPage,
                                            totalPages,
                                            onPageChange,
                                            showPreviousNext
                                        }) => {

    return (
        <Pagination>
            <PaginationContent>
                {showPreviousNext && totalPages ? (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage - 1 < 1}
                        />
                    </PaginationItem>
                ) : null}
                {generatePaginationLinks(currentPage, totalPages, onPageChange)}
                {showPreviousNext && totalPages ? (
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage > totalPages - 1}
                        />
                    </PaginationItem>
                ) : null}
            </PaginationContent>
        </Pagination>
    )
}
export default Paginator;