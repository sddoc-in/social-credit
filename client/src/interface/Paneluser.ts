export default interface PannelUser {
    uid: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    role: string;
    status: string;
}