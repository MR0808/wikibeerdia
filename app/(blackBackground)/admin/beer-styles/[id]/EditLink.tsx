"use client";

import { useState } from "react";

import { UpdateStyleSheet } from "@/components/admin/beer-styles/UpdateStyleSheet";
import { StyleProps } from "@/utils/types";

const EditLink = ({ data }: { data: StyleProps }) => {
    const [showUpdateStyleSheet, setShowUpdateStyleSheet] = useState(false);

    return (
        <>
            <UpdateStyleSheet
                open={showUpdateStyleSheet}
                onOpenChange={setShowUpdateStyleSheet}
                type={data}
            />
            <div
                className="cursor-pointer text-xs text-muted-foreground hover:underline"
                onClick={() => setShowUpdateStyleSheet(true)}
            >
                Edit
            </div>
        </>
    );
};

export default EditLink;
