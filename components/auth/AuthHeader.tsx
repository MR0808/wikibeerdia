interface AuthHeaderProps {
    heading: string;
    subHeading: string;
}

export const AuthHeader = ({ heading, subHeading }: AuthHeaderProps) => {
    return (
        <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">{heading}</h2>
            <p className="mt-2 text-sm text-gray-500">{subHeading}</p>
        </div>
    );
};

export default AuthHeader;
