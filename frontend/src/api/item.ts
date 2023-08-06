import request from '../util/request';

export function getItemList() {
    return request.get<any, ResponseSuccess>("/products")
}

export function deleteItemById(id: number) {
    return request.delete<any, ResponseSuccess>('/products/' + id);
}

export function updateItem(item: Item) {
    return request.put<any, ResponseSuccess>('/products', item);
}

export function createItem(item: Item) {
    return request.post<any, ResponseSuccess>('/products', item);
}