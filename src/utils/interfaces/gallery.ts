export interface IImageItem {
  id: number;
  title: string;
  category: string;
  source: string;
}

export interface IGallery {
  images: Array<IImageItem>;
}
