export type Extend<L, R> = Pick<L, Exclude<keyof L, keyof R>> & R;
