

export type TaskObj = {
    uuid: any;
    name: string;
    done: boolean;
    createdAt: Date | string;
    updatedAt?: Date | string;
}