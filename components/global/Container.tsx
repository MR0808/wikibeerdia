import { cn } from '@/lib/utils';

function Container({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        // <div className={cn('mx-auto max-w-7xl xl:max-w-full px-8', className)}>
        <div className={cn(className)}>{children}</div>
    );
}
export default Container;
