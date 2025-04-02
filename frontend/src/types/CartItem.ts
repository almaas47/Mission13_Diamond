export interface CartItem {
    quantity: number;
    bookId: number;
    title: string;
    price: number;
    donationAmount?: number;
    author?: string;
}