export interface NextAPIRoot {
    data: NextAPIData
  }
  
  export interface NextAPIData {
    label: string
    section_slug: string

    progress: number
    type_data: TypeData
  }
  
  export interface TypeData {
    token: string | undefined
  }
  