import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import DeleteItem from './components/DeleteItem';
import EditItem from './components/EditItem';
import AddItem from './components/AddItem';
import { getItemList } from '../../api/item';


function Item() {

    const [list, setlist] = useState<Item[]>([]);
    const [currentItem, setCurrentItem] = useState<Item>({} as Item);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

    // Setup the pagination
    // const [pagination, setPagination] = useState<TablePaginationConfig>({
    //     position: ["bottomCenter"],
    //     showSizeChanger: false,
    // })

    useEffect(() => {
        getListByPage();
    }, []);

    const dataSource = [...list];

    async function getListByPage() {
        const res = await getItemList();
        setlist(res.data as Array<Item>);
        // setPagination({
        //     ...pagination,
        // });
    }

    async function onDelete(id: number) {
        await getListByPage();
    }

    function onCloseEditModal(): void {
        setIsEditModalOpen(false);
    }

    async function onCloseAddModal(refresh?: boolean) {
        if (refresh) {
            await getListByPage();
        }
        setIsAddModalOpen(false);
    }

    function handleClickEdit(item: Item) {
        setCurrentItem(item);
        setIsEditModalOpen(true);
    }

    const columns: ColumnsType<Item> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Item Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Stock Quantity',
            dataIndex: 'stockQuantity',
            key: 'stockQuantity',
        },
        {
            title: 'Sold Quantity',
            dataIndex: 'soldQuantity',
            key: 'soldQuantity',
        },
        {
            title: 'Management',
            render(value, record, index) {
                return (
                    <Space>
                        <Button
                            type='primary'
                            onClick={() => handleClickEdit(record)}
                        >Edit</Button>
                        <DeleteItem id={record.id} onDelete={onDelete} />
                    </Space>
                )
            },
        },
    ];


    return (
        <>

            <EditItem
                item={currentItem}
                isModalOpen={isEditModalOpen}
                closeModal={onCloseEditModal}
                refresh={async () => {
                    await getListByPage();
                }}
            />
            <AddItem
                isModalOpen={isAddModalOpen}
                closeModal={onCloseAddModal}
            />
            <Button
                type='primary'
                onClick={() => setIsAddModalOpen(true)}
            >
                Add Item
            </Button>
            <Table
                rowKey={"id"}
                // pagination={pagination}
                dataSource={dataSource}
                columns={columns}
            />
        </>
    )
}

export default Item