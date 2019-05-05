export interface DataServiceInterface
{
    insert(data:any);
    edit(id:any);
    update(data:any, id:any);
    delete(id:any);
}