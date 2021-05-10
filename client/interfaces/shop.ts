export type SortingType = string

export type CategoryType =
  | 'Игровые консоли'
  | 'Компьютерная техника'
  | 'Мобильные устройства и аксессуары'
  | 'Радиоуправляемая техника'

export interface ICategoryProps {
  id: string
  name: CategoryType
  link: string
}

export interface IProductProps {
  name: string
  image: {
    url: string
    formats: any
  }
  categories: Array<ICategoryProps>
  price: number
  rating: number
  id: string
  published_at: string
  count?: number
  available: number
  description: string
  expire_date: Date
}

export interface IProductCardProps {
  hit: IProductProps
}

export interface IShopProps {
  categories: Array<ICategoryProps>
  products: Array<IProductProps>
  sorting: SortingType
  cart: Array<any>
  wishlist: Array<any>
}

export interface ICartItem {
  id: string
  count: number
}

export interface ICreateOrderProps {
  id: string
  total: number
  products: string
}

export interface IOrderProps {
  id: string
  total: number
  products: string
  address: string
  createdAt: string
}

export interface IBidProps {
  id: string
  price: number
  createdAt: string
  product: any
  added: boolean
}
