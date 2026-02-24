export interface FAQ {
    id: number;
    question: string;
    answer: string;
  }

  export interface FrequestAskedQuestionsProps {
    faqs: FAQ[];
  }

  export interface FaqResponse {
    data: FAQ[];
  }
  