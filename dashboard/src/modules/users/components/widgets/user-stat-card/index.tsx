import { FC } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@serhas/common/components";
import { cn } from "@serhas/common/utils";

interface UserStatCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    iconColor?: string;
    description?: string;
}

export const UserStatCard: FC<UserStatCardProps> = ({ 
    title, 
    value, 
    icon: Icon, 
    iconColor = "text-primary",
    description 
}) => {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className={cn("h-4 w-4", iconColor)} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};
