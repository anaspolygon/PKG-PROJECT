
export interface CustomSlider {
    id: number;
    title: string;
    // description: string | null; // Make description nullable (can be null)
    image: string | null;
    created_at: string;
    updated_at: string;
  }


export interface CustomSliders {
    message: string;
    sliders: CustomSlider[];
}
