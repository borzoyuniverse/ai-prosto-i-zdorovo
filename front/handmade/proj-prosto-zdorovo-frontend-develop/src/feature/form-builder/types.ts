export type Answer = {
  question: string;
  orderNumber: number;
  answer:
    | string
    | string[]
    | {
        answer: string;
        question: string;
      }[];
  type: string;
  additionalAnswer?: string;
  extraCheckboxAnswer?: ({
    title: string;
    answer: string;
  } | null)[];
};

export type Form = {
  answers: Record<string, Answer>;
};
