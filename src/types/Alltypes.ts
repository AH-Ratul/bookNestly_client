export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export type Inputs = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
};

export interface IProps {
  books: IBook[] | IBook;
}

export type Prop = {
  onSubmit: (data: Inputs) => void;
  isSubmiting?: boolean;
};

export type Props = {
  onClose: () => void;
  id: string;
};

export type Borrow = {
  quantity: number;
  dueDate: Date;
};

export type BookFormData = {
  title?: string;
  author?: string;
  genre?: string;
  isbn?: string;
  copies?: number;
  description?: string;
};

export interface UIState {
  selectedBorrowId: string | null;
  selectedDeleteId: string | null;
  selectedEditedId: string | null;
}
