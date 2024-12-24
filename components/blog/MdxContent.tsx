import * as runtime from "react/jsx-runtime";
import Image from "next/image";

import BlogCallout from "./BlogCallout";

const sharedComponents = {
    Image,
    BlogCallout
};

const useMDXComponent = (code: string) => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
};

const MDXContent = ({ code, ...props }: { code: string }) => {
    const Component = useMDXComponent(code);
    return <Component components={{ ...sharedComponents }} {...props} />;
};

export default MDXContent;
