export class EnumUtils<T> {
    public static getKeys<T>(enumeration: T): String[] {
        return Object.keys(enumeration).filter(k => typeof enumeration[k] === 'number');
    }

    public static getValues<T>(enumeration: T): number[] {
        return this.getKeys(enumeration).map(k => enumeration[k as string]);
    }
}
