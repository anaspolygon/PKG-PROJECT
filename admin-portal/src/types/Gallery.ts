export interface Gallery {
    id: number;
    title: string;
    description: string;
    image: string | null;
  }

  export interface GalleryProps {
    galleries: Gallery[];
  }

  export interface GalleryResponse {
    data: Gallery[];
  }
  