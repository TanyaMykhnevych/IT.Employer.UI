import { ISearchResponse } from '../../models';

export class SearchResponseUtils<T> {

    public static getEmptySearchResponse<T>(): ISearchResponse<T> {
        return {
            items: [],
            totalCount: 0,
        };
    }

}
