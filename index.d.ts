export declare function table<T>(header: Record<keyof T, string>, space?: number, colsPadding?: number): (columns: Record<keyof T, string | number | boolean>[]) => string;
