import request from '../util/request';

export function getItemList() {
    return request.get<any, ResponseSuccess>("/products/getItemList")
}

export function deleteItemById(id: number) {
    return request.delete<any, ResponseSuccess>('/products/deleteItem/' + id);
}

export function updateItem(item: Item) {
    return request.put<any, ResponseSuccess>('/products/updateItem', item);
}

export function createItem(item: Item) {
    return request.post<any, ResponseSuccess>('/products/addItem', item);
}

export function getItemById(id: number) {
    return request.get<any, ResponseSuccess>('/products/getItem/' + id);
}