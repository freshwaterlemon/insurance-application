import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/lib/auth';
import { SquarePen } from 'lucide-react';

export default async function Account() {
  const session = await auth();

  return (<>
    <Card className='w-[400px]'>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <Avatar className='size-16'>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <SquarePen className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent className='ml-1'>
        <CardTitle className="text-2xl font-bold">{session?.user?.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {session?.user?.email}
        </CardDescription>
      </CardContent>
    </Card>
  </>
  );
}
