import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.scss']
})
export class PaginationComponent {
    @Input() filter: boolean;
    @Input() set pagination(pageConfig) {
        this.state = pageConfig;
    };

    @Output() pageChange = new EventEmitter();

    state = {
        count: 0,
        page: 1,
        pageSize: 20
    };

    setPage(page) {
        this.state.page = page;
        this.pageChange.emit(this.state);
    }

    get pages() {
        const totalPages = this.state.count / this.state.pageSize;
        return new Array(Math.ceil(totalPages)).fill(1).map((v, i) => ++i);
    }

    get currentPage() {
        return this.state.page;
    }

    isCurrentPage(page) {
        return this.currentPage === page;
    }

    isLastPage() {
        return this.state.page >= this.pages.length;
    }

    isFirstPage() {
        return this.state.page < 2;
    }
}
