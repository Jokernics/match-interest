export type categoryType = { [categoryName: string]: string[] };

export type wordsType = categoryType[];

export type wordsResType = {
  categories: wordsType;
};

export type resultType = {
  answers: string[]
  total: number
}

export type guestType = {
  [guestName: string]: resultType
}

export type guestResultType = {
  guests: guestType[]
}

