export interface PreLoadRoot {
    version: number
    divisions: Division[]
    districts: District[]
    thanas: Thana[]
    post_offices: PostOffice[]
  }
  
  export interface Division {
    l: string
    v: string
  }
  
  export interface District {
    l: string
    v: string
    p: string
  }
  
  export interface Thana {
    l: string
    v: string
    p: string
  }
  
  export interface PostOffice {
    l: string
    v: string
    p?: string
  }
  