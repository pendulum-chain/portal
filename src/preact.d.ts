import JSX = preact.JSX

type SetStateAction<S> = S | (prevState: S) => S;

type Dispatch<A> = (action: A) => void;

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> { }
type ReactFragment = {} | ReactNodeArray;

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
