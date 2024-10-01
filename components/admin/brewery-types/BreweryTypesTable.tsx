import { Pencil, Trash2 } from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import db from "@/lib/db";
import EmptyList from "@/components/global/EmptyList";

const BreweryTypesTable = async () => {
    const types = await db.breweryType.findMany({ orderBy: { name: "asc" } });

    if (types.length === 0) return <EmptyList />;

    return (
        <section>
            <Table>
                <TableCaption className="capitalize">
                    total types : {types.length}
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {types.map((type) => {
                        const { id: typeId, name, status } = type;
                        return (
                            <TableRow key={typeId}>
                                <TableCell>{name}</TableCell>
                                <TableCell>{status}</TableCell>
                                <TableCell className="flex items-center gap-x-2">
                                    <Pencil className="cursor-pointer p-2" />
                                    <Trash2 className="cursor-pointer p-2" />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </section>
    );
};

export default BreweryTypesTable;
