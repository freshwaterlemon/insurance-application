import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/lib/auth';
import { SquarePen } from 'lucide-react';
import UpdateUsernameForm from '@/components/updateUsername-form';

export default async function Account() {
  const session = await auth();

  return (
    <>
      <Sheet>
        <Card className="w-[400px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <Avatar className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{(session?.user?.name)?.charAt(0)}</AvatarFallback>
            </Avatar>
            <SheetTrigger asChild>
              <Button variant="outline">
                <SquarePen className="h-6 w-6 text-muted-foreground" />
                Edit
              </Button>
            </SheetTrigger>
          </CardHeader>
          <CardContent className="ml-1">
            <CardTitle className="text-2xl font-bold">
              {session?.user?.name}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {session?.user?.email}
            </CardDescription>
          </CardContent>
        </Card>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when
              you&apos;re done.
            </SheetDescription>
          </SheetHeader>

          <UpdateUsernameForm email={session?.user?.email} />

        </SheetContent>
      </Sheet>
    </>
  );
}
