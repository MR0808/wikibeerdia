import { type DataTableConfig } from "@/config/dataTable";

export function filterSubColumn({
    parentColumn,
    column,
    value,
    isSelectable
}: {
    parentColumn: string;
    column: string;
    value: string;
    isSelectable?: boolean;
}) {
    const [filterValue, filterOperator] = (value?.split("~").filter(Boolean) ??
        []) as [
        string,
        DataTableConfig["comparisonOperators"][number]["value"] | undefined
    ];

    switch (filterOperator) {
        case "ilike":
            return {
                [`${parentColumn}`]: {
                    some: {
                        [`${column}`]: {
                            contains: filterValue,
                            mode: "insensitive"
                        }
                    }
                }
            };
        case "notIlike":
            return {
                [`${parentColumn}`]: {
                    some: {
                        NOT: {
                            [`${column}`]: { contains: filterValue }
                        }
                    }
                }
            };
        case "startsWith":
            return {
                [`${parentColumn}`]: {
                    some: {
                        [`${column}`]: { startsWith: filterValue }
                    }
                }
            };
        case "endsWith":
            return {
                [`${parentColumn}`]: {
                    some: {
                        [`${column}`]: { endsWith: filterValue }
                    }
                }
            };
        case "eq":
            return {
                [`${parentColumn}`]: {
                    some: {
                        [`${column}`]: filterValue
                    }
                }
            };
        case "notEq":
            return {
                [`${parentColumn}`]: {
                    some: {
                        [`${column}`]: { not: filterValue }
                    }
                }
            };
        case "isNull":
            return {
                [`${parentColumn}`]: {
                    some: {
                        [`${column}`]: null
                    }
                }
            };
        case "isNotNull":
            return {
                [`${parentColumn}`]: {
                    some: {
                        [`${column}`]: { not: null }
                    }
                }
            };
        default:
            return {
                [`${parentColumn}`]: {
                    some: {
                        [`${column}`]: {
                            contains: filterValue,
                            mode: "insensitive"
                        }
                    }
                }
            };
    }
}
