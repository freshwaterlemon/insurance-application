'use client';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    SheetClose,
    SheetFooter,
} from '@/components/ui/sheet';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getSession } from 'next-auth/react';
import { updateUserPasswordSchema } from '@/schemas';
import { updateUserPassword } from '@/app/actions/updatePassword';

export default function UpdateUserPasswordForm({ email }) {
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(updateUserPasswordSchema),
        defaultValues: {
            password: '',
        },
    });

    const onSubmit = async (data) => {

        console.log(data);
        try {
            await updateUserPassword(email, data);
            form.reset()
            toast({
                title: 'Password updated successfully',
                description: 'Log back in with new password next time',
            });
            // // Refresh the session to reflect the updated username
            // const updatedSession = await getSession();
            // console.log('Session updated:', updatedSession);
        } catch (error) {
            console.error('Error changing name:', error);

        }
    };

    return (
        <div className="space-y-2">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4 mt-5">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mx-1">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="h-10 w-full"
                                            placeholder="******"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="mt-2 mx-1" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <SheetFooter className='gap-4'>

                        <Button type="submit" className="w-full mt-3 m-1">
                            Save
                        </Button>

                        <SheetClose asChild>
                            <Button
                                variant={'secondary'}
                                type="button"
                                className="w-full mt-3 m-1"
                            >
                                Cancel
                            </Button>

                        </SheetClose>
                    </SheetFooter>
                </form>
            </Form>
        </div>
    );
}
