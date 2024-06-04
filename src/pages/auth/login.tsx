import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";

const formSchema = z.object({
    username: z.string().min(5).max(50),
    password: z.string().min(6).max(15)
  })

const Login = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-orange-400 min-h-screen flex items-center justify-center">
      <div className="backdrop-blur-sm bg-white/5 border border-amber-100/50 flex flex-col items-center rounded-2xl shadow-lg max-w-3xl p-10 z-20">
          <img src="./imgs/logo.png" className="m-3 ms-0 w-1/2 backdrop-blur-xl bg-slate-50/30 rounded-md" alt="./images/logo.png" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-1/2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-primary">Username</FormLabel>
                        <FormControl>
                            <Input placeholder="Username" {...field} className=""/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-primary">Password</FormLabel>
                        <FormControl>
                            <Input placeholder="Password" {...field} type="password"/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </form>
                <Button type="button" className="mt-5 w-1/2">Submit</Button>
                <div className="mt-2"> 
                    <p className="inline-block text-gray-900">Do you not have an account yet?</p> 
                    <Link to={'/signup'} className="underline"> SignUp</Link>
                </div>
            </Form>
            <hr className="border border-amber-200/50 w-1/2 mt-5"/>
            <Button type="button" className="mt-5 w-1/2">Google</Button>
            <Button type="button" className="mt-5 w-1/2">GitHub</Button>

      </div>
      <img src="./imgs/brain.png" alt="Brain" className="absolute z-10 w-1/2 md:w-2/5" />
    </div>
  );
};

export default Login;
